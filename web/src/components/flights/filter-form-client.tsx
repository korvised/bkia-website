"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, FormEvent } from "react";
import { Lang } from "@/types/language";

interface FilterFormClientProps {
  lang: Lang;
  children: React.ReactNode;
}

export function FilterFormClient({ lang, children }: FilterFormClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    // Only add non-empty values
    for (const [key, value] of formData.entries()) {
      const val = value.toString();
      if (
        val &&
        val !== "all" &&
        val !== "" &&
        val !== "00:00" &&
        val !== "23:59"
      ) {
        params.set(key, val);
      }
    }

    // Always add date
    const date = formData.get("date");
    if (date) {
      params.set("date", date.toString());
    }

    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {children}
    </form>
  );
}
