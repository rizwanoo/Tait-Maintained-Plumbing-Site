import { BusinessConfig, EducationArticle, GalleryItem, ServiceItem } from '../types';

export const BRAND_ASSETS = {
  logo: 'https://scontent.fisb26-1.fna.fbcdn.net/v/t39.30808-6/641546487_122097635397285304_232459503837221132_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1170x1170&ctp=s1170x1170&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9r1pMtI2xooQ7kNvwHJKtTM&_nc_oc=Adq6OHpHIcAlDzkRpxMRmt3-1fNPHvUKN8oWeC9cuMKfunrij_alfAQF7motrNYsbHk&_nc_zt=23&_nc_ht=scontent.fisb26-1.fna&_nc_gid=uPpwhaIQI8QaLUKurIBecg&_nc_ss=7b2a8&oh=00_AQMgqMLB5STow6oOeGUwKDrI6F2Yu6_pqRCtMqLznOIzKw&oe=6AC15F8C',
  image1: 'https://scontent.fisb26-1.fna.fbcdn.net/v/t39.30808-6/790341052_122125299639285304_1601257980937474692_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-zlxxnI-Y60Q7kNvwHsBZ7l&_nc_oc=AdoD66ldeCGOQojNlLysE6T3qPt3gw0HDKl4_MrQg3Ie5_Jn07LXKVqmqhh0zNrCpm8&_nc_zt=23&_nc_ht=scontent.fisb26-1.fna&_nc_gid=dFWP6wd5YUg_BcPD-shgQQ&_nc_ss=7b2a8&oh=00_AQMy4K131C0SKmNalVZe8XjkTtpxPjfkYeI55kurLUjpfw&oe=6AC18B9E',
  image2: 'https://scontent.fisb26-1.fna.fbcdn.net/v/t39.30808-6/786769091_122124801915285304_2662198390267335936_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1170x1145&ctp=s1170x1145&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=7dLnftLnITMQ7kNvwF6IARn&_nc_oc=AdqADB1qBHWqgAEHPm7jMvu02F-ECg6lyevowZCeu1EHWBXmHaIk-np-4xICvijCrNc&_nc_zt=23&_nc_ht=scontent.fisb26-1.fna&_nc_gid=esNyVKXgWKgUWcPNldZqHQ&_nc_ss=7b2a8&oh=00_AQMi-ey08X5bYnJ0Ok97yZVXoQfgsbfvK9L4ibGS4iYvpA&oe=6AC19632',
  image3: 'https://scontent.fisb26-1.fna.fbcdn.net/v/t39.30808-6/786769094_122124701493285304_4535405779803257461_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8LI6ILMp3ngQ7kNvwF7yxb8&_nc_oc=AdoL7rkE4QOhJ8Zdt3VA1ukTwZ9CBgork-j4EPFDfyr5v1Rtx9-_D18KxSxKkoN2z4o&_nc_zt=23&_nc_ht=scontent.fisb26-1.fna&_nc_gid=j-6JD4jenYZHxaAOjd4p1Q&_nc_ss=7b2a8&oh=00_AQNEto7Cz2L0XiHzMFyqFtYa9HRb8ODr2MRdKoK_HjYUBQ&oe=6AC18013',
  heroVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4',
};

