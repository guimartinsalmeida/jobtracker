import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const jobData = req.body;

    // Get the token from cookies, headers, or request body
    const token = req.cookies.token || 
                  req.headers.authorization?.replace('Bearer ', '') ||
                  req.body.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    console.log('Updating job:', { id, jobData, token: token ? 'present' : 'missing' });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    console.log('Backend response:', { status: response.status, statusText: response.statusText });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Backend error:', errorData);
      return res.status(response.status).json(errorData);
    }

    const updatedJob = await response.json();
    console.log('Job updated successfully:', updatedJob);
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 