export type Role = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

export const EDUCATION = {
  school: "University of California, Berkeley",
  degree: "B.S. Electrical Engineering and Computer Science",
  graduation: "December 2025",
  coursework: [
    "Data Structures and Algorithms",
    "Great Ideas in Computer Architecture",
    "Principles and Techniques of Data Science",
  ],
};

export const SKILLS = {
  technical: [
    "Python",
    "Java",
    "SQL",
    "Google Cloud Platform (BigQuery)",
    "ETL Pipelines",
    "ML Data Pipelines",
    "Data Quality Automation",
    "Workflow Automation",
  ],
  systems: [
    "Distributed Systems",
    "Virtualization & Cloud Infrastructure (AHV, Hypervisor)",
    "OS & Security Principles",
    "System Debugging",
    "Trust & Attestation (TPM, TEE)",
  ],
};

export const EXPERIENCE: Role[] = [
  {
    title: "Engineering Project Manager I — AI/ML Data Operations",
    org: "Apple (via INSPYR Solutions)",
    period: "March 2026 – Present",
    bullets: [
      "Directed a global AI/ML data collection program spanning 3+ concurrent projects, acquiring and validating 10,000+ training assets to directly support deployment of core ML models for consumer-facing features.",
      "Transformed the data validation strategy by automating QA through similarity clustering and Tableau analysis across the asset dataset, cutting manual review time and strengthening model generalization readiness.",
      "Drove company-wide data collection initiatives across Engineering, Operations, and vendor teams, achieving a 90% improvement in participant throughput while building proactive frameworks for on-time delivery.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Nutanix",
    period: "July 2025 – September 2025",
    bullets: [
      "Engineered end-to-end trust infrastructure by implementing TPM-based attestation on physical AHV hosts, preventing malicious nodes from joining Prism Central (cluster management platform).",
      "Integrated NVIDIA GPU attestation by enabling TEE and Confidential Compute (CC) mode on H100 GPUs, securing confidential AI/ML workloads.",
      "Configured AMD SEV-SNP and NVIDIA Trust Outpost to bridge local and cloud attestation flows, validating GPU state and extending the distributed trust chain.",
    ],
  },
  {
    title: "Data Engineer Intern",
    org: "Citylitics",
    period: "May 2025 – July 2025",
    bullets: [
      "Built data integration pipelines that automated extraction from Citylitics' web crawler, cleaning and curating 18M+ URLs into BigQuery with SQL — cutting noise by ~70% and halving query runtime.",
      "Designed a human-in-the-loop labeling pipeline with anomaly detection and continuous updates to improve document vs. webpage classification accuracy in production ML models.",
      "Drove the creation of a gold-standard curated dataset to accelerate ML dataset preparation and strengthen the reliability of the company's infrastructure intelligence platform.",
    ],
  },
];
