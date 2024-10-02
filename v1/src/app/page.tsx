"use client"
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from "uuid";


export default function Home() {
  const documentId = uuidV4();
  // Redirect to /documents/[id]
  redirect(`/documents/${documentId}`);
  return null; // This component doesn't render anything as it redirects
}
