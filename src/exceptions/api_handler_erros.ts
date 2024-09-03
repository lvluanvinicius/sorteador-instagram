import { NextApiResponse } from "next";

export function apiHandlerErros(error: Error, res: NextApiResponse) {
  switch (error.cause) {
    case "METHOD_NOT_ALLOWED":
      return res.status(405).json({
        status: false,
        message: error.message,
        data: null,
      });

    case "INVALID_CONTENT_BODY":
      return res.status(200).json({
        status: false,
        message: error.message,
        data: null,
      });

    case "DATA_DUPLICATED":
      return res.status(400).json({
        status: false,
        message: error.message,
        data: null,
      });

    case "ERROR_PRISMA_SAVE_DATA":
      return res.status(200).json({
        status: false,
        message: error.message,
        data: null,
      });
  }
}
