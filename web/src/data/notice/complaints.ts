import { MultilingualText } from "@/types/language";

export interface Complaint {
  id: string;
  referenceNumber: string;
  category:
    | "service-quality"
    | "facilities"
    | "staff-behavior"
    | "flight-operations"
    | "security"
    | "baggage"
    | "other";
  subject: string;
  description: string;
  status: "submitted" | "under-review" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  submittedDate: string;
  lastUpdated: string;
  estimatedResolution?: string;
  resolution?: string;
  contactName?: string;
  contactEmail?: string;
}

export interface ComplaintFAQ {
  id: string;
  question: MultilingualText;
  answer: MultilingualText;
  category: string;
}

// Complaint categories with translations
export const complaintCategories = [
  {
    id: "service-quality",
    label: {
      en: "Service Quality",
      lo: "ຄຸນນະພາບການບໍລິການ",
      zh: "服务质量",
    },
  },
  {
    id: "facilities",
    label: {
      en: "Facilities",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "设施",
    },
  },
  {
    id: "staff-behavior",
    label: {
      en: "Staff Behavior",
      lo: "ພຶດຕິກຳພະນັກງານ",
      zh: "员工行为",
    },
  },
  {
    id: "flight-operations",
    label: {
      en: "Flight Operations",
      lo: "ການດຳເນີນງານຖ້ຽວບິນ",
      zh: "航班运营",
    },
  },
  {
    id: "security",
    label: {
      en: "Security",
      lo: "ຄວາມປອດໄພ",
      zh: "安全",
    },
  },
  {
    id: "baggage",
    label: {
      en: "Baggage Handling",
      lo: "ການຈັດການສຳພາ",
      zh: "行李处理",
    },
  },
  {
    id: "other",
    label: {
      en: "Other",
      lo: "ອື່ນໆ",
      zh: "其他",
    },
  },
];

// Complaint status translations
export const complaintStatuses = [
  {
    id: "submitted",
    label: {
      en: "Submitted",
      lo: "ສົ່ງແລ້ວ",
      zh: "已提交",
    },
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "under-review",
    label: {
      en: "Under Review",
      lo: "ກຳລັງກວດສອບ",
      zh: "审核中",
    },
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "resolved",
    label: {
      en: "Resolved",
      lo: "ແກ້ໄຂແລ້ວ",
      zh: "已解决",
    },
    color: "bg-green-100 text-green-700",
  },
  {
    id: "closed",
    label: {
      en: "Closed",
      lo: "ປິດແລ້ວ",
      zh: "已关闭",
    },
    color: "bg-gray-100 text-gray-700",
  },
];

// Sample complaints data
export const complaints: Complaint[] = [
  {
    id: "comp-001",
    referenceNumber: "COMP20250928001",
    category: "service-quality",
    subject: "Long wait time at check-in counter",
    description:
      "Waited over 2 hours at check-in counter despite arriving 3 hours before flight. Only 2 counters were open during peak time.",
    status: "under-review",
    priority: "high",
    submittedDate: "2025-09-28",
    lastUpdated: "2025-09-28",
    estimatedResolution: "2025-10-05",
  },
  {
    id: "comp-002",
    referenceNumber: "COMP20250927002",
    category: "facilities",
    subject: "Restroom cleanliness issue",
    description:
      "Restrooms near Gate 5 were not properly cleaned throughout the day. Lack of paper towels and soap.",
    status: "resolved",
    priority: "medium",
    submittedDate: "2025-09-27",
    lastUpdated: "2025-09-28",
    resolution:
      "We apologize for the inconvenience. Additional cleaning staff has been assigned to that area, and cleaning frequency has been increased.",
  },
  {
    id: "comp-003",
    referenceNumber: "COMP20250926003",
    category: "baggage",
    subject: "Damaged luggage",
    description:
      "My suitcase was severely damaged during handling. Large crack on the side and broken wheel.",
    status: "resolved",
    priority: "high",
    submittedDate: "2025-09-26",
    lastUpdated: "2025-09-27",
    resolution:
      "Claim approved. Compensation of 500,000 LAK has been processed. Please contact baggage services for collection.",
  },
];

