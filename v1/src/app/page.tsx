"use client";

import { DocPreview } from "@/components/myUi/DocPreview";
import { Navbar } from "@/components/myUi/Navbar";
import { NewDoc } from "@/components/myUi/NewDoc";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
type PreviewDoc = {
  _id: string;
  document_name: string;
  document_description: string;
  preview_image:string | null;
};
export default function Home() {
  // const documentId = uuidV4();
  // Redirect to /documents/[id]
  // redirect(`/documents`);
  const server1 = process.env.NEXT_PUBLIC_SERVER_1;
  const server2 = process.env.NEXT_PUBLIC_SERVER_2;
  const [RecentDocs, setRecentDocs] = useState<PreviewDoc[]>([]);


  // FIX WRITE DELETE LOGIC
  const deleteDocument = useCallback(async(docID:string)=>{
    const response = await fetch(`${server2}/documents/${docID}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      toast.success("Document deleted successfully");
  
      setRecentDocs(RecentDocs.filter((doc:PreviewDoc)=>doc._id!==docID));
      
    } else {
      toast.error("Error deleting document");
    }

  },[RecentDocs])

  const updateDocument = useCallback(async(docID:string,docName:string,docDesc:string)=>{
    
    const response = await fetch(`${server2}/documents/${docID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({document_name:docName,document_description:docDesc}),
    });
    
    if (response.ok) {
      toast.success("Document updated successfully");
      const updatedDoc = RecentDocs.map((doc:PreviewDoc)=>{
        if(doc._id===docID){
          return {...doc,document_name:docName,document_description:docDesc}
        }
        return doc;
      })
      setRecentDocs(updatedDoc);
    } else {
      toast.error("Error updating document");
    }

  },[RecentDocs])

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch(`${server2}/documents`);
        const data = await response.json();
        setRecentDocs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocs();
    
  }, []);

  return (
    <div className="w-full">
      <Navbar  />
      {/* bg-[#FAF7F0] */}
      <div className="w-full bg-[#F1F3F4]">
        <p className="scroll-m-20 text-l font-normal tracking-tight pl-[15.3%] pt-5">
          Create a new document
        </p>
        <div className="templates w-full flex items-center p-[25px] pl-[15%] pt-3  bg-[#F1F3F4 ] gap-11 flex-wrap">
          <NewDoc documentType="Blank Document"/>
        </div>
      </div>
      <div className="w-full bg-white">
        <p className="scroll-m-20 text-l font-medium tracking-tight pl-[15%] pt-5">
          Recent Documents
        </p>
        {RecentDocs.length > 0 && (
          <div className="templates w-full flex items-center p-[25px] pl-[15%] pt-3  bg-[#F1F3F4 ] gap-10 flex-wrap">
            {RecentDocs.map((doc: PreviewDoc) => {
              return (
                // <Link href={`${server1}/documents/${doc._id}`} key={doc._id}>
                  <div className="flex flex-col items-center" key={doc._id}>
                    <DocPreview
                      docId={doc._id}
                      docName={doc.document_name}
                      docDesc={doc.document_description}
                      previewImg={doc.preview_image}
                      url={`${server1}/documents/${doc._id}`}
                      deleteDocument={deleteDocument}
                      updateDocument={updateDocument}
                    />

                  </div>
                // </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
