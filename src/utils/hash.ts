import bcrypt from "bcryptjs";

export async function hashMake(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