// FAQs about complaints
export const complaintFAQs: ComplaintFAQ[] = [
  {
    id: "faq-001",
    category: "general",
    question: {
      en: "How do I file a complaint?",
      lo: "ຂ້ອຍຈະຍື່ນຄຳຮ້ອງທຸກໄດ້ແນວໃດ?",
      zh: "如何提交投诉？",
    },
    answer: {
      en: "You can file a complaint by filling out our online complaint form below, visiting our customer service desk at the airport, or sending an email to complaints@bokeoairport.la. Please provide as much detail as possible including date, time, location, and description of the issue.",
      lo: "ທ່ານສາມາດຍື່ນຄຳຮ້ອງທຸກໄດ້ໂດຍການຕື່ມແບບຟອມຮ້ອງທຸກອອນລາຍຂອງພວກເຮົາຂ້າງລຸ່ມນີ້, ໄປຫາໂຕະບໍລິການລູກຄ້າທີ່ສະໜາມບິນ, ຫຼືສົ່ງອີເມລມາທີ່ complaints@bokeoairport.la. ກະລຸນາໃຫ້ລາຍລະອຽດໃຫ້ຫຼາຍທີ່ສຸດເທົ່າທີ່ຈະເປັນໄປໄດ້ລວມທັງວັນທີ, ເວລາ, ສະຖານທີ່, ແລະຄຳອະທິບາຍຂອງບັນຫາ.",
      zh: "您可以通过填写下方的在线投诉表格、访问机场的客户服务台或发送电子邮件至complaints@bokeoairport.la来提交投诉。请尽可能提供详细信息，包括日期、时间、地点和问题描述。",
    },
  },
  {
    id: "faq-002",
    category: "process",
    question: {
      en: "How long does it take to process a complaint?",
      lo: "ການດຳເນີນການຮ້ອງທຸກໃຊ້ເວລານານປານໃດ?",
      zh: "处理投诉需要多长时间？",
    },
    answer: {
      en: "We aim to acknowledge all complaints within 24 hours and provide a full response within 7-10 business days. Complex cases may take longer, but we will keep you updated throughout the process.",
      lo: "ພວກເຮົາມີເປົ້າໝາຍທີ່ຈະຮັບຮູ້ຄຳຮ້ອງທຸກທັງໝົດພາຍໃນ 24 ຊົ່ວໂມງແລະໃຫ້ຄຳຕອບເຕັມພາຍໃນ 7-10 ວັນເຮັດວຽກ. ກໍລະນີທີ່ສັບສົນອາດໃຊ້ເວລານານກວ່ານີ້, ແຕ່ພວກເຮົາຈະແຈ້ງໃຫ້ທ່ານຊາບຕະຫຼອດຂະບວນການ.",
      zh: "我们的目标是在24小时内确认所有投诉，并在7-10个工作日内提供完整回复。复杂案例可能需要更长时间，但我们会在整个过程中及时通知您。",
    },
  },
  {
    id: "faq-003",
    category: "tracking",
    question: {
      en: "Can I track the status of my complaint?",
      lo: "ຂ້ອຍສາມາດຕິດຕາມສະຖານະຂອງຄຳຮ້ອງທຸກຂອງຂ້ອຍໄດ້ບໍ?",
      zh: "我可以跟踪我的投诉状态吗？",
    },
    answer: {
      en: "Yes, you will receive a reference number when you submit your complaint. You can use this number to check the status online or by contacting our customer service team at +856-84-211-2000.",
      lo: "ໄດ້, ທ່ານຈະໄດ້ຮັບເລກອ້າງອີງເມື່ອທ່ານຍື່ນຄຳຮ້ອງທຸກ. ທ່ານສາມາດໃຊ້ເລກນີ້ເພື່ອກວດສອບສະຖານະທາງອອນລາຍຫຼືໂດຍການຕິດຕໍ່ທີມບໍລິການລູກຄ້າຂອງພວກເຮົາທີ່ +856-84-211-2000.",
      zh: "是的，您在提交投诉时会收到一个参考号码。您可以使用此号码在线查看状态或致电我们的客户服务团队+856-84-211-2000。",
    },
  },
  {
    id: "faq-004",
    category: "compensation",
    question: {
      en: "Will I receive compensation for my complaint?",
      lo: "ຂ້ອຍຈະໄດ້ຮັບການຊົດເຊີຍສຳລັບຄຳຮ້ອງທຸກຂອງຂ້ອຍບໍ?",
      zh: "我会因投诉而获得赔偿吗？",
    },
    answer: {
      en: "Compensation depends on the nature and validity of the complaint. We assess each case individually and will offer appropriate remedies, which may include refunds, vouchers, or other forms of compensation where applicable.",
      lo: "ການຊົດເຊີຍຂຶ້ນກັບລັກສະນະແລະຄວາມຖືກຕ້ອງຂອງຄຳຮ້ອງທຸກ. ພວກເຮົາປະເມີນແຕ່ລະກໍລະນີເປັນລາຍບຸກຄົນແລະຈະສະເໜີວິທີແກ້ໄຂທີ່ເໝາະສົມ, ເຊິ່ງອາດຈະລວມເຖິງການຄືນເງິນ, ບັດກຳນົນ, ຫຼືຮູບແບບອື່ນໆຂອງການຊົດເຊີຍທີ່ມີຢູ່.",
      zh: "赔偿取决于投诉的性质和有效性。我们会单独评估每个案例，并在适用的情况下提供适当的补救措施，可能包括退款、代金券或其他形式的赔偿。",
    },
  },
];

