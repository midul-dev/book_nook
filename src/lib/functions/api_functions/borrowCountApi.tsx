import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const borrowCountApi = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user;

  const res = await fetch(
    `http://localhost:5000/borrow-count?email=${user.email}`,
  );

  return res.json();
};

export default borrowCountApi;
