"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function App() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.replace("/login");
  }, []);
  return <></>;
}
