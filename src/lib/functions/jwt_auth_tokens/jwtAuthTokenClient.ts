import { authClient } from "@/lib/auth-client";

export const jwtAuthTokenClient = async () => {
  const { data } = await authClient.token();

  const token = data?.token;
  return token;
};
