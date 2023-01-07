import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = req.body.prompt;

    // Request 4 images from the OpenAI API
    const response = await openai.createImage({
      prompt,
      n: 4,
      size: "256x256",
    });
    // Get the URLs of the generated images
    const urls = response.data.data.map((item) => item.url);

    sendSuccessResponse(res, urls);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error);
  }
};

function sendSuccessResponse(res: NextApiResponse, data: any) {
  res.status(200).json(data);
}

function sendErrorResponse(res: NextApiResponse, error: any) {
  res.status(500).json({ message: error.message });
}
