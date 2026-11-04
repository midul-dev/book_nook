"use client";
import { useSession } from "@/lib/auth-client";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export const BorrowContext = createContext({});

const BorrowProvider = ({ children }: { children: ReactNode }) => {
  const [borrowCount, setBorrowCount] = useState(0);

  const { data: session, isPending, error } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.SERVER_URL}/borrow-count?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.count) {
            setBorrowCount(data.count);
          }
        });
    }
  }, [user?.email]);

  const sharedBooks = { borrowCount, setBorrowCount };

  return (
    <BorrowContext.Provider value={sharedBooks}>
      {children}
    </BorrowContext.Provider>
  );
};

export default BorrowProvider;