export const INITIAL_CONFIG: BusinessConfig = {
  businessName: 'Tait Maintained',
  tagline: 'PLUMBING • HEATING • PEACE OF MIND',
  phone: '+1 403-613-0819',
  phoneDisplay: '+1 (403) 613-0819',
  whatsappNumber: '+14036130819',
  whatsappLink: 'https://wa.me/14036130819?text=Hello%20Tait%20Maintained%2C%20I%20would%20like%20to%20inquire%20about%20plumbing%2Fheating%20services.',
  email: 'taitmaintained@gmail.com',
  instagramUrl: 'https://www.instagram.com/taitmaintained',
  facebookFollowers: '2.4K followers • 18 following',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61588559135113',
  serviceArea: 'Calgary & Surrounding Residential Areas',
  hours: 'Monday – Saturday: 8:00 AM – 6:00 PM',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'plumbing',
    title: 'Plumbing Repairs & Troubleshooting',
    category: 'plumbing',
    badge: 'Core Specialty',
    shortDesc: 'Reliable diagnostics and repairs for pipe leaks, fixture issues, drainage, and residential plumbing systems.',
    longDesc: 'From persistent leaks and low water pressure to fixture replacements and pipe troubleshooting, we bring clean workmanship and practical diagnosis to ensure your home plumbing operates without stress.',
    image: BRAND_ASSETS.image3,
    keyPoints: [
      'Comprehensive leak detection & pipe repairs',
      'Valve, trap & line maintenance',
      'Fixture installation and flow troubleshooting',
      'Clean, organized jobsite standards'
    ],
    commonIssues: [
      'Dripping faucets & line seepages',
      'Slow drains & toilet fill problems',
      'Pressure irregularities & pipe rattles',
      'Renovation & replacement hookups'
    ]
  },
  {
    id: 'heating',
    title: 'Heating Services & Maintenance',
    category: 'heating',
    badge: 'Essential Home Comfort',
    shortDesc: 'System checkups, heating troubleshooting, radiator & line servicing to keep your home warm and efficient.',
    longDesc: 'Heating systems need methodical care and precise adjustments. We inspect, troubleshoot, and maintain heating equipment so you experience dependable warmth when the temperature drops.',
    image: BRAND_ASSETS.image2,
    keyPoints: [
      'System diagnostics & heating checks',
      'Hydronic & heating line maintenance',
      'Radiator venting & circulation balance',
      'Preventive heating tune-ups'
    ],
    commonIssues: [
      'Uneven heating across zones',
      'Noisy heating pipes or radiator knocking',
      'Slow heat response in winter',
      'Preventative pre-season inspection'
    ]
  },
  {
    id: 'water_heaters',
    title: 'Water Heater Services & Installation',
    category: 'water_heaters',
    badge: 'High Performance',
    shortDesc: 'Water heater maintenance, anode check, temperature troubleshooting, and clean replacement installations.',
    longDesc: 'Your water heater is the heart of daily household comfort. We handle water heater servicing, valve replacements, expansion tank setups, and new system installations with clean copper/PEX piping.',
    image: BRAND_ASSETS.image1,
    keyPoints: [
      'T&P valve & safety equipment inspections',
      'Expansion tank & supply line integration',
      'Sediment flushing & heating element checks',
      'Clean, code-compliant plumbing layout'
    ],
    commonIssues: [
      'Inconsistent or lukewarm water',
      'Water heater tank leaking or corrosion',
      'Rumbling noises inside the tank',
      'Upgrading to high-efficiency equipment'
    ]
  },
  {
    id: 'general_maintenance',
    title: 'General Property Plumbing & Upgrades',
    category: 'maintenance',
    badge: 'Peace of Mind',
    shortDesc: 'Proactive residential plumbing maintenance, small projects, and preventative inspections for your home.',
    longDesc: 'Catching small plumbing or heating quirks before they turn into emergency water damage is the easiest way to protect your home. We provide thorough property plumbing reviews and honest advice.',
    image: BRAND_ASSETS.image3,
    keyPoints: [
      'Full residential plumbing checkups',
      'Shutoff valve testing & labelling',
      'Outdoor spigot & winter prep',
      'Knowledge-first customer walkthrough'
    ],
    commonIssues: [
      'Aging valves that will not turn off',
      'Unidentified moisture spots',
      'Preparing homes for freezing weather',
      'Moving into a new home or rental review'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Precision Water Heater Installation',
    category: 'Water Heaters',
    image: BRAND_ASSETS.image1,
    description: 'Clean hot & cold supply tie-ins, relief line setup, and secure mechanical connections for dependable domestic hot water.',
    locationTag: 'Mechanical Room • Clean Pipework',
    featured: true
  },
  {
    id: 'gal-2',
    title: 'Heating System & Pipework Routing',
    category: 'Heating',
    image: BRAND_ASSETS.image2,
    description: 'Neat distribution headers, precise valve placement, and hydronic circulation plumbing engineered for optimal heating flow.',
    locationTag: 'Heating Plant • Precision Fit',
    featured: true
  },
  {
    id: 'gal-3',
    title: 'Jobsite Diagnostics & Mechanical Maintenance',
    category: 'Plumbing',
    image: BRAND_ASSETS.image3,
    description: 'Hands-on troubleshooting, valve servicing, and methodical plumbing maintenance to prevent breakdowns.',
    locationTag: 'Jobsite Moment • Active Service',
    featured: true
  }
];

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'toilet-running',
    title: 'Toilet Keeps Running? 3 Things to Check First',
    tag: 'Plumbing Tip',
    teaser: 'A running toilet wastes gallons of water every day. Here is the straightforward checklist from the jobsite.',
    readTime: '2 min read',
    content: {
      overview: 'When a toilet won’t stop filling or constantly hisses, the cause is usually inside the tank and simple to isolate.',
      steps: [
        {
          title: '1. Check the Flapper Seal',
          desc: 'Over time, rubber flappers harden or develop mineral buildup. Inspect if water is slipping past the rubber seal into the bowl.'
        },
        {
          title: '2. Inspect the Fill Valve Float Level',
          desc: 'If the water level is set too high, water continuously trickles into the overflow tube. Adjust the float screw or clip downward.'
        },
        {
          title: '3. Verify Chain Tension',
          desc: 'A chain that is too short prevents the flapper from closing fully; a chain that is too long gets trapped underneath.'
        }
      ],
      proTip: 'Drop a few drops of food coloring in the tank. If color enters the bowl without flushing within 15 minutes, your flapper needs replacement!'
    }
  },
  {
    id: 'know-your-tools',
    title: 'Know Your Tools: Using the Right Wrench',
    tag: 'Tools & Education',
    teaser: 'Why using the correct wrench prevents rounded fittings, stripped chrome, and costly fixture damage.',
    readTime: '3 min read',
    content: {
      overview: 'Plumbing fittings require the exact tool profile. Using teeth-jawed pipe wrenches on smooth decorative brass or chrome will permanently gouge the surface.',
      steps: [
        {
          title: '1. Smooth-Jaw Adjustable Pliers for Chrome',
          desc: 'Always use parallel smooth-jaw pliers or wrap jaws with tape when tightening decorative fixture nuts.'
        },
        {
          title: '2. Pipe Wrenches for Steel & Iron Threading',
          desc: 'Pipe wrenches are designed to bite and grip round steel pipes. Use two wrenches in opposition to prevent torquing adjoining lines.'
        },
        {
          title: '3. Basin Wrench for Tight Faucets',
          desc: 'A swiveling basin wrench reaches behind deep undermount sinks where ordinary wrenches cannot swing.'
        }
      ],
      proTip: 'Never overtighten brass fittings! Hand-tight plus a quarter to half turn with a smooth wrench is often the golden rule.'
    }
  },
  {
    id: 'water-heater-care',
    title: 'Water Heater Care: Protecting Your Hot Water',
    tag: 'Equipment Guide',
    teaser: 'Understand the equipment keeping your home warm and how basic maintenance extends tank longevity.',
    readTime: '3 min read',
    content: {
      overview: 'Water heaters silently operate 24/7. Minerals and sediment settle at the bottom of the tank, reducing heat transfer and causing premature tank fatigue.',
      steps: [
        {
          title: '1. Annual Sediment Flush',
          desc: 'Draining a few gallons from the bottom drain valve helps clear calcium sediment before it bakes into a hard crust.'
        },
        {
          title: '2. Check the Temperature & Pressure (T&P) Valve',
          desc: 'The T&P valve is your crucial safety mechanism against over-pressurization. Inspect for leaks or corrosion.'
        },
        {
          title: '3. Keep the Area Clear',
          desc: 'Maintain at least 2 feet of clear space around the heater for adequate combustion air and emergency shutoff access.'
        }
      ],
      proTip: 'Keep your temperature set to around 120°F (49°C)—it balances energy efficiency, scalding prevention, and warm showers.'
    }
  },
  {
    id: 'freeze-prevention',
    title: 'Cold Weather Plumbing: Preventing Frozen Lines',
    tag: 'Seasonal Advice',
    teaser: 'How to protect vulnerable outdoor spigots and uninsulated pipes when freezing temperatures arrive.',
    readTime: '2 min read',
    content: {
      overview: 'Water expands when it freezes, exerting thousands of pounds of pressure on copper and PEX lines.',
      steps: [
        {
          title: '1. Disconnect Garden Hoses',
          desc: 'Leaving a hose attached traps water inside the wall spigot, which freezes and splits the valve body.'
        },
        {
          title: '2. Shut Off & Drain Interior Isolation Valves',
          desc: 'Locate the indoor shutoff for outdoor faucets, turn it off, and open the bleeder cap to drain lingering moisture.'
        },
        {
          title: '3. Keep Consistent Indoor Heating',
          desc: 'During extreme cold snaps, keep cabinet doors open under sinks on exterior walls to let warm ambient air circulate.'
        }
      ],
      proTip: 'Know where your main household water shutoff valve is located before cold weather hits!'
    }
  }
];

export const BRAND_PILLARS = [
  {
    number: '01',
    title: 'Knowledge First',
    quote: '“Learning everyday, spreading knowledge along the way 🫡”',
    description: 'We believe customers make the best decisions when they understand what is going on with their plumbing and heating. No confusing jargon—just honest, knowledgeable guidance.'
  },
  {
    number: '02',
    title: 'Craftsmanship & Care',
    quote: '“Little bit of everything plumbing & more 🤷🏽‍♂️”',
    description: 'Whether it is a precision water heater installation, hydronic heating maintenance, or diagnosing a stubborn leak, we take pride in clean pipework and thoughtful execution.'
  },
  {
    number: '03',
    title: 'Peace of Mind',
    quote: '“Plumbing • Heating • Peace of Mind”',
    description: 'Your home is your sanctuary. We treat your property with respect, work cleanly, communicate clearly, and ensure your mechanical systems are dependable.'
  }
];
