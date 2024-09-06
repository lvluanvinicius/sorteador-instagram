import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest {
    access_token?: string;
    user_id?: string;
  }
}
