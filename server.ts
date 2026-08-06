import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Helper to initialize GoogleGenAI client with user-agent
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for Product Image Staging Generation using gemini-3-pro-image-preview
app.post('/api/generate-product-image', async (req, res) => {
  try {
    const {
      prompt,
      imageSize = '1K',
      aspectRatio = '1:1',
      productName = '',
      productMaterial = '',
      category = ''
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required for image generation.' });
    }

    const ai = getAiClient();

    // Construct high quality prompt for gemini-3-pro-image-preview
    const fullPrompt = `High-end photorealistic architectural interior photography featuring the product "${productName || 'home decor piece'}" (${productMaterial ? `crafted in ${productMaterial}` : category ? `category: ${category}` : 'luxury finish'}). Room context & staging instruction: ${prompt}. Natural soft daylight, clean composition, architectural digest aesthetic, hyper-detailed surface texture, photorealistic presentation.`;

    // Valid size options for gemini-3-pro-image-preview are 1K, 2K, and 4K
    const validSizes = ['1K', '2K', '4K'];
    const targetSize = validSizes.includes(imageSize) ? imageSize : '1K';

    const validAspectRatios = ['1:1', '16:9', '4:3', '3:4', '9:16'];
    const targetAspect = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    console.log(`[Gemini Image Gen] Requesting model gemini-3-pro-image-preview | size: ${targetSize} | aspect: ${targetAspect}`);

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: targetAspect,
          imageSize: targetSize, // 1K, 2K, 4K
        },
      },
    });

    let imageUrl = '';
    let textFeedback = '';

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textFeedback += part.text;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: 'The AI model completed without producing an image output.',
        details: textFeedback || 'No image part returned in payload.',
      });
    }

    return res.json({
      success: true,
      imageUrl,
      imageSize: targetSize,
      aspectRatio: targetAspect,
      prompt: fullPrompt,
      textFeedback,
    });
  } catch (error: any) {
    console.error('API /api/generate-product-image error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while generating the image.',
    });
  }
});

// Vite middleware & Production static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
