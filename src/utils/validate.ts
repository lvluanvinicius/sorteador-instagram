import bcrypt from "bcryptjs";

export async function validatePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
