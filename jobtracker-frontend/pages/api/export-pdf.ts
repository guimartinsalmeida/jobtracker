import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    // Create a PDF document
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    // Collect PDF chunks
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=optimized-cv.pdf');
      res.send(pdfBuffer);
    });

    // Add content to PDF
    doc.fontSize(12);
    doc.text(content, {
      align: 'left',
      lineGap: 5,
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
} 