import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | User Profile",
};

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
