export const NATIONAL_AGGREGATES = {
  totalNotifiedAreaHa: 4850.5,
  totalAcquiredAreaHa: 3120.2,
  totalCompensationAssessedCr: 450.8,
  totalCompensationPaidCr: 310.4,
  affectedFamiliesCount: 3850,
  displacedFamiliesCount: 1420,
  rrHousingAllottedCount: 1180,
  possessionHandedOverPct: 68,
  timelineSlaAdherencePct: 82,
  activeProjectsCount: 14,
  statesCoveredCount: 8
};

export const API_INTEGRATIONS_STATUS = [
  { name: "Mahabhulekh / State Land Records API", status: "CONNECTED", latency: "42ms", endpoint: "api.mahabhulekh.gov.in/v2/khasra" },
  { name: "Bhuvan ISRO Spatial Cadastral Map Service", status: "CONNECTED", latency: "88ms", endpoint: "bhuvan-vec1.nrsc.gov.in/wms" },
  { name: "Sub-Registrar Office (SRO) Encumbrance API", status: "CONNECTED", latency: "115ms", endpoint: "igrmahashta.gov.in/api/encumbrance" },
  { name: "PFMS Direct Benefit Transfer (DBT) Payout Gateway", status: "CONNECTED", latency: "65ms", endpoint: "pfms.nic.in/api/dbt/disburse" },
  { name: "e-Courts National Judicial Data Grid (NJDG) Stay Lookup", status: "CONNECTED", latency: "140ms", endpoint: "services.ecourts.gov.in/api/case-search" }
];

