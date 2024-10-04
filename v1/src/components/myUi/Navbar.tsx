/* eslint-disable react/jsx-key */
import Image from "next/image";
import logo from "../../../public/openSource.svg";
import { Search } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Trie } from "../ds/trie";
import React, { useEffect } from "react";

const trie = new Trie();

type Props = {
  search_field?: boolean;
  docname?: string;
};

export const Navbar = ({ search_field = false, docname }: Props) => {
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState<string>("");

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const datafromdb = await fetch("http://localhost:3002/documents");
        const documents = await datafromdb.json();
        documents.forEach((doc: { document_name: string }) => {
          trie.insert(doc.document_name);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocs();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    
    console.time('Search Time'); 
    
    if (query.length > 0) {
      const results = trie.search(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    
    console.timeEnd('Search Time'); 
  };

  return (
    <div className="w-full bg-zinc-950 text-white h-[70px] flex justify-between items-center pr-5 relative">
      <div className="flex pl-5 justify-start items-center gap-4">
        <div className="logo w-[35px] h-[35px] text-white">
          <Link href={'/'}>
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex flex-col">
          {!docname && (
            <div className="logo-name text-white text-2xl tracking-tight scroll-m20">
              Open Docs
            </div>
          )}
          {docname && (
            <div className="flex flex-col">
              <div className="logo-name text-white text-xl tracking-tight scroll-m20">
                {docname}
              </div>
              <div className="logo-name text-white text-xs tracking-tight scroll-m20">
                Open Docs
              </div>
            </div>
          )}
        </div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      {search_field && (
        <div className="searchBar w-[40%] border-2 border-white h-[45px] text-white flex items-center rounded-full pl-5 absolute left-1/2 transform -translate-x-1/2 bg-zinc-950 text-md gap-5">
          <Search size={20} />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      )}

      {search_field && searchResults.length > 0 && (
        <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-zinc-700 w-[40%] text-white max-h-[200px] overflow-y-auto rounded-md shadow-lg">
          <ul className="p-2">
            {searchResults.map((result, index) => (
              <Link key={index} href={`/documents/${result}`}>
                <li className="p-2 hover:bg-zinc-600 text-sm font-medium cursor-pointer rounded-md">
                  <span>{result}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
