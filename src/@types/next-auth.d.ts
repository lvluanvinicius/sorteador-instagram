// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    password?: string;
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
  }
}
