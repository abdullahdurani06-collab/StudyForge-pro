import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import JSZip from 'jszip';

// Set up worker for PDF.js using a reliable CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return extractTextFromPDF(file);
    case 'docx':
      return extractTextFromDOCX(file);
    case 'pptx':
      return extractTextFromPPTX(file);
    case 'txt':
      return file.text();
    default:
      throw new Error('Unsupported file format. Please upload PDF, DOCX, PPTX, or TXT.');
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + '\n';
  }

  return text;
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractTextFromPPTX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  let text = '';

  // PPTX slides are in ppt/slides/slideN.xml
  const slideFiles = Object.keys(zip.files).filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'));
  
  // Sort them numerically
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)![0]);
    const numB = parseInt(b.match(/\d+/)![0]);
    return numA - numB;
  });

  for (const slidePath of slideFiles) {
    const content = await zip.file(slidePath)?.async('text');
    if (content) {
      // Basic XML parsing to get text content inside <a:t> tags
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, 'text/xml');
      const textNodes = xmlDoc.getElementsByTagName('a:t');
      for (let i = 0; i < textNodes.length; i++) {
        text += textNodes[i].textContent + ' ';
      }
      text += '\n';
    }
  }

  return text;
}
