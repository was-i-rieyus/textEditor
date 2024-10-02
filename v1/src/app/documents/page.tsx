"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [newDocumentTitle, setNewDocumentTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch('http://localhost:3002/documents'); 
      const data = await response.json();
      setDocuments(data);
    };

    fetchDocuments();
  }, []);

  const createNewDocument = async () => {
    if (!newDocumentTitle) return;

    const documentPath = `/documents/${encodeURIComponent(newDocumentTitle)}`;
    router.push(documentPath);
  };

  return (
    <div>
      <h1>Documents</h1>
      
      <div>
        <input 
          type="text" 
          value={newDocumentTitle} 
          onChange={(e) => setNewDocumentTitle(e.target.value)} 
          placeholder="Enter document title" 
        />
        <button onClick={createNewDocument}>
          Create New
        </button>
      </div>

      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <Link href={`/documents/${doc._id}`}>
              {doc.title || doc._id} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
