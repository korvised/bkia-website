import Link from "next/link";
import { facilitiesServices } from "@/data/guide";
import { Lang } from "@/types/language";

interface RelatedServicesProps {
  lang: Lang;
}

const RELATED_SERVICE_IDS = [
  "atm-service",
  "information-service",
  "parking-service",
  "vip-lounge",
  "mother-child-room",
  "muslim-prayer-room",
];

const services = facilitiesServices.filter((s) =>
  RELATED_SERVICE_IDS.includes(s.id),
);
const sortedServices = RELATED_SERVICE_IDS.map((id) =>
  services.find((s) => s.id === id),
).filter(Boolean);

const label = {
  en: { title: "Available Services on Arrival", sub: "Convenient services available at the arrivals terminal", help: "Need Assistance?", helpText: "Visit our Information Desk in the arrivals hall or call +856 84 260 179." },
  lo: { title: "ບໍລິການທີ່ມີໃຫ້ສຳລັບຂາເຂົ້າ", sub: "ບໍລິການທີ່ສະດວກສະບາຍໃນອາຄານຂາເຂົ້າ", help: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອບໍ່?", helpText: "ກະລຸນາຕິດຕໍ່ເຄົາເຕີປະຊາສຳພັນ ຢູ່ຫ້ອງໂຖງຂາເຂົ້າ ຫຼື ໂທ +856 84 260 179." },
  zh: { title: "到达厅可用服务", sub: "到达航站楼提供的便捷服务", help: "需要帮助？", helpText: "请前往到达大厅的问询台或致电 +856 84 260 179。" },
};

export function RelatedServices({ lang }: RelatedServicesProps) {
  const l = label[lang] ?? label.en;

  return (
    <section className="bg-gray-50 py-10">
      <div className="container">
        <div className="mb-6 space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{l.title}</p>
          <p className="text-sm text-gray-500">{l.sub}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {sortedServices.map((service) => {
            if (!service) return null;
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/${lang}/services/facilities`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#b2e8ea] hover:bg-[#f0fbfc]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f7f8] transition-colors group-hover:bg-[#00AAAC]">
                  <Icon className="h-6 w-6 text-[#00AAAC] transition-colors group-hover:text-white" />
                </div>
                <div className="text-center">
                  <span className="line-clamp-1 block text-xs font-semibold text-gray-800">
                    {service.name[lang]}
                  </span>
                  <span className="mt-0.5 line-clamp-1 block text-xs text-gray-400">
                    {service.shortDescription[lang]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{l.help} </span>
            {l.helpText}
          </p>
        </div>
      </div>
    </section>
  );
}
