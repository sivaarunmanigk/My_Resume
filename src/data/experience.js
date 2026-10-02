// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE TIMELINE
// Only documented events are listed here. No fabricated roles.
// ─────────────────────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "smart-agri-pcb",
    year: "2024",
    type: "project",
    label: "PROJECT",
    title: "Smart Agriculture Monitoring System",
    subtitle: "IoT + PCB Design",
    description:
      "Designed and built an ESP32-based IoT agricultural sensor node with custom PCB in KiCad. Soil moisture, temperature, humidity and light monitoring via Blynk dashboard.",
    tags: ["ESP32", "PCB", "IoT", "KiCad", "Blynk"],
    icon: "circuit",
  },

  {
    id: "rescue-link-project",
    year: "2025",
    type: "project",
    label: "PROJECT",
    title: "Rescue Link & Rescue-Zero",
    subtitle: "Off-grid LoRa Mesh Communication",
    description:
      "Designed and built two emergency communication prototypes using ESP32, LoRa SX1276 and GPS. Rescue Link: 3-node mesh with BLE bridge. Rescue-Zero: single-button SOS beacon.",
    tags: ["ESP32", "LoRa", "GPS", "BLE", "Mesh"],
    icon: "radio",
  },
  {
    id: "halo-hackathon",
    year: "2025",
    type: "award",
    label: "1ST PLACE",
    title: "H.A.L.O.",
    subtitle: "HackInfinity 2025",
    description:
      "First place at HackInfinity 2025. Built H.A.L.O., a wearable BLE health monitor (heart rate, SpO₂, temperature, humidity) using ESP32 and three sensor ICs in 24 hours.",
    tags: ["ESP32", "MAX30102", "MLX90614", "BLE", "HackInfinity"],
    icon: "trophy",
    highlight: true,
  },
  {
    id: "automotive-training",
    year: "2026",
    type: "training",
    label: "TRAINING",
    title: "Automotive Embedded Systems",
    subtitle: "ANCIT",
    description:
      "Intensive automotive embedded systems training covering NXP S32K144 MCU architecture, CAN protocol, DBC file authoring, UDS diagnostics fundamentals, AUTOSAR concepts and TSMaster CAN analysis.",
    tags: ["S32K144", "CAN", "DBC", "UDS", "AUTOSAR", "TSMaster"],
    icon: "ecu",
  },
  {
    id: "automotive-ecu-project",
    year: "2026",
    type: "project",
    label: "PROJECT",
    title: "Automotive Door Status & Interior Light ECU",
    subtitle: "NXP S32K144 · CAN · PWM",
    description:
      "Developed a two-ECU embedded prototype: one S32K144 transmits door state over CAN (0x100), a second decodes it and drives PWM-controlled interior lighting. Validated with TSMaster CAN analyser.",
    tags: ["S32K144", "CAN", "DBC", "PWM", "TSMaster"],
    icon: "ecu",
  },
];

export default experience;
