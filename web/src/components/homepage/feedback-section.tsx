import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";

const T = {
  en: {
    tag: "Passenger Feedback",
    title: "Share Your Experience With Us",
    subtitle:
      "Your feedback shapes the future of Bokeo International Airport. Every voice matters.",
    cta: "Give Feedback",
  },
  lo: {
    tag: "ຄຳຕິຊົມຂອງຜູ້ໂດຍສານ",
    title: "ແບ່ງປັນປະສົບການຂອງທ່ານໃຫ້ພວກເຮົາ",
    subtitle:
      "ຄຳຕິຊົມຂອງທ່ານຊ່ວຍສ້າງອະນາຄົດຂອງສະໜາມບິນສາກົນບໍ່ແກ້ວ. ທຸກສຽງມີຄຸນຄ່າ.",
    cta: "ໃຫ້ຄຳຕິຊົມ",
  },
  zh: {
    tag: "乘客反馈",
    title: "与我们分享您的体验",
    subtitle: "您的反馈塑造博克奥国际机场的未来。每一个声音都很重要。",
    cta: "提供反馈",
  },
} as const;

interface FeedbackSectionProps {
  lang: Lang;
}

export const FeedbackSection = ({ lang }: FeedbackSectionProps) => {
  const t = T[lang];

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {/* Tag */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <MessageSquare className="h-3.5 w-3.5" />
            {t.tag}
          </span>

          {/* Title */}
          <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
            {t.title}
          </h2>

          {/* Subtitle */}
          <p className="mb-10 text-base leading-relaxed text-gray-500">
            {t.subtitle}
          </p>

          {/* CTA */}
          <Link
            href={`/${lang}/about/feedback`}
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-600 hover:shadow-primary/30 active:scale-[0.98]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
