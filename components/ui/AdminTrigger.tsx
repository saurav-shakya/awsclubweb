"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SEQUENCE = "adminaws";

export default function AdminTrigger() {
  const router = useRouter();
  const bufferRef = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      bufferRef.current = (bufferRef.current + e.key).slice(-SEQUENCE.length);

      if (bufferRef.current === SEQUENCE) {
        bufferRef.current = "";
        router.push("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
