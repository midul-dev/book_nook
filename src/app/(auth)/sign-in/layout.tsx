import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Sign In",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
