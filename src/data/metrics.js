// ─────────────────────────────────────────────────────────────────────────────
// METRICS — Portfolio statistics
// Only documented/measured values from actual projects.
// ─────────────────────────────────────────────────────────────────────────────

export const metrics = [
  {
    id: "projects",
    value: 5,
    suffix: "",
    label: "MAJOR PROJECTS",
    sublabel: "Automotive · IoT · Wearable · PCB",
    animateTo: 5,
  },
  {
    id: "ecus",
    value: 2,
    suffix: "",
    label: "AUTOMOTIVE ECUs",
    sublabel: "NXP S32K144 · CAN Communication",
    animateTo: 2,
  },
  {
    id: "hackathon",
    value: 1,
    suffix: "",
    label: "HACKATHON WIN",
    sublabel: "HackInfinity 2025 · H.A.L.O.",
    animateTo: 1,
  },
  {
    id: "lora-range",
    value: 3.5,
    suffix: " KM",
    label: "LoRa MESH RANGE",
    sublabel: "Rescue Link · 3-node prototype",
    animateTo: 3.5,
    decimals: 1,
  },
  {
    id: "rescue-zero-range",
    value: 2.1,
    suffix: " KM",
    label: "SOS BEACON RANGE",
    sublabel: "Rescue-Zero · open terrain",
    animateTo: 2.1,
    decimals: 1,
  },
  {
    id: "latency",
    value: 800,
    suffix: " ms",
    label: "MESH LATENCY",
    sublabel: "Rescue Link · 3-hop average",
    animateTo: 800,
  },
  {
    id: "packet-loss",
    value: 5,
    suffix: "%",
    label: "PACKET LOSS",
    sublabel: "< 5% across 3 hops",
    animateTo: 5,
    prefix: "<",
  },
  {
    id: "runtime",
    value: 12,
    suffix: "+ HRS",
    label: "NODE RUNTIME",
    sublabel: "Rescue Link · per battery charge",
    animateTo: 12,
  },
];

export default metrics;
