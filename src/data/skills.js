// ─────────────────────────────────────────────────────────────────────────────
// SKILLS DATA
// tier: "primary" = automotive embedded (featured prominently)
//       "secondary" = hardware / broader embedded
//       "tools" = software tools and IDEs
// ─────────────────────────────────────────────────────────────────────────────

export const skills = {
  // Primary automotive embedded tier — featured in Skills DNA section
  automotive: [
    { label: "Embedded C", tier: "primary" },
    { label: "NXP S32K144", tier: "primary" },
    { label: "CAN", tier: "primary" },
    { label: "DBC", tier: "primary" },
    { label: "UDS (Fundamentals)", tier: "primary" },
    { label: "AUTOSAR (Fundamentals)", tier: "primary" },
    { label: "GPIO", tier: "primary" },
    { label: "Interrupts", tier: "primary" },
    { label: "Timers / FTM", tier: "primary" },
    { label: "PWM", tier: "primary" },
    { label: "ADC", tier: "primary" },
    { label: "UART", tier: "primary" },
    { label: "SPI", tier: "primary" },
    { label: "I²C", tier: "primary" },
    { label: "NVM / EEPROM", tier: "primary" },
    { label: "MATLAB", tier: "primary" },
    { label: "Simulink", tier: "primary" },
    { label: "Model-Based Development", tier: "primary" },
  ],

  // Secondary hardware / broader embedded tier
  hardware: [
    { label: "ESP32", tier: "secondary" },
    { label: "LoRa (SX1276)", tier: "secondary" },
    { label: "BLE", tier: "secondary" },
    { label: "GPS (NEO-6M)", tier: "secondary" },
    { label: "PCB Design", tier: "secondary" },
    { label: "KiCad", tier: "secondary" },
    { label: "LTspice", tier: "secondary" },
    { label: "Proteus", tier: "secondary" },

    { label: "Altium (Basics)", tier: "secondary" },
  ],

  // Tools tier
  tools: [
    { label: "NXP S32DS", tier: "tools" },
    { label: "TSMaster", tier: "tools" },
    { label: "Git", tier: "tools" },
    { label: "VS Code", tier: "tools" },
    { label: "Arduino IDE", tier: "tools" },
    { label: "Embedded Coder", tier: "tools" },
  ],
};

// Flat list for marquee scrolling
export const skillsFlat = [
  "EMBEDDED C",
  "S32K144",
  "CAN",
  "UDS",
  "AUTOSAR",
  "DBC",
  "PWM",
  "ADC",
  "UART",
  "SPI",
  "I²C",
  "NVM",
  "SIMULINK",
  "MATLAB",
  "MBD",
  "ESP32",
  "LoRa",
  "BLE",
  "GPS",
  "PCB",

  "KiCad",
  "TSMaster",
  "S32DS",
  "GPIO",
  "FTM",
  "EEPROM",
  "FlexCAN",
  "Embedded Coder",
];

export default skills;
