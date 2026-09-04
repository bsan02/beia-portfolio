export type Project = {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "risc-v-cpu",
    title: "RISC-V CPU in Verilog & Logisim",
    period: "March – May 2025",
    stack: ["Verilog", "SystemVerilog", "Logisim"],
    summary:
      "A 3-stage pipelined RISC-V CPU, prototyped from scratch and verified like production hardware.",
    bullets: [
      "Prototyped and programmed a 3-stage pipelined RISC-V CPU (Fetch, Decode/Execute, Memory/Writeback), simulated in Logisim to validate architectural design.",
      "Developed SystemVerilog assertions and testbenches to verify correctness of the datapath, register file, and PC update logic.",
      "Built a rigorous verification workflow using assertions, directed tests, and waveform-based debugging to diagnose faulty PC updates, misaligned instruction fetches, and memory-timing bugs.",
    ],
    featured: true,
  },
  {
    slug: "trust-attestation-infrastructure",
    title: "GPU & Host Trust Attestation Infrastructure",
    period: "Summer 2025 · Nutanix",
    stack: ["TPM", "TEE", "NVIDIA H100", "AMD SEV-SNP"],
    summary:
      "End-to-end trust infrastructure securing confidential AI/ML workloads across physical hosts and GPUs.",
    bullets: [
      "Implemented TPM-based attestation on physical AHV hosts to keep malicious nodes out of Prism Central.",
      "Enabled TEE and Confidential Compute mode on NVIDIA H100 GPUs to secure confidential AI/ML workloads.",
      "Bridged local and cloud attestation flows with AMD SEV-SNP and NVIDIA Trust Outpost, extending the distributed trust chain.",
    ],
  },
  {
    slug: "url-data-pipeline",
    title: "18M+ URL Data Integration Pipeline",
    period: "Summer 2025 · Citylitics",
    stack: ["Python", "SQL", "BigQuery"],
    summary:
      "Automated extraction and curation pipeline that turned a noisy web crawl into a gold-standard ML dataset.",
    bullets: [
      "Automated extraction from a web crawler into BigQuery, cutting noise by ~70% and halving query runtime.",
      "Designed a human-in-the-loop labeling pipeline with anomaly detection to improve classification accuracy.",
      "Produced a gold-standard curated dataset used to accelerate downstream ML dataset preparation.",
    ],
  },
  {
    slug: "formula-electric-bms",
    title: "Formula Electric Battery Management System",
    period: "Student project",
    stack: ["Embedded C", "PCB Design"],
    summary: "Battery management system work for a Formula Electric racing team.",
    bullets: [
      "Contributed to the battery management system (BMS) supporting the team's electric race vehicle.",
    ],
  },
  {
    slug: "two-stage-op-amp",
    title: "Two-Stage Op-Amp",
    period: "Student project",
    stack: ["Analog IC Design"],
    summary: "Analog circuit design and simulation of a two-stage operational amplifier.",
    bullets: [
      "Designed and simulated a two-stage operational amplifier as part of analog IC coursework.",
    ],
  },
  {
    slug: "sixt33n",
    title: "SIXT33N — Voice-Controlled Car",
    period: "Student project",
    stack: ["Embedded Systems", "Signal Processing"],
    summary: "A voice-controlled car built for an embedded systems design course.",
    bullets: [
      "Built and tuned a voice-controlled car, integrating signal processing with embedded control.",
    ],
  },
];
