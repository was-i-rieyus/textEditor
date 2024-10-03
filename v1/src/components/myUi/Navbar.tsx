import Image from "next/image";
import logo from "../../../public/openSource.svg";
import { Search } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type Props = {
  search_field?: boolean;
  docname?: string;
};
export const Navbar = ({ search_field = false, docname }: Props) => {
  //NAVBAR COMPONENT FOR TEXT EDITOR PAGE

  // DEFAULT NAVBAR COMPONENT
  return (
    <div className="w-full bg-zinc-950 text-white h-[70px] flex justify-between items-center pr-5">
      <div className="flex pl-5 justify-start items-center gap-4">
        <div className="logo w-[35px] h-[35px] text-white">
          <Link href={'/'}>
            <Image src={logo} alt="logo"></Image>
          </Link>
        </div>
        <div className="flex flex-col">
          {!docname && (
            <div className="logo-name text-white text-2xl tracking-tight scroll-m20">
              Open Docs
            </div>
          )}

          {docname && (
            <div className="flex flex-col ">
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
      {/* //1. IMPLEMENT SEARCH LATER */}
      {search_field && (
        <div
          className="searchBar w-[40%] border-2 border-white h-[45px] text-white 
        flex items-center rounded-full pl-5 absolute left-1/2 
        transform -translate-x-1/2 bg-zinc-950 caret-transparent
        text-md gap-5
        "
        >
          <Search size={20} />
          Search...
        </div>
      )}
    </div>
  );
};
