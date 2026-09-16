export type Project = {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  featured?: boolean;
  github?: string;
  proof?: {
    images?: { src: string; alt: string }[];
    videos?: { src: string; caption?: string }[];
    documents?: { label: string; href: string }[];
  };
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
      "Designed a 3-stage pipelined RISC-V datapath (Fetch, Decode/Execute, Memory/Writeback) with a full register file and PC control logic, prototyped in Logisim.",
      "Wrote SystemVerilog assertions and directed testbenches to formally check datapath, register file, and PC-update correctness cycle by cycle.",
      "Used waveform-based debugging to isolate and fix faulty PC updates, misaligned instruction fetches, and memory-timing bugs across the pipeline.",
    ],
    featured: true,
    github: "https://github.com/bsan02/riscv-asic-cpu",
  },
  {
    slug: "trust-attestation-infrastructure",
    title: "GPU & Host Trust Attestation Infrastructure",
    period: "Summer 2025 · Nutanix",
    stack: ["TPM", "TEE", "NVIDIA H100", "AMD SEV-SNP"],
    summary:
      "End-to-end trust infrastructure securing confidential AI/ML workloads across physical hosts and GPUs.",
    bullets: [
      "Implemented TPM 2.0 remote attestation using PCR-based measured boot and Endorsement Key (EK) certificate validation to verify AHV host integrity before granting Prism Central access.",
      "Enabled TEE and Confidential Compute mode on NVIDIA H100 GPUs, with per-session service secrets released only after AIK credential activation and PCR quote validation succeed.",
      "Extended the trust chain to cloud attestation flows with AMD SEV-SNP and NVIDIA Trust Outpost, bridging local and remote host verification.",
    ],
    proof: {
      documents: [
        {
          label: "Remote Attestation of Physical AHV Host & NVIDIA GPU (Slide Deck)",
          href: "/documents/trust-attestation-infrastructure/TPM-GPU-Attestation-Slides.pdf",
        },
      ],
    },
  },
  {
    slug: "url-data-pipeline",
    title: "18M+ URL Data Integration Pipeline",
    period: "Summer 2025 · Citylitics",
    stack: ["Python", "SQL", "BigQuery"],
    summary:
      "Automated extraction and curation pipeline that turned a noisy web crawl into a gold-standard ML dataset.",
    bullets: [
      "Built an automated extraction pipeline from an 18M+ URL web crawl into BigQuery, cutting noise by ~70% and halving query runtime.",
      "Designed a human-in-the-loop labeling workflow with anomaly detection to catch mislabeled and out-of-distribution records.",
      "Delivered a gold-standard curated dataset that accelerated downstream ML dataset preparation across the team.",
    ],
    proof: {
      documents: [
        {
          label: "18M+ URL Data Integration Pipeline (Slide Deck)",
          href: "/documents/url-data-pipeline/URL-Data-Integration-Pipeline-Slides.pdf",
        },
      ],
    },
  },
  {
    slug: "formula-electric-bms",
    title: "Formula Electric Battery Management System",
    period: "Student project",
    stack: ["Embedded C", "PCB Design"],
    summary: "Battery management system work for a Formula Electric racing team.",
    bullets: [
      "Designed KiCad schematics for pack-level battery temperature sensing, per-cell voltage sensing, and transistor-switched cell balancing.",
      "Built voltage-sensing circuitry around LMV331 comparators feeding the MCU's ADC inputs for real-time cell monitoring.",
      "Mapped the MCU pinout and embedded C interfacing between the sensing hardware and the accumulator EE stack for the team's electric race vehicle.",
    ],
    featured: true,
    proof: {
      images: [
        {
          src: "/images/builds/formula-electric-bms/bms-schematic-overview.png",
          alt: "KiCad schematic sheet showing battery temperature sensing, cell balancing with transistor switches, and voltage sensing circuitry",
        },
      ],
      documents: [
        {
          label: "Voltage Sensing Detail (image)",
          href: "/images/builds/formula-electric-bms/voltage-sensing-detail.png",
        },
        {
          label: "BMS Report (PDF)",
          href: "/documents/formula-electric-bms/BMS-Report.pdf",
        },
        {
          label: "MCU Pinout Reference (PDF)",
          href: "/documents/formula-electric-bms/MCU-Pinout-Reference.pdf",
        },
      ],
    },
  },
  {
    slug: "two-stage-op-amp",
    title: "Two-Stage Op-Amp",
    period: "Student project",
    stack: ["Analog IC Design"],
    summary: "Analog circuit design and simulation of a two-stage operational amplifier.",
    bullets: [
      "Designed a two-stage op-amp: a telescopic cascode first stage for high gain and a class AB second stage for low quiescent current, linked by a Miller compensation cap.",
      "Sized transistors and a 7.25:1 current-mirror bias to hit a closed-loop gain of 2 while meeting a 180ns settling-time spec.",
      "Simulated 65.4° phase margin, 0.044% total error, and 138.3ns settling time at 801.6µW — beating the target static and dynamic error budgets.",
    ],
    github: "https://github.com/bsan02/lcd-driver-opamp-sizing",
    proof: {
      images: [
        {
          src: "/images/builds/two-stage-op-amp/two-stage-op-amp-schematic.jpg",
          alt: "Schematic of the two-stage op-amp: telescopic cascode first stage and class AB output stage with Miller compensation",
        },
      ],
      documents: [
        {
          label: "Design Report (PDF)",
          href: "/documents/two-stage-op-amp/Op-Amp-Report.pdf",
        },
      ],
    },
  },
  {
    slug: "sixt33n",
    title: "SIXT33N — Voice-Controlled Car",
    period: "Student project",
    stack: ["Embedded Systems", "Signal Processing"],
    summary: "A voice-controlled car built for an embedded systems design course.",
    bullets: [
      "Characterized motor dynamics via a PWM duty-cycle sweep and encoder logging, fitting per-wheel linear velocity models (θ, β) to correct for wheel asymmetry.",
      "Built closed-loop control on wheel-distance differential (δ[i] = d_L[i] − d_R[i]) for straight-line driving and controlled 90° turns, with startup jolts to overcome static friction.",
      "Trained a PCA/SVD voice classifier (3 principal components, ~40 samples per word) to recognize 4 spoken commands and trigger the matching drive maneuver in real time.",
    ],
    github: "https://github.com/bsan02/sixt33n-voice-controlled-car/tree/main",
    proof: {
      videos: [
        {
          src: "/videos/sixt33n/demo_final_run.mp4",
          caption: "Final demo: SIXT33N listening for a voice command and driving the corresponding maneuver.",
        },
      ],
    },
  },
];