// Complaint processing workflow
export const complaintWorkflow = {
  steps: [
    {
      id: 1,
      title: {
        en: "Submit Complaint",
        lo: "ຍື່ນຄຳຮ້ອງທຸກ",
        zh: "提交投诉",
      },
      description: {
        en: "Fill out the complaint form with all necessary details",
        lo: "ຕື່ມແບບຟອມຮ້ອງທຸກດ້ວຍລາຍລະອຽດທີ່ຈຳເປັນທັງໝົດ",
        zh: "填写投诉表格并提供所有必要详细信息",
      },
    },
    {
      id: 2,
      title: {
        en: "Acknowledgment",
        lo: "ການຮັບຮູ້",
        zh: "确认",
      },
      description: {
        en: "Receive confirmation and reference number within 24 hours",
        lo: "ໄດ້ຮັບການຢືນຢັນແລະເລກອ້າງອີງພາຍໃນ 24 ຊົ່ວໂມງ",
        zh: "在24小时内收到确认和参考号码",
      },
    },
    {
      id: 3,
      title: {
        en: "Investigation",
        lo: "ການສືບສວນ",
        zh: "调查",
      },
      description: {
        en: "Our team reviews and investigates your complaint",
        lo: "ທີມງານຂອງພວກເຮົາກວດສອບແລະສືບສວນຄຳຮ້ອງທຸກຂອງທ່ານ",
        zh: "我们的团队审查和调查您的投诉",
      },
    },
    {
      id: 4,
      title: {
        en: "Resolution",
        lo: "ການແກ້ໄຂ",
        zh: "解决",
      },
      description: {
        en: "Receive a response with resolution within 7-10 business days",
        lo: "ໄດ້ຮັບຄຳຕອບພ້ອມການແກ້ໄຂພາຍໃນ 7-10 ວັນເຮັດວຽກ",
        zh: "在7-10个工作日内收到解决方案",
      },
    },
  ],
};
