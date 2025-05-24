import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const analyzeResume = async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pages = pdfDoc.getPages();
    const allText = pages.map(page => page.getTextContent?.() || '').join('\n\n');

    const jdText = req.body.jobDescription;

    const prompt = `Você é um especialista em recrutamento. Aqui está o currículo:\n\n${allText}\n\nE aqui está a vaga:\n\n${jdText}\n\nSugira melhorias para que o currículo esteja mais alinhado com a vaga.`;

    const aiResponse = await axios.post(`${process.env.AI_API_URL}`, {
      model: `${process.env.AI_MODEL}`,
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': `${process.env.HTTP_REFERRER}`,
        'X-Title': `${process.env.APP_TITLE}`
      }
    });

    const suggestions = aiResponse.data.choices?.[0]?.message?.content || 'Sem resposta da IA.';
    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar currículo' });
  } finally {
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.warn('Erro ao remover o arquivo temporário:', err.message);
    }
  }
};
