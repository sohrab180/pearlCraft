import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Directly call the external API
    const apiResponse = await fetch('https://api.mypearlcraft.com/api/v20/product/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'Failed to fetch products' });
    }

    const products = await apiResponse.json();

    // Return the data to your frontend
    res.status(200).json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
