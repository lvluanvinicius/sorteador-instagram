import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest {
    access_token?: string;
    user_id?: string;
    session_id?: string;
    account_id?: string;
    provider_token?: string;
    provider_account_id?: string;
  }
}
