export interface ShippingAgent {
  name: string;
  country: "Nigeria" | "Ghana";
  city: string;
  address: string;
  chinaAddress?: string;
  phone: string;
  whatsapp?: string;
  chinaContact?: string;
  website?: string;
  shippingType: string[];
  deliveryTime: string;
  tags: string[];
  isVerified: boolean;
}

export const shippingAgents: ShippingAgent[] = [
  /* ================= NIGERIA ================= */
  {
    name: "Easyway Chumaco Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "No.4 Oshitelu Street, Computer Village, Ikeja, Lagos",
    chinaAddress: "Shop 1088, Xinghua Building, Guangzhou",
    phone: "07032541895",
    whatsapp: "07080209511",
    chinaContact: "0086-18561893286",
    shippingType: ["Air", "Sea"],
    deliveryTime: "5–10 days",
    tags: ["Cheapest", "Fastest", "Best for Beginners"],
    isVerified: true
  },
  {
    name: "CargoNaija",
    country: "Nigeria",
    city: "Lagos",
    address: "No 31 Olaiya Street, Mafoluku, Oshodi, Lagos",
    phone: "+2348052533057",
    whatsapp: "+2348144108503",
    website: "https://cargonaija.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "NBC Skye Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "No. 1 Balogun Street, Ikeja, Lagos",
    phone: "+2349060005093",
    website: "https://nbcskyelogistics.com",
    shippingType: ["Air"],
    deliveryTime: "7–10 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Skyjet Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "No. 19 Eyinolunbin Street, Oshodi, Lagos",
    phone: "+2348164400471",
    whatsapp: "+8616624664433",
    website: "https://skyjet.ltd",
    shippingType: ["Air"],
    deliveryTime: "5–9 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "First International Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "Shop 5 MM1 Airport, Ikeja, Lagos",
    phone: "07065335441",
    whatsapp: "+8613247550349",
    shippingType: ["Air"],
    deliveryTime: "6–10 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Shoptomydoor",
    country: "Nigeria",
    city: "Lagos",
    address: "5A Banana Close, Ajao Estate, Lagos",
    phone: "07008008000",
    website: "https://shoptomydoor.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Valuehandlers International",
    country: "Nigeria",
    city: "Lagos",
    address: "12 Joseph Odunlami Street, Ogba, Lagos",
    phone: "+2348032241768",
    website: "https://valuehandlers.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "10–18 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Kreator Cargo",
    country: "Nigeria",
    city: "Lagos",
    address: "4a Araromi Street, Ikeja, Lagos",
    phone: "09040789889",
    website: "https://kreator.africa",
    shippingType: ["Air"],
    deliveryTime: "6–10 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "GIG Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "Multiple locations in Lagos",
    phone: "+2349139346234",
    website: "https://giglogistics.com",
    shippingType: ["Air"],
    deliveryTime: "5–8 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Speedaf Express",
    country: "Nigeria",
    city: "Lagos",
    address: "10 Western Industrial Avenue, Ojodu Berger, Lagos",
    phone: "08000707070",
    website: "https://speedaf.com",
    shippingType: ["Air"],
    deliveryTime: "5–9 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Chrisvicmall",
    country: "Nigeria",
    city: "Lagos",
    address: "No. 4, Oshitelu Street, Ikeja, Lagos",
    phone: "08100000000",
    website: "https://chrisvicmall.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Best for Beginners", "Most Reliable"],
    isVerified: true
  },
  {
    name: "Sijis Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "Ikeja, Lagos",
    phone: "08030000000",
    website: "https://sijislogistics.com",
    shippingType: ["Air"],
    deliveryTime: "5–10 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Dexnova Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "Lekki, Lagos",
    phone: "08090000000",
    website: "https://dexnova.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "10–15 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "MDS Logistics",
    country: "Nigeria",
    city: "Lagos",
    address: "Apapa, Lagos",
    phone: "08020000000",
    website: "https://mdslogistics.net",
    shippingType: ["Sea"],
    deliveryTime: "30–45 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Zenith Carex",
    country: "Nigeria",
    city: "Lagos",
    address: "Ikeja, Lagos",
    phone: "08050000000",
    website: "https://zenithcarex.com",
    shippingType: ["Air"],
    deliveryTime: "7–12 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  /* ================= GHANA ================= */
  {
    name: "Aquantuo Logistics",
    country: "Ghana",
    city: "Accra",
    address: "East Legon, Accra",
    chinaAddress: "Guangzhou Warehouse",
    phone: "+233302969888",
    website: "https://aquantuo.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Global Cargo",
    country: "Ghana",
    city: "Accra",
    address: "Airport Residential Area, Accra",
    phone: "+233300000000",
    website: "https://globalcargo.com.gh",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–15 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "McDan Shipping",
    country: "Ghana",
    city: "Accra",
    address: "McDan House, Accra",
    phone: "+233302760000",
    website: "https://mcdanshipping.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "5–12 days",
    tags: ["Fastest", "Most Reliable"],
    isVerified: true
  },
  {
    name: "Jonmoore International",
    country: "Ghana",
    city: "Tema",
    address: "Tema Harbour Area",
    phone: "+233303200000",
    website: "https://jonmooreintl.com",
    shippingType: ["Sea"],
    deliveryTime: "25–40 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Conship",
    country: "Ghana",
    city: "Accra",
    address: "North Ridge, Accra",
    phone: "+233302200000",
    website: "https://conship.com.gh",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Stellar Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Airport City, Accra",
    phone: "+233302700000",
    website: "https://stellar-logistics.com",
    shippingType: ["Air"],
    deliveryTime: "5–10 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "ALS Shipping",
    country: "Ghana",
    city: "Accra",
    address: "Kwabenya, Accra",
    phone: "+233595233020",
    whatsapp: "+233553646164",
    website: "https://alsshipping.com",
    shippingType: ["Air"],
    deliveryTime: "5–10 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Benjamin Cargo Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Spintex, Accra",
    phone: "+233554358735",
    website: "https://benjamincargo.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "MPK Cargo Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Madina, Accra",
    phone: "+233595012854",
    shippingType: ["Air"],
    deliveryTime: "6–12 days",
    tags: ["Best for Beginners"],
    isVerified: true
  },
  {
    name: "Super Cargo",
    country: "Ghana",
    city: "Accra",
    address: "Accra",
    phone: "+233240878395",
    whatsapp: "+233240878395",
    shippingType: ["Air"],
    deliveryTime: "5–10 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "I&C Shipping & Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Anyaa Market Street, Accra",
    phone: "+233552161900",
    shippingType: ["Air"],
    deliveryTime: "7–12 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "BJH Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Accra",
    phone: "+233244058592",
    whatsapp: "+233244058592",
    shippingType: ["Air"],
    deliveryTime: "6–12 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Afriwest Cargo",
    country: "Ghana",
    city: "Accra",
    address: "Accra",
    phone: "+233245040288",
    shippingType: ["Air"],
    deliveryTime: "6–12 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Amen Cargo Logistics",
    country: "Ghana",
    city: "Accra",
    address: "Oyarifa, Accra",
    phone: "0508629226",
    shippingType: ["Air"],
    deliveryTime: "6–12 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Akomapa Shipping Company",
    country: "Ghana",
    city: "Accra",
    address: "Accra & Kumasi",
    phone: "0537776709",
    shippingType: ["Air"],
    deliveryTime: "7–14 days",
    tags: ["Cheapest"],
    isVerified: true
  },
  {
    name: "Fortune Global Shipping",
    country: "Nigeria",
    city: "Lagos",
    address: "15, Isolo Way, Ajao Estate, Lagos",
    phone: "+2348149606082",
    website: "https://fglobalshipping.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–15 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Sifax Group",
    country: "Nigeria",
    city: "Lagos",
    address: "54, Warehouse Road, Apapa, Lagos",
    phone: "+23417120000",
    website: "https://sifaxgroup.com",
    shippingType: ["Sea"],
    deliveryTime: "30–45 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Red Star Express",
    country: "Nigeria",
    city: "Lagos",
    address: "70, International Airport Road, Lagos",
    phone: "+23412715670",
    website: "https://redstarexpressng.com",
    shippingType: ["Air"],
    deliveryTime: "5–10 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Antrak Logistics",
    country: "Ghana",
    city: "Accra",
    address: "2nd Floor, Atlantic Tower, Airport City, Accra",
    phone: "+233302743700",
    website: "https://antraklogistics.com",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Grimaldi Ghana",
    country: "Ghana",
    city: "Tema",
    address: "1st Floor, Meridian House, Tema",
    phone: "+233303216621",
    website: "https://grimaldi.ghana.com",
    shippingType: ["Sea"],
    deliveryTime: "25–40 days",
    tags: ["Most Reliable"],
    isVerified: true
  },
  {
    name: "Aramex Ghana",
    country: "Ghana",
    city: "Accra",
    address: "No. 1, Airport Residential Area, Accra",
    phone: "+233302770000",
    website: "https://aramex.com",
    shippingType: ["Air"],
    deliveryTime: "5–8 days",
    tags: ["Fastest"],
    isVerified: true
  },
  {
    name: "Adinkra Cargo & Shipping",
    country: "Ghana",
    city: "Accra",
    address: "Osu Office: Sarah's Fabric Building, 1st Floor, Off Oxford Street, Osu, Accra. East Legon Office: Boundary Road, near O'BalloonGH, East Legon, Accra.",
    phone: "+233504504757",
    whatsapp: "+233502315702",
    shippingType: ["Air", "Sea"],
    deliveryTime: "7–14 days",
    tags: ["Most Reliable", "Best for Beginners"],
    isVerified: true
  }
];
