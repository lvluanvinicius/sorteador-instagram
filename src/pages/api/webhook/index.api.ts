import { NextApiRequest, NextApiResponse } from "next";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responde com o desafio para confirmar a verificação
        res.status(200).send(challenge);
      } else {
        res.status(403).send("Forbidden");
      }
    } else {
      res.status(400).send("Bad Request");
    }
  } else if (req.method === "POST") {
    const body = req.body;

    if (body.object) {
      // Processar eventos recebidos
      console.log("Evento recebido:", JSON.stringify(body, null, 2));

      // Responde com sucesso
      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.status(404).send("Not Found");
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
