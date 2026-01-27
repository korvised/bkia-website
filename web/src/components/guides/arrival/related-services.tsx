import { facilitiesServices } from "@/data/guide";
import { Lang } from "@/types/language";

interface RelatedServicesProps {
  lang: Lang;
}

// Picked 6 relevant services available in facilities-services-data.ts
const RELATED_SERVICE_IDS = [
  "atm-service", // To get local cash (Kip)
  "information-service", // For general help/directions
  "parking-service", // For those being picked up
  "vip-lounge", // To rest while waiting for transport
  "mother-child-room", // For families arriving
  "muslim-prayer-room", // For religious needs upon arrival
];

// Filter services based on selected IDs
const services = facilitiesServices.filter((service) =>
  RELATED_SERVICE_IDS.includes(service.id),
);

// Sort services to match the order in RELATED_SERVICE_IDS
const sortedServices = RELATED_SERVICE_IDS.map((id) =>
  services.find((s) => s.id === id),
).filter(Boolean);

export function RelatedServices({ lang }: RelatedServicesProps) {
  return (
    <div className="bg-white pt-8">
      <div className="container">
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {lang === "en"
              ? "Available Services for Departure"
              : lang === "lo"
                ? "ບໍລິການທີ່ມີໃຫ້ສຳລັບຂາອອກ"
                : "出发厅可用服务"}
          </h3>
          <p className="text-sm text-gray-600">
            {lang === "en"
              ? "Convenient services available at the departure terminal"
              : lang === "lo"
                ? "ບໍລິການທີ່ສະດວກສະບາຍໃນອາຄານຂາອອກ"
                : "出发航站楼提供的便捷服务"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {sortedServices.map((service) => {
            if (!service) return null;
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href={`/services/${service.id}`}
                className="group hover:border-primary-500 hover:bg-primary-50 flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all"
              >
                <div className="bg-primary-100 group-hover:bg-primary-500 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                  <Icon className="text-primary-600 h-7 w-7 transition-colors group-hover:text-white" />
                </div>
                <div className="text-center">
                  <span className="line-clamp-1 block text-sm font-medium text-gray-900">
                    {service.name[lang]}
                  </span>
                  <span className="mt-1 line-clamp-1 block text-xs text-gray-500">
                    {service.shortDescription[lang]}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-800">
              <strong>
                ℹ️{" "}
                {lang === "en"
                  ? "Need Assistance?"
                  : lang === "lo"
                    ? "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອບໍ່?"
                    : "需要帮助？"}
              </strong>{" "}
              {lang === "en"
                ? "Visit our Information Desk in the departure hall or call +856 84 211 XXX."
                : lang === "lo"
                  ? "ກະລຸນາຕິດຕໍ່ເຄົາເຕີປະຊາສຳພັນ ຢູ່ຫ້ອງໂຖງຂາອອກ ຫຼື ໂທ +856 84 211 XXX."
                  : "请前往出发大厅的问询台或致电 +856 84 211 XXX。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
