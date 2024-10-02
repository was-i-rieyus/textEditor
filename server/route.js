export async function GET(req) {
    try {
      const response = await fetch('http://localhost:3001/documents'); 
      const documents = await response.json();
      return new Response(JSON.stringify(documents), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Error fetching documents', { status: 500 });
    }
  }
  