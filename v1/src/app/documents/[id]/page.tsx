"use client"
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import "@/components/myUi/styling/TextEditor.css";
// Dynamically import your TextEditor component
const TextEditor = dynamic(() => import('@/components/myUi/TextEditor'), {
  ssr: false, // Ensure Quill runs only on the client side
});

export default function DocumentPage() {
  const params = useParams(); // Get route parameters
  const { id } = params;




  if (!id) {
    return <div>Loading.......</div>; // Wait for the id to be available
  }

  return <TextEditor/>;
}
