/**
 * GAME & GAMES AMUSEMENT - CENTRAL DATA STORE
 * Static data model preserving all concepts from Reference Images 1-5.
 * Structured for future Python Flask / REST API consumption.
 */

const GG_DATA = {
  company: {
    name: "Game & Games Amusement",
    tagline: "Earn More, Repair Less, Grow Faster, Stay Stress Free.",
    heroHeadline: "The Game & Games Story Beyond",
    heroSubheadline: "Discover the World of Arcade & Amusement Business.",
    heroDescription: "Pioneering India's next-generation amusement machines with Smart Displays & Multi-Game QR technology. Turnkey hardware, premium plush prizes, authentic spare parts, and proven business models.",
    phone: "+91 8855922736",
    email: "sales@gameandgamesamusement.com",
    hours: "10:00 AM – 6:00 PM, Monday to Saturday",
    experienceYears: "20+",
    address: "Amusement Innovation Hub, Phase 2 Industrial Area, Pune / Mumbai, Maharashtra, India (Placeholder pending company confirmation)",
    socials: {
      whatsapp: "https://wa.me/918855922736",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com"
    }
  },

  // 1. ARCADE GAMES CATALOG (Reference 1 & 2)
  games: [
    {
      id: "pick-a-prize",
      name: "Pick A Prize",
      subtitle: "Next-Gen Optical Claw Machine",
      type: "Claw Machine",
      category: "claw",
      badge: "Flagship Bestseller",
      featured: true,
      image: "assets/images/games/pick-a-prize.jpg",
      sizes: ["Small", "Medium", "Big"],
      dimensions: {
        Small: "750mm x 750mm x 1850mm",
        Medium: "850mm x 900mm x 1950mm",
        Big: "1100mm x 1050mm x 2100mm"
      },
      provisionalPrice: 185000,
      description: "Pioneering claw machine engineered with India's first Smart Display & multi-game QR technology. Features multi-level adjustable claw grip voltage, optical anti-cheat sensors, and programmable payout logic.",
      howItWorks: "Players insert coin or scan the on-cabinet QR code to initiate game credit. Using the heavy-duty microswitch joystick, players guide the high-torque gantry crane directly above their desired plush prize. Pressing the drop button triggers the optical claw to descend, grip, and transport prizes to the win hopper.",
      features: [
        "First in India with Smart Display & QR payment integration",
        "3-Stage adjustable claw tension (Grab, Carry, Drop)",
        "Anti-shake and anti-tilt infrared safety lock",
        "Vibrant RGB perimeter neon chasing effects",
        "High-capacity illuminated prize vitrine",
        "Dual mechanical coin validator + UPI QR acceptance",
        "Integrated electronic audit meter"
      ],
      suitableVenues: ["Shopping Malls", "Family Entertainment Centers", "Hotel Lobbies", "Multiplexes", "Cafes"],
      qrTech: true
    },
    {
      id: "press-a-prize",
      name: "Press A Prize",
      subtitle: "High-Precision Linear Clip Machine",
      type: "Clip Machine",
      category: "clip",
      badge: "High Margin",
      featured: true,
      image: "assets/images/games/press-a-prize.jpg",
      sizes: ["Small", "Medium", "Big"],
      dimensions: {
        Small: "700mm x 720mm x 1800mm",
        Medium: "820mm x 850mm x 1920mm",
        Big: "1000mm x 950mm x 2050mm"
      },
      provisionalPrice: 195000,
      description: "Sleek skill-testing amusement machine that uses a precision motorized clip probe. High visual transparency and dramatic near-miss gameplay create exceptional player engagement.",
      howItWorks: "Players steer a precision-guided clip arm horizontally and vertically. Holding down the activate button advances the clip forward into target prize loops. Releasing at the exact millisecond snags the prize cord and unlocks the reward.",
      features: [
        "Optical calibration accurate to 0.1mm alignment",
        "Tempered 8mm shatter-proof safety glass",
        "High-output ambient LED spotlights on prize displays",
        "Audible game voice guidance and winning fanfare",
        "Fully configurable difficulty payout matrix",
        "Reinforced cash collection vault with dual tubular keys"
      ],
      suitableVenues: ["Resorts & Hotels", "Bowling Alleys", "Game Lounges", "Highway Rest Stops"],
      qrTech: true
    },
    {
      id: "ten-on-ten",
      name: "10 on 10",
      subtitle: "Digital Precision Millisecond Timer Game",
      type: "Timer Machine",
      category: "timer",
      badge: "Instant Crowd Magnet",
      featured: true,
      image: "assets/images/games/ten-on-ten.jpg",
      sizes: ["Medium", "Big"],
      dimensions: {
        Medium: "800mm x 750mm x 2000mm",
        Big: "1050mm x 900mm x 2150mm"
      },
      provisionalPrice: 165000,
      description: "The ultimate pure-skill reflex challenge. Featuring an ultra-bright four-digit digital display stopwatch where players attempt to stop the clock at exactly 10.00 seconds.",
      howItWorks: "The player presses the start button; the massive digital LED clock races up from 00.00. The player must slam the precision arcade button to halt the clock on 10.00. Achieving 10.00 unlocks the premier prize locker automatically.",
      features: [
        "Zero-latency industrial microprocessor",
        "Ultra-bright 8-inch digital LED segmented display",
        "Vandal-resistant arcade slam button rated for 10M actuations",
        "Multi-tier prize lockers with automatic solenoid release",
        "Dynamic soundboard with countdown heartbeat effects",
        "Compact footprint ideal for tight venue corners"
      ],
      suitableVenues: ["Sweet Shops", "Fast Food Chains", "Ice Cream Parlours", "College Cafeterias"],
      qrTech: true
    },
    {
      id: "cut-a-prize",
      name: "Cut A Prize",
      subtitle: "High-Stakes Scissor String Cutter",
      type: "Cut Machine",
      category: "cutter",
      badge: "Mega Prize Showcase",
      featured: true,
      image: "assets/images/games/cut-a-prize.jpg",
      sizes: ["Small", "Medium", "Big"],
      dimensions: {
        Small: "750mm x 800mm x 1880mm",
        Medium: "900mm x 900mm x 2000mm",
        Big: "1150mm x 1050mm x 2180mm"
      },
      provisionalPrice: 210000,
      description: "The premier high-value prize cutter. Holds large prizes like game consoles, giant plush toys, smart devices, and luxury gift hampers suspended by cords waiting to be snipped.",
      howItWorks: "Using directional joystick controls, players maneuver an automated scissor head into position. Pressing and holding the forward button moves the blades directly over the suspended cord. A clean cut drops the prize directly into the collection area.",
      features: [
        "Hardened stainless steel precision blade assembly",
        "High-visibility 360-degree acrylic display showcase",
        "Heavy-gauge steel frame with anti-theft locking bars",
        "Smart Display QR analytics & refill tracking compatibility",
        "Smart optical cut sensor with auto-retract safety",
        "Attraction audio loop with cheering sound effects"
      ],
      suitableVenues: ["Major Shopping Malls", "Transit Hubs", "Theme Parks", "Mega Entertainment Zones"],
      qrTech: true
    },
    {
      id: "perfect-tower",
      name: "Perfect Tower (Perfect Prize)",
      subtitle: "Vertical Stacker & Guiding Game",
      type: "Guiding Machine",
      category: "tower",
      badge: "Evergreen Classic",
      featured: true,
      image: "assets/images/games/perfect-tower.jpg",
      sizes: ["Medium", "Big"],
      dimensions: {
        Medium: "780mm x 820mm x 2050mm",
        Big: "950mm x 900mm x 2200mm"
      },
      provisionalPrice: 175000,
      description: "A fast-paced, addictive stacker game. Players stack horizontally moving light blocks up a vertical grid. Reaching minor or major prize levels triggers immediate prize dispensary.",
      howItWorks: "As rows of bright LED blocks slide across the screen at escalating speeds, the player hits the stop button to align blocks with the row beneath. Stack 11 rows to win minor prizes or all 15 rows for top-tier rewards.",
      features: [
        "Vibrant multi-color high-density LED matrix panel",
        "Modular prize compartments with independent motorized coils",
        "Adjustable skill curve and operator payback settings",
        "Low power standby mode and energy-efficient electronics",
        "Complete reporting interface via SCANO telemetry"
      ],
      suitableVenues: ["Gaming Arcades", "Resort Lounges", "Sports Bars", "Airport Transit Zones"],
      qrTech: true
    }
  ],

  // 2. TOYS & PRIZES CATALOG (Reference 2)
  // Sizes: Below 12cm, Below 20cm, Below 30cm
  // Categories: Indian, Imported, Handmade, Gifts, Ideas
  toys: [
    {
      id: "toy-velvet-bear",
      name: "Royal Velvet Teddy Bear",
      category: "indian",
      sizeCategory: "below-20cm",
      actualHeight: "18 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm", "Below 30cm"],
      pricePerLot: 3200,
      unitsPerLot: 25,
      unitPrice: 128,
      image: "assets/images/toys/teddy-bear.jpg",
      description: "Ultra-soft velvet plush with double-stitched seams designed specifically for optimal claw crane grip tension and customer delight.",
      features: ["Hypoallergenic plush material", "Weighted bottom for balanced display stand", "Embroidered safety eyes", "Washable fabric"]
    },
    {
      id: "toy-bunny-plush",
      name: "Fluffy Long-Ear Bunny",
      category: "imported",
      sizeCategory: "below-30cm",
      actualHeight: "26 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm", "Below 30cm"],
      pricePerLot: 4500,
      unitsPerLot: 20,
      unitPrice: 225,
      image: "assets/images/toys/bunny-plush.jpg",
      description: "Silky soft imported bunny plush with flexible ears and pastel hues. Proven high attraction rate among kids and teenagers.",
      features: ["High-loft microfibre filling", "Vibrant pastel aesthetic", "Child-safe certified", "Claw-friendly shape"]
    },
    {
      id: "toy-electric-spark",
      name: "Spark Anime Character Plush",
      category: "imported",
      sizeCategory: "below-20cm",
      actualHeight: "19 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm"],
      pricePerLot: 3800,
      unitsPerLot: 20,
      unitPrice: 190,
      image: "assets/images/toys/character-plush.jpg",
      description: "Electrifying yellow character mascot loved across gaming generations. Instant crowd puller in claw and clip machines.",
      features: ["Officially styled novelty design", "Bright non-fading dyes", "Durable polyester shell", "High grab grip index"]
    },
    {
      id: "toy-bamboo-panda",
      name: "Bamboo Munching Panda",
      category: "indian",
      sizeCategory: "below-12cm",
      actualHeight: "11 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm"],
      pricePerLot: 2400,
      unitsPerLot: 30,
      unitPrice: 80,
      image: "assets/images/toys/panda-plush.jpg",
      description: "Compact, high-density mini panda plush. Ideal for small claw machines, keychains, and high-frequency win configurations.",
      features: ["Includes elastic keychain loop", "High recovery memory cotton", "Reinforced joints", "Economic refill price"]
    },
    {
      id: "toy-artisan-puppy",
      name: "Artisan Handcrafted Puppy",
      category: "handmade",
      sizeCategory: "below-20cm",
      actualHeight: "17 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm", "Below 30cm"],
      pricePerLot: 4200,
      unitsPerLot: 20,
      unitPrice: 210,
      image: "assets/images/toys/handmade-plush.jpg",
      description: "Crafted by skilled artisan groups with premium knit and woven textures. High perceived value for boutique cafes and hotel arcades.",
      features: ["Artisanal hand-stitched detailing", "Unique collectible texture", "Zero small loose parts", "Eco-friendly stuffing"]
    },
    {
      id: "toy-gift-pack",
      name: "Celebration Surprise Gift Box",
      category: "gifts",
      sizeCategory: "below-30cm",
      actualHeight: "28 cm",
      sizesAvailable: ["Below 20cm", "Below 30cm"],
      pricePerLot: 5800,
      unitsPerLot: 15,
      unitPrice: 386,
      image: "assets/images/toys/gift-assortment.jpg",
      description: "Premium gift box containing themed plush toys, stickers, and novelty vouchers. Tailored for Cut A Prize and high-stakes games.",
      features: ["High-impact metallic ribbon presentation", "Shock-resistant display box", "Includes voucher sleeve", "Premium showcase prize"]
    },
    {
      id: "toy-glow-alien",
      name: "Glow-In-The-Dark Space Cadet",
      category: "ideas",
      sizeCategory: "below-12cm",
      actualHeight: "12 cm",
      sizesAvailable: ["Below 12cm", "Below 20cm"],
      pricePerLot: 3100,
      unitsPerLot: 25,
      unitPrice: 124,
      image: "assets/images/toys/character-plush.jpg",
      description: "Innovative glow fabric that illuminates inside UV-lit arcade cabinets. Creates irresistible nocturnal gameplay interest.",
      features: ["Photoluminescent non-toxic fabric", "Novelty big-eye design", "Tactile squishy inner fill", "Exclusive G&G concept"]
    },
    {
      id: "toy-giant-brownie",
      name: "Giant Cuddle Bear",
      category: "indian",
      sizeCategory: "below-30cm",
      actualHeight: "30 cm",
      sizesAvailable: ["Below 30cm"],
      pricePerLot: 5400,
      unitsPerLot: 12,
      unitPrice: 450,
      image: "assets/images/toys/teddy-bear.jpg",
      description: "Large 30cm display bear used as the top-shelf showstopper prize in large claw and scissor cutter machines.",
      features: ["Maximum visual attraction factor", "Silky textured fur", "Durable reinforced seams", "Plush O Soft verified"]
    }
  ],

  // 3. SPARE PARTS & COMPONENTS (Reference 2)
  // Categories: Complete Sets, Electronics & PCBs, Mechanisms, Cabs & Hardware, Toolkits
  spareParts: [
    {
      id: "part-complete-wiring-set",
      name: "Master Machine Wiring Harness Kit",
      category: "complete-sets",
      partNumber: "GG-SET-001",
      price: 6500,
      image: "assets/images/spare-parts/power-supply.jpg",
      description: "Full wire loom harness tailored for Pick A Prize, Press A Prize, and 10 on 10. Flame-retardant connectors, numbered labels for error-free installation.",
      features: ["Plug-and-play color coded wiring", "Flame retardant nylon braided jacket", "Gold-plated terminal pins", "Fits all G&G machines"]
    },
    {
      id: "part-coin-mech",
      name: "Smart Multi-Coin Acceptor Mechanism",
      category: "electronics",
      partNumber: "GG-COIN-PRO",
      price: 2800,
      image: "assets/images/spare-parts/coin-mechanism.jpg",
      description: "Intelligent multi-coin comparator capable of learning and validating ₹5, ₹10, and custom amusement tokens with anti-fishing optical gates.",
      features: ["Dual optical anti-stringing mechanism", "Instant token self-learning mode", "Fast 400 coin/min acceptance speed", "12V DC low power draw"]
    },
    {
      id: "part-pcb-mainboard",
      name: "Smart Display Core Logic PCB Board",
      category: "electronics",
      partNumber: "GG-PCB-V4",
      price: 9500,
      image: "assets/images/spare-parts/pcb-board.jpg",
      description: "Central processing board with integrated QR telemetry port, DIP switch configuration matrix, and high-frequency sound synthesiser.",
      features: ["SCANO Play Smart telematics header", "Optoisolated I/O channels", "Digital test button for claw strength", "Onboard LED diagnostic status"]
    },
    {
      id: "part-power-supply",
      name: "Industrial Regulated Power Supply 12V / 5V / 24V",
      category: "electronics",
      partNumber: "GG-PSU-350W",
      price: 3400,
      image: "assets/images/spare-parts/power-supply.jpg",
      description: "Tri-voltage industrial switching power unit with surge protection, short-circuit recovery, and silent cooling fan.",
      features: ["Triple output: +5V (15A), +12V (12A), +24V (5A)", "Over-voltage & heat dissipation safeguards", "Solid aluminium chassis", "110V/220V switchable"]
    },
    {
      id: "part-crane-motor",
      name: "Heavy-Duty Stepper Gantry Motor Assembly",
      category: "mechanisms",
      partNumber: "GG-MOT-X48",
      price: 5200,
      image: "assets/images/spare-parts/crane-motor.jpg",
      description: "High-torque industrial stepper motor with metal gearbox and precision pulley for smooth X/Y gantry travel and long lifespan.",
      features: ["Zero-backlash precision gears", "Continuous duty rating 24/7", "Integrated limit switch buffers", "Low thermal footprint"]
    },
    {
      id: "part-joystick-sanwa",
      name: "Commercial Grade 4/8-Way Arcade Joystick",
      category: "hardware",
      partNumber: "GG-JOY-8W",
      price: 1850,
      image: "assets/images/spare-parts/arcade-joystick.jpg",
      description: "Heavy-duty microswitch joystick with steel shaft, smooth spring return, and dust washer. Rated for millions of intense player sessions.",
      features: ["Switchable 4-way / 8-way restrictor plate", "Smooth tactile microswitch feedback", "Rust-proof chrome shaft", "Includes mounting bracket"]
    },
    {
      id: "part-led-buttons",
      name: "Illuminated Chrome Arcade Push Button Pack (Set of 4)",
      category: "hardware",
      partNumber: "GG-BTN-60C",
      price: 1200,
      image: "assets/images/spare-parts/arcade-buttons.jpg",
      description: "60mm large arcade dome push buttons with integrated 12V LED lighting and snap-in microswitches. Available in Gold, Cyan, Green, and Red.",
      features: ["Crystal-clear translucent lens", "Built-in 12V LED lamp holder", "Tested for 10 million press cycles", "Threaded nut for swift panel mounting"]
    },
    {
      id: "part-high-buzzer",
      name: "Dual-Tone Alarm Buzzer & High-Fidelity Speaker",
      category: "electronics",
      partNumber: "GG-SPK-85DB",
      price: 850,
      image: "assets/images/spare-parts/arcade-buttons.jpg",
      description: "Compact 8 Ohm 15W shielded speaker paired with 85dB winning celebration buzzer for maximum auditory arcade excitement.",
      features: ["Moisture resistant poly-cone", "High-decibel alert tone", "Clean midrange for voice cues", "Vibration-proof casing"]
    },
    {
      id: "part-master-toolkit",
      name: "Complete Arcade Field Technician Tool Kit",
      category: "toolkits",
      partNumber: "GG-TOOL-MASTER",
      price: 8900,
      image: "assets/images/spare-parts/toolkit.jpg",
      description: "Comprehensive 48-piece field diagnostics, soldering, multimeter, claw calibration, and socket set housed in an impact-proof rugged carry case.",
      features: ["Digital multimeter with continuity beeper", "Claw tension digital hanging scale", "Precision ratchet screwdrivers & security Torx bits", "Soldering iron with heat shrink kit", "Anti-static wristband & wire strippers"]
    },
    {
      id: "part-cut-blade-lock",
      name: "Hardened Stainless Cut Blade & Solenoid Lock",
      category: "mechanisms",
      partNumber: "GG-CUT-BLD",
      price: 3600,
      image: "assets/images/spare-parts/toolkit.jpg",
      description: "Precision replacement blade cartridge and magnetic release solenoid engineered specifically for the Cut A Prize game.",
      features: ["Surgical-grade stainless steel blade", "Dual solenoid security lock", "Quick-release mounting pins", "Safety finger shield"]
    }
  ],

  // 4. BRANDS PORTFOLIO (Reference 2)
  brands: [
    {
      id: "g-and-g-amusement",
      name: "G&G Amusement",
      type: "Parent Brand",
      motto: "Give It A Try!",
      logo: "assets/images/logo/logo.svg",
      summary: "The flagship brand powering India's arcade and amusement ecosystem. Over 20+ years of manufacturing, operations, and technical innovation.",
      offerings: ["Turnkey arcade machine manufacturing", "Amusement consulting and floor design", "Franchise and EMI business enablement", "Pan-India logistics and parts supply"]
    },
    {
      id: "scano",
      name: "SCANO",
      type: "Sub-Brand (Technology)",
      motto: "Play Smart",
      logo: "assets/images/brands/brand-scano.svg",
      summary: "Next-generation Smart Display and cashless QR telemetry platform designed to connect machines to cloud telemetry and digital UPI payments.",
      offerings: ["Smart Display modules for arcade cabinets", "UPI QR code payment gateway bridge", "Real-time play counts and revenue reporting", "Remote pricing and claw tension telemetry"]
    },
    {
      id: "plush-o-soft",
      name: "Plush O Soft",
      type: "Sub-Brand (Toys & Prizes)",
      motto: "Worth Showing Off",
      logo: "assets/images/brands/brand-plush-o-soft.svg",
      summary: "Specialized prize design label producing high-appeal, soft, safe, and grip-optimized plush toys in three calibrated size tiers.",
      offerings: ["Claw-optimized prize geometry", "Tested hypoallergenic safety fabrics", "Custom character plush licensing", "Tiered wholesale refill packages"]
    },
    {
      id: "ads-no-skip",
      name: "ADS No Skip",
      type: "Sub-Brand (Advertising)",
      motto: "Where Every View Counts",
      logo: "assets/images/brands/brand-ads-no-skip.svg",
      summary: "Transforming high-traffic arcade machines into powerful interactive physical-digital marketing real estate for major consumer brands.",
      offerings: ["Full 360-degree machine vinyl wraps", "High-definition video display ad rotations", "Sample product distribution inside prize vitrines", "Custom discount coupon dispensing with game plays"]
    },
    {
      id: "learn-and-earn",
      name: "Learn & Earn",
      type: "Sub-Brand (Education & Academy)",
      motto: "New to the Industry? Learn from Scratch",
      logo: "assets/images/brands/brand-learn-and-earn.svg",
      summary: "Demystifying the amusement business for ambitious entrepreneurs. Comprehensive guides, financial breakdowns, and maintenance masterclasses.",
      offerings: ["The Handbook of Wisdom (₹999)", "Step-by-step video maintenance tutorials", "Location scouting and negotiation blueprints", "Operator financial management workshops"]
    }
  ],

  // 5. BUSINESS OPPORTUNITIES (Reference 2)
  businessModels: [
    {
      id: "upfront-purchase",
      title: "Pay Full Amount Upfront",
      subtitle: "100% Machine Ownership • Zero Royalty",
      badge: "Maximum Profit",
      investmentRange: "₹1,65,000 – ₹2,10,000 per machine",
      suitability: "Entrepreneurs and existing venue owners wanting complete autonomy and full profit margins.",
      highlights: [
        "Full machine ownership from day one",
        "Zero revenue share and zero monthly royalty fees",
        "Keep 100% of all cash & UPI digital earnings",
        "Complete technician toolkit included free",
        "Full 1-year hardware warranty on PCB & electronics",
        "Direct access to wholesale toy pricing via Plush O Soft"
      ],
      ctaText: "Enquire About Machine Purchase"
    },
    {
      id: "emi-method",
      title: "EMI & Structured Financing",
      subtitle: "Start With Low Initial Capital",
      badge: "Most Popular for Beginners",
      investmentRange: "Low down payment + flexible 12-24 month installments",
      suitability: "First-time entrepreneurs and ambitious operators who wish to expand using machine cash flow.",
      highlights: [
        "Low initial seed capital requirement",
        "Machine earnings offset the monthly installments",
        "Clear tenure options (6, 12, or 24 months)",
        "Includes full maintenance coverage during EMI tenure",
        "Retain machine ownership upon completion of payments",
        "Free location agreement draft templates included"
      ],
      ctaText: "Check EMI Eligibility"
    },
    {
      id: "revenue-sharing",
      title: "Company-Owned Revenue Sharing",
      subtitle: "Zero Machine Cost for Host Venues",
      badge: "Zero Risk for Venues",
      investmentRange: "Zero capital expenditure for host venue",
      suitability: "Hotels, resorts, cafes, sweet shops, and bowling alleys with available footfall space.",
      highlights: [
        "G&G installs and owns the premium machines",
        "Zero equipment purchase cost for the host venue",
        "Monthly revenue split (e.g. 70/30 or 60/40) paid to venue",
        "G&G handles all refilling, maintenance, and technical repairs",
        "Enhances guest dwell time and family engagement",
        "Automated transparent digital settlement via SCANO"
      ],
      ctaText: "Apply as Venue Host"
    },
    {
      id: "franchise-partnership",
      title: "Regional Franchise & Cluster Operator",
      subtitle: "Multi-Machine Turnkey Territory License",
      badge: "Territory Exclusive",
      investmentRange: "₹5,00,000 – ₹15,00,000 (Cluster of 3 to 10 machines)",
      suitability: "Investors seeking an established turnkey enterprise with exclusive geographic rights.",
      highlights: [
        "Dedicated territory protection and brand licensing",
        "Curated mix of claw, clip, timer, and cutter machines",
        "Complete on-site venue acquisition and installation support",
        "Dedicated account manager and priority spares dispatch",
        "Comprehensive marketing collateral and ad network revenue",
        "Quarterly business review and optimization audits"
      ],
      ctaText: "Request Territory Consultation"
    }
  ],

  // 7. SPOTLIGHT EVENTS & ANNOUNCEMENTS (Reference 2)
  events: [
    {
      id: "event-refurbished-expo",
      title: "Certified Refurbished Arcade Showcase",
      category: "Refurbished Games",
      condition: "Good Condition & Average Condition Available",
      date: "Ongoing Inventory",
      location: "Pune & Mumbai Regional Warehouses",
      image: "assets/images/events/refurbished-machines.jpg",
      description: "Thoroughly tested, recalibrated arcade machines available at substantial discounts. Includes brand-new power supplies and warranty options for budget-conscious operators.",
      highlights: ["Inspected by senior G&G technicians", "Discounted up to 40% off original MRP", "Immediate dispatch within 48 hours"]
    },
    {
      id: "event-expo-meetup",
      title: "Amusement Industry National Expo & Meetup",
      category: "Industry Events",
      date: "Upcoming • Q4",
      location: "Bombay Exhibition Centre, Mumbai",
      image: "assets/images/events/expo-event.jpg",
      description: "Join hundreds of machine operators, resort executives, and entertainment founders. Experience live demonstrations of our Smart Display QR claw technology.",
      highlights: ["Live product launches", "Hands-on calibration workshops", "Networking dinner with top operators"]
    },
    {
      id: "event-career-camp",
      title: "Arcade Technician Apprentice & Career Program",
      category: "Careers & Opportunity",
      date: "Open Applications",
      location: "Nationwide (Pan-India)",
      image: "assets/images/about/workshop-testing.jpg",
      description: "We are expanding our technical team. Opportunities for field technicians, electro-mechanical trainees, and territory business partners.",
      highlights: ["Hands-on hardware training", "Competitive stipend and allowances", "Fast-track promotion path"]
    }
  ],

  // 8. CUSTOMER TESTIMONIALS (Reference 1: Anna, Meera, Peter, Joseph, Levy)
  testimonials: [
    {
      name: "Anna",
      role: "Boutique Cafe Owner",
      location: "Goa",
      quote: "Installing a Pick A Prize claw machine in our cafe's waiting zone transformed a dead 7 sq ft corner into our highest margin square footage. Customers love it, and parents enjoy peaceful coffee while kids play.",
      verified: true
    },
    {
      name: "Meera",
      role: "Resort Entertainment Manager",
      location: "Lonavala",
      quote: "The revenue-sharing model with G&G Amusement was seamless. They set up three machines, managed the refills with adorable plush toys, and our monthly dividend has been clockwork.",
      verified: true
    },
    {
      name: "Peter",
      role: "Independent Arcade Operator",
      location: "Bengaluru",
      quote: "I started with just one machine on EMI while working in IT. Within 14 months, I scaled to six machines in local supermarkets and sweet shops. The technical training gave me 100% confidence.",
      verified: true
    },
    {
      name: "Joseph",
      role: "Family Entertainment Center Partner",
      location: "Kochi",
      quote: "The modularity of these machines is what sold me. When a coin mech or button needs service, it swaps out in under two minutes. Our downtime is essentially zero.",
      verified: true
    },
    {
      name: "Levy",
      role: "Commercial Complex Host",
      location: "Hyderabad",
      quote: "The Smart Display QR tech has made cashless gameplay effortless. Over 65% of our plays are now via UPI QR scans. Transparent, stress-free, and dependable.",
      verified: true
    }
  ]
};

// Freeze data to prevent accidental modification in client scripts
if (typeof Object.freeze === 'function') {
  Object.freeze(GG_DATA);
}
