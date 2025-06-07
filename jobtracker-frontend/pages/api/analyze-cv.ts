import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { cv, jobDescription } = req.body;

    if (!cv || !jobDescription) {
      return res.status(400).json({ message: 'CV and job description are required' });
    }

    const prompt = `
      Analyze the following CV against the job description and provide:
      1. A match score (0-100)
      2. List of missing skills required by the job
      3. Specific suggestions for improving the CV to better match the job requirements

      CV:
      ${cv}

      Job Description:
      ${jobDescription}

      Provide the response in the following JSON format:
      {
        "matchScore": number,
        "missingSkills": string[],
        "improvements": string[]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert CV analyzer and career advisor. Analyze CVs against job descriptions and provide actionable feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing CV:', error);
    return res.status(500).json({ message: 'Error analyzing CV' });
  }
} 