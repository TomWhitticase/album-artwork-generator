import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const url = response.data.data[0].url;
    console.log(url);

    sendSuccessResponse(res, url);
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
