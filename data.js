// ===== GAMEMODES (20 tiers) =====
const GAMEMODES = [
  { id: "beast", name: "Beast", icon: "🦁", short: "Beast" },
  { id: "dpot", name: "Dpot", icon: "💎", short: "Dpot" },
  { id: "npot", name: "Npot", icon: "🧪", short: "Npot" },
  { id: "dsmp", name: "Dsmp", icon: "🛡️", short: "Dsmp" },
  { id: "nsmp", name: "Nsmp", icon: "🖤", short: "Nsmp" },
  { id: "uhc", name: "UHC", icon: "❤️", short: "UHC" },
  { id: "axe", name: "Axe", icon: "🪓", short: "Axe" },
  { id: "crystal", name: "Crystal", icon: "🔮", short: "Cry" },
  { id: "cart", name: "Cart", icon: "🛒", short: "Cart" },
  { id: "mace", name: "Mace", icon: "🔨", short: "Mace" },
  { id: "op", name: "OP", icon: "⚡", short: "OP" },
  { id: "creeper", name: "Creeper", icon: "💥", short: "Crpr" },
  { id: "spearmace", name: "Spear Mace", icon: "🗡️", short: "SMace" },
  { id: "spearelytra", name: "Spear Elytra", icon: "🪽", short: "SEly" },
  { id: "rodmace", name: "Rod Mace", icon: "🎣", short: "RMace" },
  { id: "trident", name: "Trident", icon: "🔱", short: "Tri" },
  { id: "shieldsuhc", name: "Shields UHC", icon: "🛡️", short: "ShUHC" },
  { id: "elytramace", name: "Elytra Mace", icon: "🪽", short: "EMace" },
  { id: "lifesteal", name: "Lifesteal", icon: "💉", short: "LS" },
  { id: "spearsmp", name: "Spear SMP", icon: "⚔️", short: "SSMP" }
];

const TIER_POINTS = {
  HT1: 60, LT1: 45,
  HT2: 30, LT2: 20,
  HT3: 10, LT3: 6,
  HT4: 4,  LT4: 3,
  HT5: 2,  LT5: 1
};

const TIER_ORDER = ["HT1","LT1","HT2","LT2","HT3","LT3","HT4","LT4","HT5","LT5"];

// ===== PLAYERS =====
const PLAYERS = [
  {
    name: "Cr1m3",
    region: "UA",
    tiers: {
      beast: "HT1", dpot: "HT1", npot: "HT1", dsmp: "HT1", nsmp: "LT1",
      uhc: "HT1", axe: "HT1", crystal: "LT1", cart: "HT1", mace: "LT1",
      op: "LT1", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
  {
    name: "Comonyat",
    region: "UA",
    tiers: {
      beast: "HT1", dpot: "LT1", npot: "HT2", dsmp: "LT1", nsmp: "LT1",
      uhc: "LT1", axe: "HT1", crystal: "HT1", cart: "LT1", mace: "HT1",
      op: "HT2", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
  {
    name: "SuperiorRasul",
    region: "KZ",
    tiers: {
      beast: "HT1", dpot: "LT1", npot: "HT1", dsmp: "LT1", nsmp: "HT1",
      uhc: "LT1", axe: "LT1", crystal: "HT3", cart: "HT2", mace: "LT1",
      op: "HT1", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
  {
    name: "CAHTA___KLAYS",
    region: "RU",
    tiers: {
      beast: "HT3", dpot: "LT3", npot: "HT3", dsmp: "LT1", nsmp: "LT2",
      uhc: "HT1", axe: "LT1", crystal: "LT2", cart: "HT3", mace: "LT2",
      op: "HT3", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
  {
    name: "MN576",
    region: "RU",
    tiers: {
      beast: "LT3", dpot: "LT3", npot: "LT3", dsmp: "LT3", nsmp: "LT3",
      uhc: "HT3", axe: "LT3", crystal: "HT4", cart: "HT4", mace: "HT3",
      op: "LT3", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
  {
    name: "nxdt",
    region: "UA",
    tiers: {
      beast: "HT3", dpot: "none", npot: "LT3", dsmp: "none", nsmp: "none",
      uhc: "none", axe: "none", crystal: "HT4", cart: "none", mace: "none",
      op: "LT3", creeper: "LT2", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
  },
    {
    name: "0993472",
    region: "UA",
    tiers: {
      beast: "LT3", dpot: "HT4", npot: "HT4", dsmp: "HT4", nsmp: "HT4",
      uhc: "LT4", axe: "LT4", crystal: "LT4", cart: "none", mace: "LT3",
      op: "HT4", creeper: "none", spearmace: "none", spearelytra: "none",
      rodmace: "none", trident: "none", shieldsuhc: "none", elytramace: "none",
      lifesteal: "none", spearsmp: "none"
    }
}
];