export const INITIAL_PARCELS = [
  {
    id: "LND-MH-2026-0101",
    khasraNo: "142/1A",
    ownerName: "Rameshwar Patil",
    ownerContact: "+91 98230 11452",
    village: "Hingna",
    district: "Nagpur",
    state: "Maharashtra",
    project: "Nagpur-Goa Economic Expressway (Section B)",
    areaAcquired: "3.20 Ha",
    landType: "Agricultural (Irrigated)",
    stage: "Section 19",
    stageCode: 3,
    stageProgress: 75,
    possessionStatus: "In Progress (75%)",
    affectedFamilies: 4,
    displacedFamilies: 1,
    rrStatus: "Housing Allotment Letter Issued",
    coordinates: [21.0667, 78.9667],
    polygon: [
      [21.0680, 78.9650],
      [21.0695, 78.9680],
      [21.0655, 78.9695],
      [21.0645, 78.9660]
    ],
    compensationTotal: 6850000,
    disbursedAmount: 0,
    assignedOfficer: "Shri V. K. Deshmukh (SLAO Grade-I)",
    officerId: "OFF-NGP-04",
    slaStatus: "WARNING",
    daysInStage: 42,
    slaDeadlineDays: 45,
    riskScore: 68,
    riskLevel: "MEDIUM",
    riskFactors: [
      "Co-owner inheritance dispute pending at District Court",
      "Encumbrance Certificate clearance pending verification"
    ],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "PENDING",
      bankDetails: "VERIFIED",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Title_Deed_Khasra_142_1A.pdf", version: "v2.1", sha256: "8a4f91e2b...d39a", date: "2026-02-10", uploader: "SLAO Nagpur", eSign: "VERIFIED" },
      { name: "7_12_Extract_Mahabhulekh.pdf", version: "v1.0", sha256: "3c91b82a...e401", date: "2025-11-15", uploader: "Circle Officer", eSign: "VERIFIED" },
      { name: "Encumbrance_Cert_SRO.pdf", version: "v1.1 (Query Pending)", sha256: "0b12f45c...99a2", date: "2026-01-20", uploader: "Sub-Registrar", eSign: "PENDING" }
    ],
    timeline: [
      { date: "2025-11-10", stage: "Section 4", note: "Preliminary Notification published in Govt Gazette", officer: "SLAO Nagpur" },
      { date: "2026-01-15", stage: "Section 11", note: "Public Hearing & Objections recorded under Rule 15", officer: "SLAO Nagpur" },
      { date: "2026-03-20", stage: "Section 19", note: "Final Acquisition Declaration issued", officer: "Collector Nagpur" }
    ]
  },
  {
    id: "LND-MH-2026-0102",
    khasraNo: "88/3B",
    ownerName: "Sunita Devi Sharma",
    ownerContact: "+91 94221 88301",
    village: "Butibori",
    district: "Nagpur",
    state: "Maharashtra",
    project: "Nagpur Industrial Corridor Connector",
    areaAcquired: "1.85 Ha",
    landType: "Commercial / Industrial Boundary",
    stage: "Disbursement",
    stageCode: 4,
    stageProgress: 100,
    possessionStatus: "Possession Handed Over (100%)",
    affectedFamilies: 2,
    displacedFamilies: 0,
    rrStatus: "N/A (Non-residential)",
    coordinates: [20.9167, 78.9833],
    polygon: [
      [20.9180, 78.9810],
      [20.9195, 78.9840],
      [20.9155, 78.9855],
      [20.9145, 78.9820]
    ],
    compensationTotal: 9200000,
    disbursedAmount: 9200000,
    assignedOfficer: "Smt. Archana Jadhav (Dy. Collector)",
    officerId: "OFF-NGP-02",
    slaStatus: "HEALTHY",
    daysInStage: 12,
    slaDeadlineDays: 30,
    riskScore: 12,
    riskLevel: "LOW",
    riskFactors: [],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "VERIFIED",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Commercial_Title_Deed_88_3B.pdf", version: "v1.0", sha256: "f421e89b...c104", date: "2025-08-04", uploader: "Dy. Collector", eSign: "VERIFIED" },
      { name: "DBT_Payment_Receipt_Treasury.pdf", version: "v1.0", sha256: "91e0321a...88b1", date: "2026-02-18", uploader: "Treasury Officer", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2025-08-04", stage: "Section 4", note: "Section 4 Notification issued", officer: "Dy. Collector" },
      { date: "2025-10-12", stage: "Section 11", note: "Survey completed, zero objections received", officer: "Dy. Collector" },
      { date: "2025-12-05", stage: "Section 19", note: "Award determination approved", officer: "Collector Nagpur" },
      { date: "2026-02-18", stage: "Disbursement", note: "100% Compensation transferred via Direct Benefit Transfer (DBT)", officer: "Treasury Officer" }
    ]
  },
  {
    id: "LND-MH-2026-0103",
    khasraNo: "210/4",
    ownerName: "Gajanan Kisanrao Deshmukh",
    ownerContact: "+91 97654 33210",
    village: "Umred",
    district: "Nagpur",
    state: "Maharashtra",
    project: "Nagpur-Goa Economic Expressway (Section B)",
    areaAcquired: "4.50 Ha",
    landType: "Agricultural (Non-irrigated)",
    stage: "Section 11",
    stageCode: 2,
    stageProgress: 40,
    possessionStatus: "Pending Survey Clearance (40%)",
    affectedFamilies: 6,
    displacedFamilies: 2,
    rrStatus: "SIA R&R Hearing Pending",
    coordinates: [20.8500, 79.3333],
    polygon: [
      [20.8520, 79.3310],
      [20.8540, 79.3340],
      [20.8490, 79.3360],
      [20.8470, 79.3320]
    ],
    compensationTotal: 5400000,
    disbursedAmount: 0,
    assignedOfficer: "Shri V. K. Deshmukh (SLAO Grade-I)",
    officerId: "OFF-NGP-04",
    slaStatus: "BREACHED",
    daysInStage: 78,
    slaDeadlineDays: 60,
    riskScore: 89,
    riskLevel: "CRITICAL",
    riskFactors: [
      "SLA Exceeded by 18 Days in Hearing Phase",
      "Gram Sabha Resolution verification missing",
      "High litigation probability (Court Stay Motion #88/2026)"
    ],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "REJECTED",
      bankDetails: "PENDING",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Agricultural_Title_210_4.pdf", version: "v1.0", sha256: "721a998b...01e2", date: "2025-10-01", uploader: "SLAO Nagpur", eSign: "VERIFIED" },
      { name: "Objection_Petition_Villagers.pdf", version: "v1.2", sha256: "e901234c...b901", date: "2025-12-10", uploader: "Gram Sabha Secretary", eSign: "PENDING" }
    ],
    timeline: [
      { date: "2025-10-01", stage: "Section 4", note: "Initial notification gazetted", officer: "SLAO Nagpur" },
      { date: "2025-12-10", stage: "Section 11", note: "Objections filed regarding valuation rate", officer: "SLAO Nagpur" }
    ]
  },
  {
    id: "LND-MH-2026-0104",
    khasraNo: "55/1",
    ownerName: "Prakash Chintamanrao Shinde",
    ownerContact: "+91 98901 22344",
    village: "Chakan",
    district: "Pune",
    state: "Maharashtra",
    project: "Pune Ring Road Infrastructure Expansion",
    areaAcquired: "1.10 Ha",
    landType: "Commercial",
    stage: "Section 4",
    stageCode: 1,
    stageProgress: 20,
    possessionStatus: "Initial Gazette Phase (20%)",
    affectedFamilies: 1,
    displacedFamilies: 0,
    rrStatus: "N/A",
    coordinates: [18.7500, 73.8500],
    polygon: [
      [18.7520, 73.8480],
      [18.7535, 73.8510],
      [18.7490, 73.8525],
      [18.7480, 73.8490]
    ],
    compensationTotal: 12500000,
    disbursedAmount: 0,
    assignedOfficer: "Shri A. R. Kulkarni (SLAO Pune)",
    officerId: "OFF-PNE-01",
    slaStatus: "HEALTHY",
    daysInStage: 14,
    slaDeadlineDays: 30,
    riskScore: 24,
    riskLevel: "LOW",
    riskFactors: [],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "PENDING",
      socialImpactReport: "IN_PROGRESS"
    },
    docRepository: [
      { name: "Chakan_Sec4_Gazette_Notice.pdf", version: "v1.0", sha256: "1098234a...f990", date: "2026-02-01", uploader: "SLAO Pune", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2026-02-01", stage: "Section 4", note: "Gazette publication under Section 4(1) LARR Act 2013", officer: "SLAO Pune" }
    ]
  },
  {
    id: "LND-MH-2026-0105",
    khasraNo: "312/7",
    ownerName: "Anil Bapurao Pawar",
    ownerContact: "+91 93710 55667",
    village: "Haveli",
    district: "Pune",
    state: "Maharashtra",
    project: "Pune Ring Road Infrastructure Expansion",
    areaAcquired: "2.75 Ha",
    landType: "Agricultural (Irrigated)",
    stage: "Section 19",
    stageCode: 3,
    stageProgress: 85,
    possessionStatus: "Final Declaration Approved (85%)",
    affectedFamilies: 3,
    displacedFamilies: 1,
    rrStatus: "Resettlement Site Allotment in Progress",
    coordinates: [18.4500, 73.9000],
    polygon: [
      [18.4520, 73.8980],
      [18.4535, 73.9015],
      [18.4485, 73.9025],
      [18.4475, 73.8990]
    ],
    compensationTotal: 8900000,
    disbursedAmount: 0,
    assignedOfficer: "Shri A. R. Kulkarni (SLAO Pune)",
    officerId: "OFF-PNE-01",
    slaStatus: "HEALTHY",
    daysInStage: 22,
    slaDeadlineDays: 45,
    riskScore: 35,
    riskLevel: "LOW",
    riskFactors: [
      "Minor boundary recalculation requested by survey officer"
    ],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "VERIFIED",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Section19_Declaration_Haveli.pdf", version: "v2.0", sha256: "98ab341c...22d1", date: "2026-01-28", uploader: "Collector Pune", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2025-09-15", stage: "Section 4", note: "Section 4 notice dispatched", officer: "SLAO Pune" },
      { date: "2025-11-20", stage: "Section 11", note: "Public hearing closed with consensus", officer: "SLAO Pune" },
      { date: "2026-01-28", stage: "Section 19", note: "Section 19 Declaration published", officer: "Collector Pune" }
    ]
  },
  {
    id: "LND-MH-2026-0106",
    khasraNo: "174/2",
    ownerName: "Kavita Mohanrao Wagh",
    ownerContact: "+91 91580 44991",
    village: "Kalyan East",
    district: "Thane",
    state: "Maharashtra",
    project: "Dedicated Freight Corridor (DFCCIL Zone 4)",
    areaAcquired: "0.95 Ha",
    landType: "Residential Structure",
    stage: "Section 11",
    stageCode: 2,
    stageProgress: 55,
    possessionStatus: "Structure Dispute (55%)",
    affectedFamilies: 8,
    displacedFamilies: 8,
    rrStatus: "Rehabilitation Package Under Objection",
    coordinates: [19.2333, 73.1333],
    polygon: [
      [19.2350, 73.1315],
      [19.2365, 73.1345],
      [19.2320, 73.1355],
      [19.2310, 73.1325]
    ],
    compensationTotal: 14200000,
    disbursedAmount: 0,
    assignedOfficer: "Smt. Meena Thorat (Dy. Collector Thane)",
    officerId: "OFF-THN-03",
    slaStatus: "BREACHED",
    daysInStage: 94,
    slaDeadlineDays: 60,
    riskScore: 92,
    riskLevel: "CRITICAL",
    riskFactors: [
      "Structure valuation disagreement (SIA Appeal #104)",
      "Rehabilitation & Resettlement (R&R) scheme allocation pending"
    ],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "PENDING",
      socialImpactReport: "REJECTED"
    },
    docRepository: [
      { name: "Residential_Structure_Valuation.pdf", version: "v1.2", sha256: "5512ab4c...d991", date: "2025-09-30", uploader: "Valuer Officer", eSign: "VERIFIED" },
      { name: "RR_Rehabilitation_Objection_Petition.pdf", version: "v1.0", sha256: "aa99812b...33e4", date: "2025-11-05", uploader: "Kalyan Resident Union", eSign: "REJECTED" }
    ],
    timeline: [
      { date: "2025-07-10", stage: "Section 4", note: "Section 4 gazette notification", officer: "Dy. Collector Thane" },
      { date: "2025-09-30", stage: "Section 11", note: "R&R hearing requested by residents", officer: "Dy. Collector Thane" }
    ]
  },
  {
    id: "LND-GJ-2026-0201",
    khasraNo: "412/2B",
    ownerName: "Harshad Bhai Patel",
    ownerContact: "+91 98250 99123",
    village: "Dholera",
    district: "Ahmedabad",
    state: "Gujarat",
    project: "Dholera Special Investment Region (DSIR)",
    areaAcquired: "5.60 Ha",
    landType: "Agricultural (Irrigated)",
    stage: "Section 19",
    stageCode: 3,
    stageProgress: 80,
    possessionStatus: "Final Declaration Awarded (80%)",
    affectedFamilies: 5,
    displacedFamilies: 1,
    rrStatus: "Industrial Plot Allotment Issued",
    coordinates: [22.2500, 72.1833],
    polygon: [
      [22.2520, 72.1810],
      [22.2540, 72.1845],
      [22.2490, 72.1860],
      [22.2480, 72.1820]
    ],
    compensationTotal: 18500000,
    disbursedAmount: 12000000,
    assignedOfficer: "Shri J. K. Solanki (SLAO Dholera)",
    officerId: "OFF-AMD-01",
    slaStatus: "HEALTHY",
    daysInStage: 28,
    slaDeadlineDays: 45,
    riskScore: 22,
    riskLevel: "LOW",
    riskFactors: [],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "VERIFIED",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Dholera_Title_Deed_412_2B.pdf", version: "v1.0", sha256: "9912ab3c...e881", date: "2026-01-15", uploader: "SLAO Ahmedabad", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2025-08-12", stage: "Section 4", note: "Section 4 notice issued", officer: "SLAO Dholera" },
      { date: "2025-11-04", stage: "Section 11", note: "Public hearing closed with consensus", officer: "SLAO Dholera" },
      { date: "2026-01-15", stage: "Section 19", note: "Section 19 Declaration gazetted", officer: "Collector Ahmedabad" }
    ]
  },
  {
    id: "LND-GJ-2026-0202",
    khasraNo: "98/1",
    ownerName: "Bhaveshkumar Shah",
    ownerContact: "+91 94261 44321",
    village: "Sachin",
    district: "Surat",
    state: "Gujarat",
    project: "Mumbai-Ahmedabad High Speed Rail (Bullet Train)",
    areaAcquired: "2.10 Ha",
    landType: "Commercial Boundary",
    stage: "Disbursement",
    stageCode: 4,
    stageProgress: 100,
    possessionStatus: "Possession Handed Over (100%)",
    affectedFamilies: 2,
    displacedFamilies: 0,
    rrStatus: "N/A",
    coordinates: [21.0833, 72.8833],
    polygon: [
      [21.0850, 72.8815],
      [21.0865, 72.8845],
      [21.0820, 72.8855],
      [21.0810, 72.8825]
    ],
    compensationTotal: 24000000,
    disbursedAmount: 24000000,
    assignedOfficer: "Smt. Neeta Mehta (Dy. Collector Surat)",
    officerId: "OFF-SRT-02",
    slaStatus: "HEALTHY",
    daysInStage: 8,
    slaDeadlineDays: 30,
    riskScore: 10,
    riskLevel: "LOW",
    riskFactors: [],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "VERIFIED",
      socialImpactReport: "VERIFIED"
    },
    docRepository: [
      { name: "Surat_BulletTrain_Receipt.pdf", version: "v1.0", sha256: "4410e98a...22b1", date: "2026-02-12", uploader: "Treasury Officer", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2025-06-20", stage: "Section 4", note: "Section 4 preliminary gazette", officer: "Dy. Collector Surat" },
      { date: "2026-02-12", stage: "Disbursement", note: "100% DBT payout completed", officer: "Treasury Officer" }
    ]
  },
  {
    id: "LND-KA-2026-0301",
    khasraNo: "154/3",
    ownerName: "Venkatesh Gowda",
    ownerContact: "+91 99001 88776",
    village: "Yelahanka",
    district: "Bengaluru Urban",
    state: "Karnataka",
    project: "Bengaluru Peripheral Ring Road Phase II",
    areaAcquired: "3.40 Ha",
    landType: "Agricultural",
    stage: "Section 11",
    stageCode: 2,
    stageProgress: 45,
    possessionStatus: "Survey Verification (45%)",
    affectedFamilies: 7,
    displacedFamilies: 2,
    rrStatus: "SIA Public Hearing Pending",
    coordinates: [13.1000, 77.5933],
    polygon: [
      [13.1020, 77.5910],
      [13.1040, 77.5945],
      [13.0990, 77.5960],
      [13.0980, 77.5920]
    ],
    compensationTotal: 21000000,
    disbursedAmount: 0,
    assignedOfficer: "Shri M. N. Shivakumar (SLAO BDA)",
    officerId: "OFF-BLR-01",
    slaStatus: "WARNING",
    daysInStage: 52,
    slaDeadlineDays: 60,
    riskScore: 65,
    riskLevel: "MEDIUM",
    riskFactors: [
      "Land title mutation entry delayed at Tahsildar office"
    ],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "PENDING",
      bankDetails: "VERIFIED",
      socialImpactReport: "IN_PROGRESS"
    },
    docRepository: [
      { name: "Yelahanka_PRR_Sec11_Notice.pdf", version: "v1.0", sha256: "88a1239c...99d0", date: "2026-01-05", uploader: "SLAO BDA", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2025-10-10", stage: "Section 4", note: "Section 4 preliminary gazette", officer: "SLAO BDA" },
      { date: "2026-01-05", stage: "Section 11", note: "Section 11 survey initiated", officer: "SLAO BDA" }
    ]
  },
  {
    id: "LND-UP-2026-0401",
    khasraNo: "782/1",
    ownerName: "Chaudhary Rampal Singh",
    ownerContact: "+91 98370 11223",
    village: "Jewar",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    project: "Noida International Airport (Jewar Runway Phase 2)",
    areaAcquired: "6.80 Ha",
    landType: "Agricultural (Irrigated)",
    stage: "Section 4",
    stageCode: 1,
    stageProgress: 30,
    possessionStatus: "Objections Invitation Phase (30%)",
    affectedFamilies: 12,
    displacedFamilies: 4,
    rrStatus: "R&R Township Site Inspection Ongoing",
    coordinates: [28.1833, 77.5500],
    polygon: [
      [28.1850, 77.5480],
      [28.1870, 77.5520],
      [28.1810, 77.5535],
      [28.1800, 77.5490]
    ],
    compensationTotal: 34000000,
    disbursedAmount: 0,
    assignedOfficer: "Shri R. P. Bhati (ADM Land Acquisition Noida)",
    officerId: "OFF-GBN-02",
    slaStatus: "HEALTHY",
    daysInStage: 18,
    slaDeadlineDays: 30,
    riskScore: 30,
    riskLevel: "LOW",
    riskFactors: [],
    documents: {
      titleDeed: "VERIFIED",
      sevenTwelveExtract: "VERIFIED",
      encumbranceCert: "VERIFIED",
      bankDetails: "IN_PROGRESS",
      socialImpactReport: "IN_PROGRESS"
    },
    docRepository: [
      { name: "Jewar_Airport_Phase2_Sec4.pdf", version: "v1.0", sha256: "aa44119e...8801", date: "2026-02-05", uploader: "ADM Noida", eSign: "VERIFIED" }
    ],
    timeline: [
      { date: "2026-02-05", stage: "Section 4", note: "UP Gazette Section 4 notification issued for Jewar Runway 2", officer: "ADM Noida" }
    ]
  }
];

export const STAGE_CONFIG = {
  "Section 4": {
    label: "Section 4",
    title: "Sec 4: Preliminary Notification",
    description: "Gazette notification of intent to acquire land. Public objections period (60 days).",
    color: "#f59e0b",
    badgeClass: "badge-amber",
    slaDays: 30
  },
  "Section 11": {
    label: "Section 11",
    title: "Sec 11: Survey & Public Hearing",
    description: "Social Impact Assessment (SIA) & objection hearing by Collector under Rule 15.",
    color: "#3b82f6",
    badgeClass: "badge-blue",
    slaDays: 60
  },
  "Section 19": {
    label: "Section 19",
    title: "Sec 19: Final Declaration",
    description: "Final acquisition declaration & land valuation award determination.",
    color: "#8b5cf6",
    badgeClass: "badge-purple",
    slaDays: 45
  },
  "Disbursement": {
    label: "Disbursement",
    title: "Compensation Disbursement",
    description: "Direct Benefit Transfer (DBT) of compensation award to landowner bank accounts.",
    color: "#10b981",
    badgeClass: "badge-green",
    slaDays: 30
  }
};
