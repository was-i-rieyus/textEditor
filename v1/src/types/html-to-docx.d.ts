declare module 'html-to-docx' {
    export default function HTMLtoDOCX(
      html: string,
      options?: any,
      docxOptions?: any
    ): Promise<Buffer>;
  }
  