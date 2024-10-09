import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Named export for the POST method
export async function POST(req: NextRequest) {
  const { htmlContent, documentName } = await req.json();

  if (!htmlContent) {
    return NextResponse.json({ error: 'No HTML content provided.' }, { status: 400 });
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent);

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Send the PDF buffer as the response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${documentName || 'document'}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate PDF.' }, { status: 500 });
  }
}
