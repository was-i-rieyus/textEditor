declare module 'html-docx-js/dist/html-docx' {
    export function asBlob(html: string): Blob;
    export function asBuffer(html: string): Buffer;
    export function asFile(html: string, filename: string): File;
  }
  