// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
// All project content is sourced from here. Edit descriptions, links, and
// technologies to keep the site accurate. Do NOT add fabricated details.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "automotive-ecu",
    index: "01",
    title: "Automotive Door Status\n& Interior Light ECU",
    shortTitle: "Interior Light ECU",
    year: "2026",
    category: "Automotive Embedded",
    role: "Embedded Developer",
    status: "Prototype",
    accent: "#D9622B",
    github: "https://github.com/sivaarunmanigk/Car_Cabin_Interior_light_simulation_using_CAN_with_S32K144",

    technologies: [
      "NXP S32K144",
      "Embedded C",
      "CAN",
      "DBC",
      "PWM",
      "TSMaster",
      "NXP S32DS",
    ],

    tagline: "Two ECUs. One CAN bus. Real automotive logic.",

    description:
      "A two-ECU embedded system where one ECU monitors vehicle door status via GPIO inputs and transmits CAN frames. A second ECU receives the CAN messages and controls interior lighting via PWM — mimicking real automotive body control module (BCM) behaviour.",

    problem:
      "Demonstrate end-to-end automotive ECU communication: from a physical sensor input through a defined CAN message, decoded by a second MCU, driving a real PWM output.",

    architecture:
      "ECU_FRONT (S32K144): GPIO door sensor → CAN TX (ID 0x100, DLC 1, DATA = door bitmask)\nECU_REAR (S32K144): CAN RX → decode → PWM output to interior LED",

    implementation: [
      "Configured GPIO inputs for 4 door switches on ECU_FRONT",
      "Defined CAN message (0x100) using DBC file with 4 signal bits: FL, FR, RL, RR",
      "Implemented CAN TX using FlexCAN peripheral on S32K144",
      "Configured CAN RX on ECU_REAR with acceptance filter for 0x100",
      "Decoded incoming data byte to extract individual door states",
      "Drove interior light PWM output using FTM (FlexTimer) peripheral",
      "PWM duty cycle: 0% (all doors closed) → 80% (any door open)",
      "Validated end-to-end message flow using TSMaster CAN analyser",
    ],

    testing: "TSMaster — CAN trace capture, message injection, timing validation",

    result:
      "Functional two-ECU CAN prototype. Door state changes visible in TSMaster trace. PWM-controlled light responds correctly to all four door combinations.",

    canDetails: {
      msgId: "0x100",
      dlc: 1,
      signals: ["FL", "FR", "RL", "RR"],
      baudRate: "500 kbps",
    },

    heroVisual: "ecu-can",
    gradient: "from-orange-950 to-zinc-950",
  },

  {
    id: "rescue-link",
    index: "02",
    title: "RESCUE LINK",
    shortTitle: "Rescue Link",
    year: "2025",
    category: "Embedded IoT",
    role: "Embedded Developer",
    status: "Prototype",
    accent: "#2B7AD9",

    technologies: [
      "ESP32",
      "LoRa (SX1276)",
      "GPS (NEO-6M)",
      "BLE",
      "Mesh Networking",
      "Arduino Framework",
    ],

    tagline: "Off-grid emergency mesh communication.",

    description:
      "A 3-node LoRa mesh network designed for emergency communication in areas with no cellular infrastructure. Each node relays messages; a BLE bridge allows smartphones to connect to the nearest node and send messages across the mesh.",

    problem:
      "Standard communication infrastructure (GSM/WiFi) fails during natural disasters. Rescue teams need a lightweight, deployable mesh that works in remote or infrastructure-damaged areas.",

    architecture:
      "3× ESP32 + LoRa (SX1276) nodes in mesh topology\nBLE GATT server on each node for smartphone pairing\nGPS (NEO-6M) for location tagging of messages\nMesh relay: each node rebroadcasts received packets if TTL > 0",

    implementation: [
      "Configured LoRa SX1276 via SPI on each ESP32 node",
      "Implemented custom packet structure: [MSG_TYPE | NODE_ID | TTL | GPS_LAT | GPS_LON | PAYLOAD]",
      "Mesh relay logic: if TTL > 0, decrement and rebroadcast after RSSI-based delay",
      "BLE GATT service: UUID-based characteristic for message write/notify",
      "NEO-6M GPS parsed using TinyGPS++ library",
      "Power management: LoRa sleep between TX windows for battery life",
    ],

    testing:
      "Field-tested across open terrain. Measured end-to-end latency and packet loss across 3 nodes.",

    result:
      "Operational mesh across 3.5 km range. 800 ms average message latency. < 5% packet loss across 3 hops. 12+ hour battery operation per node.",

    metrics: {
      range: "3.5 km",
      latency: "~800 ms",
      packetLoss: "< 5%",
      runtime: "12+ hours",
      nodes: 3,
    },

    heroVisual: "radio-mesh",
    gradient: "from-blue-950 to-zinc-950",
  },

  {
    id: "rescue-zero",
    index: "03",
    title: "RESCUE-ZERO",
    shortTitle: "Rescue Zero",
    year: "2025",
    category: "Embedded IoT",
    role: "Embedded Developer",
    status: "Prototype",
    accent: "#D92B2B",
    github: "https://github.com/sivaarunmanigk/Rescue_Zero_V1",

    technologies: [
      "ESP32",
      "LoRa (SX1276)",
      "GPS (NEO-6M)",
      "Li-ion Battery",
      "SOS Logic",
      "Arduino Framework",
    ],

    tagline: "Single-button SOS beacon for disaster zones.",

    description:
      "A ruggedized personal emergency beacon. One button press transmits GPS coordinates via LoRa to a base station or rescue-link mesh node. Designed for flood, earthquake and disaster scenarios where the user cannot operate complex devices.",

    problem:
      "Disaster victims often cannot operate smartphones or communicate their location. A single-button device transmitting GPS position to a base station reduces response time.",

    architecture:
      "ESP32 + LoRa SX1276 + GPS NEO-6M\nSingle SOS button → GPS fix → LoRa TX packet\nLi-ion battery + low-power sleep between transmissions\nCompatible with Rescue Link mesh as a receiving node",

    implementation: [
      "Interrupt-driven SOS button with debounce",
      "GPS cold/warm start handling with timeout fallback",
      "LoRa packet: [SOS | DEVICE_ID | GPS_LAT | GPS_LON | BATTERY_LEVEL]",
      "Periodic re-transmission every 30 seconds while SOS active",
      "LED status indicators: GPS fix, TX active, battery low",
      "Deep sleep between transmissions to conserve power",
    ],

    testing: "Field range test across open terrain with base station receiver.",

    result:
      "2.1 km LoRa range achieved in open field. SOS packet received reliably at base station. GPS fix acquired in under 60 seconds (clear sky).",

    metrics: {
      range: "2.1 km",
      gpsFixTime: "< 60 s (clear sky)",
      txInterval: "30 s",
    },

    heroVisual: "emergency-beacon",
    gradient: "from-red-950 to-zinc-950",
  },

  {
    id: "halo",
    index: "04",
    title: "H.A.L.O.",
    shortTitle: "H.A.L.O.",
    year: "2025",
    category: "Wearable / Health IoT",
    role: "Embedded Developer",
    status: "Hackathon Prototype",
    accent: "#2BD9A0",
    award: "1ST PLACE — HACKINFINITY 25",

    technologies: [
      "ESP32",
      "MAX30102 (SpO₂ / Heart Rate)",
      "MLX90614 (IR Temperature)",
      "DHT22 (Humidity)",
      "BLE",
      "Arduino Framework",
    ],

    tagline: "Wearable vitals monitor. 1st Place — HackInfinity 2025.",

    description:
      "A wearable health monitoring prototype built in 24 hours at HackInfinity 2025. Reads heart rate, SpO₂, body temperature, and ambient humidity in real-time. Transmits data over BLE to a companion application.",

    problem:
      "Continuous, affordable vital sign monitoring in resource-limited environments. Combine multiple sensors with BLE reporting in a compact wearable form factor.",

    architecture:
      "ESP32 central MCU\nMAX30102: I²C — SpO₂ and heart rate via PPG signal\nMLX90614: I²C — contactless body temperature\nDHT22: single-wire — ambient temperature + humidity\nBLE GATT: custom service with notify characteristics per sensor",

    implementation: [
      "MAX30102 configured for heart rate + SpO₂ mode via I²C",
      "PPG signal processed with moving average filter for stable BPM readings",
      "MLX90614 read via I²C — object temperature mapped to body temperature",
      "DHT22 polled at 2 Hz",
      "BLE GATT server: 4 characteristics (HR, SpO₂, Temp, Humidity) with notifications",
      "Power LED indicators: sensor acquisition active",
      "All sensors initialized with startup diagnostics over Serial",
    ],

    testing:
      "Validated sensor readings against reference measurements during hackathon demo.",

    result:
      "First place at HackInfinity 2025. Functional prototype demonstrating real-time BLE streaming of heart rate, SpO₂, temperature and humidity from a single ESP32 board.",

    heroVisual: "wearable",
    gradient: "from-emerald-950 to-zinc-950",
  },

  {
    id: "smart-agriculture",
    index: "05",
    title: "Smart Agriculture\nMonitoring System",
    shortTitle: "Smart Agriculture",
    year: "2024",
    category: "IoT / PCB Design",
    role: "Embedded Developer",
    status: "Prototype",
    accent: "#6DB52B",

    technologies: [
      "ESP32",
      "Soil Moisture Sensor",
      "DHT22",
      "LDR",
      "Blynk IoT",
      "PCB Design",
      "KiCad",
    ],

    tagline: "Field-ready agricultural IoT node with custom PCB.",

    description:
      "An IoT-connected agricultural monitoring node that reads soil moisture, ambient temperature, humidity and light level. Data is visualised on the Blynk dashboard. Designed with a custom PCB for field deployment.",

    problem:
      "Manual monitoring of soil and environmental conditions is labour-intensive and reactive. An automated sensor node with remote monitoring reduces crop loss.",

    architecture:
      "ESP32 WiFi MCU\nSoil moisture sensor (capacitive) → ADC\nDHT22 → temperature + humidity\nLDR → ambient light ADC\nBlynk IoT cloud → mobile dashboard\nCustom PCB designed in KiCad",

    implementation: [
      "ADC channels configured for soil moisture and LDR readings",
      "DHT22 single-wire protocol implemented",
      "Data packaged and pushed to Blynk cloud at 5 s intervals",
      "Blynk dashboard: live gauges for all 4 parameters",
      "PCB designed in KiCad: ESP32 module, sensor connectors, 3.3V LDO regulator",
      "PCB fabricated and populated for field testing",
    ],

    testing: "Deployed in controlled garden environment. Dashboard readings validated.",

    result:
      "Functional IoT monitoring node with custom PCB. Real-time remote monitoring via Blynk dashboard.",

    heroVisual: "agriculture",
    gradient: "from-green-950 to-zinc-950",
  },
];

export default projects;
