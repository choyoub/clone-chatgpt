"use client";

import { verifySession } from "@/actions/sessions";
import useUserStore from "@/store/user";
import { ReactNode, useEffect } from "react";

export default function UserProvider({ children }: { children: ReactNode }) {
  const { updateUser } = useUserStore();

  useEffect(() => {
    const setUser = async () => {
      const user = await verifySession();

      if (user) {
        updateUser(user);
      }
    };

    setUser();
  }, [updateUser]);

  return <>{children}</>;
}
