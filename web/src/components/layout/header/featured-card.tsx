"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FeaturedContent } from "@/data/main-navigation";
import { Lang } from "@/types/language";

interface FeaturedCardProps {
  content: FeaturedContent;
  lang: Lang;
}

export function FeaturedCard({ content, lang }: FeaturedCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg lg:p-8">
      {/* Featured Image */}
      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
        <Image
          src={content.image}
          alt={content.title[lang]}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 lg:text-2xl">
          {content.title[lang]}
        </h3>

        <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
          {content.description[lang]}
        </p>

        {/* CTA Button */}
        {content.link && (
          <Link
            href={content.link.href}
            className="group/cta mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30"
          >
            <span>{content.link.label[lang]}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
