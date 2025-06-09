import type { NextApiRequest, NextApiResponse } from 'next';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    // Create a new document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 24, // 12pt
              }),
            ],
          }),
        ],
      }],
    });

    // Generate the document
    const buffer = await Packer.toBuffer(doc);

    // Send the document
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=optimized-cv.docx');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    res.status(500).json({ message: 'Error generating DOCX' });
  }
} 