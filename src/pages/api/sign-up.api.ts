import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).json({});
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    return res.status(400).json({
      status: false,
      message: "Houve um erro desconhecido.",
    });
  }
}
