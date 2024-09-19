import { NextApiResponse } from "next";

export function apiHandlerErros(
  error: Error,
  res: NextApiResponse,
  data: null = null
) {
  switch (error.cause) {
    case "METHOD_NOT_ALLOWED":
      return res.status(405).json({
        status: false,
        message: error.message,
        data,
      });

    case "UNAUTHORIZED":
      return res.status(401).json({
        status: false,
        message: error.message,
        data,
      });

    case "INVALID_CONTENT_QUERY":
      return res.status(200).json({
        status: false,
        message: error.message,
        data,
      });

    case "INVALID_CONTENT_BODY":
      return res.status(200).json({
        status: false,
        message: error.message,
        data,
      });

    case "ERROR_FETCH_RETURN":
      return res.status(200).json({
        status: false,
        message: error.message,
        data,
      });

    case "DATA_DUPLICATED":
      return res.status(400).json({
        status: false,
        message: error.message,
        data,
      });

    case "ERROR_PRISMA_SAVE_DATA":
      return res.status(200).json({
        status: false,
        message: error.message,
        data,
      });

    default:
      return res.status(400).json({
        status: false,
        message: error.message,
        data,
      });
  }
}
