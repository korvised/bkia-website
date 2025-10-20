"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context";

interface FlightsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FlightsError({ error, reset }: FlightsErrorProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    console.error("Flights page error:", error);
  }, [error]);

  const errorMessages = {
    en: {
      title: "Failed to Load Flights",
      description:
        "We encountered an error while loading flight information. Please try again.",
      retry: "Try Again",
      home: "Go Home",
    },
    lo: {
      title: "ໂຫລດຖ້ຽວບິນບໍ່ສຳເລັດ",
      description: "ພວກເຮົາພົບຄວາມຜິດພາດໃນການໂຫລດຂໍ້ມູນຖ້ຽວບິນ. ກະລຸນາລອງໃໝ່.",
      retry: "ລອງໃໝ່",
      home: "ກັບໜ້າຫຼັກ",
    },
    zh: {
      title: "航班信息加载失败",
      description: "加载航班信息时遇到错误，请重试。",
      retry: "重试",
      home: "返回首页",
    },
  };

  const messages = errorMessages[lang];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="mb-2 text-xl font-semibold text-gray-900">
          {messages.title}
        </h1>

        <p className="mb-6 text-gray-600">{messages.description}</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="bg-primary-600 hover:bg-primary-700 flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{messages.retry}</span>
          </button>

          <Link
            href={`/${lang}`}
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Home className="h-4 w-4" />
            <span>{messages.home}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
