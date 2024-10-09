import { NextRequest, NextResponse } from 'next/server';
import HTMLtoDOCX from 'html-to-docx';

// Named export for the POST method
export async function POST(req: NextRequest) {
  const { htmlContent, documentName } = await req.json();

  if (!htmlContent) {
    return NextResponse.json({ error: 'No HTML content provided.' }, { status: 400 });
  }

  try {
    
    const docBuffer = await HTMLtoDOCX(htmlContent, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });
    

    // Send the PDF buffer as the response
    return new NextResponse(docBuffer, {
      status: 200,
      headers: {
        'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-Disposition':  `attachment; filename="${documentName || "document"}.docx"`
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to export document.' }, { status: 500 });
  }
}
