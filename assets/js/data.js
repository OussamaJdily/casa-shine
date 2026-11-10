/* =========================================================
   CASA SHINE — all site content lives here.
   Edit text, prices, phone etc. in this one file.
   ========================================================= */
window.SITE = {
  name: "Casa Shine",
  whatsapp: "212600000000",            // ← your WhatsApp number, digits only
  phone: "+212 600 000 000",           // ← shown on the site
  email: "salam@casashine.ma",
  address: "Rue Ibnou Mounir, Maârif, Casablanca 20330",
  hours: "Mon – Sun · 8:00 – 21:00",
  socials: { Instagram: "#", TikTok: "#", Facebook: "#", "Google Maps": "https://maps.google.com/?q=Maarif+Casablanca" },

  services: [
    { slug: "express", title: "Express exterior", short: "A fast, careful hand wash for daily drivers. In and out in 25 minutes.",
      price: 60, time: "25 min", img: "photo-1605515298946-d062f2e9da53",
      list: ["Snow foam pre-wash", "Two-bucket hand wash", "Wheels & tyres", "Microfibre dry"],
      body: ["Casablanca traffic, sea air and dust from the road leave a film on your paint every single day. Express is the quick reset: a full hand wash that never touches your car with a brush.",
             "We start with snow foam to lift the dirt, then wash panel by panel with two buckets so grit never goes back onto the paint. Wheels get their own mitt and cleaner, and we finish with a soft microfibre dry so there are no water spots."] },
    { slug: "complete", title: "Complete in & out", short: "Our best-seller: exterior hand wash plus a full interior clean.",
      price: 150, time: "60 min", img: "photo-1607860108855-64acf2078ed9",
      list: ["Everything in Express", "Vacuum seats, mats & boot", "Dashboard & door panels", "Windows inside & out"],
      body: ["The one most of our regulars book every two weeks. Outside, you get the full Express treatment. Inside, we vacuum every corner, wipe down every surface and clean the glass until it disappears.",
             "Perfect before a family weekend in Bouskoura, after a beach day at Ain Diab, or simply because you spend two hours a day in your car."] },
    { slug: "interior", title: "Interior deep clean", short: "Steam and extraction for seats, carpets and the smells you've stopped noticing.",
      price: 350, time: "2–3 h", img: "photo-1619405399517-d7fce0f13302",
      list: ["Seat shampoo & extraction", "Leather clean & feed", "Steam sanitising", "Odour treatment"],
      body: ["Kids, pets, coffee and summer heat: interiors take a beating. We shampoo and extract fabric seats and carpets, clean and nourish leather, and steam every vent, cup holder and seam.",
             "We finish with an odour treatment that removes smells at the source instead of covering them with perfume."] },
    { slug: "polish", title: "Paint correction", short: "Machine polishing that removes swirls and light scratches and brings back depth.",
      price: 1200, time: "1 day", img: "photo-1552519507-da3b142c6e3d",
      list: ["Full decontamination", "Paint depth check", "1–2 step machine polish", "Gloss sealant"],
      body: ["Automatic car washes and dry towels leave fine swirls that dull your paint, especially on dark colours. Paint correction removes a microscopic layer of clear coat to level those marks out.",
             "We measure the paint first so we never take off more than needed, then polish in one or two steps depending on the condition."] },
    { slug: "ceramic", title: "Ceramic coating", short: "A hard, glossy shield that keeps the shine and repels water for up to 2 years.",
      price: 1800, time: "1–2 days", img: "photo-1503376780353-7e6692767b70",
      list: ["Paint correction included", "Ceramic coating (2 yrs)", "Glass & wheel coating", "Free check after 1 month"],
      body: ["Ceramic coating bonds to your paint and forms a hard, slick layer. Dirt has nothing to grab on to, water beads off, and washing becomes twice as fast.",
             "In Morocco's sun and salty coastal air, it's the best protection you can give a new or freshly corrected car."] },
    { slug: "doorstep", title: "At your door", short: "Any service above, at your home or office. We bring our own water and power.",
      price: 40, time: "+ travel", plus: true, img: "photo-1494976388531-d1058494cdd8",
      list: ["All of Casablanca", "Waterless option", "Underground parkings OK", "Monthly fleet plans"],
      body: ["Our vans carry their own water tank and power, so we can work in a villa driveway, an office basement or a residence parking lot without bothering anyone.",
             "Add +40 MAD to any service and we come to you, anywhere inside Casablanca. Companies can book monthly plans for their whole fleet."] }
  ],

  vehicles: ["Citadine", "Berline", "SUV", "Luxury"],
  plans: [
    { name: "Express", desc: "Exterior only, quick and careful.", prices: [60, 70, 90, 120],
      list: ["Snow foam & hand wash", "Wheels & tyres", "Microfibre dry", "Tyre shine"] },
    { name: "Complete", desc: "The full refresh, inside and out.", hot: true, prices: [150, 180, 220, 280],
      list: ["Everything in Express", "Interior vacuum", "Dashboard & panels", "Windows in & out", "Air freshener"] },
    { name: "Ceramic", desc: "Long-term protection and deep gloss.", prices: [1800, 2200, 2600, 3200],
      list: ["Full decontamination", "1-step polish", "Ceramic coating (2 yrs)", "Interior detail", "Free check after 1 month"] }
  ],
  addons: [["Engine bay clean", 80], ["Headlight restoration", 200], ["Pet hair removal", 100], ["Leather treatment", 150], ["Rain repellent on glass", 70], ["Doorstep service", 40]],

  works: [
    { t: "Audi Avant", s: "Ceramic coating", y: "2026", z: "Anfa", img: "photo-1606664515524-ed2f786a0bd6" },
    { t: "McLaren 720S", s: "Wash & polish", y: "2026", z: "Gauthier", img: "photo-1542362567-b07e54358753" },
    { t: "Porsche Panamera", s: "Paint correction", y: "2026", z: "Ain Diab", img: "photo-1503376780353-7e6692767b70" },
    { t: "Family SUV after summer", s: "Interior deep clean", y: "2025", z: "Bouskoura", img: "photo-1533473359331-0135ef1b58bf" },
    { t: "Mustang GT", s: "Complete in & out", y: "2025", z: "Maârif", img: "photo-1494976388531-d1058494cdd8" }
  ],

  /* Sample reviews — replace with your real Google reviews before launch */
  reviews: [
    ["Yasmine E.", "Anfa", "They came to my office parking and my car looked new when I left work. Incroyable."],
    ["Mehdi R.", "Maârif", "Best wash in Casa, no contest. They even cleaned the sand out of the trunk."],
    ["Salma T.", "Bourgogne", "Super professional, on time, and the before/after photos are a nice touch."],
    ["Karim L.", "Ain Diab", "Did the ceramic on my Golf. Six months later water still beads off like day one."],
    ["Nadia B.", "Californie", "Kids + dog = disaster interior. They fixed it in two hours. Merci!"],
    ["Omar H.", "Sidi Maarouf", "Booked on WhatsApp at 9, washed at 11. Fair price, zero stress."],
    ["Leila M.", "Racine", "Finally a car wash that doesn't scratch my black paint. Very careful team."],
    ["Hamza Z.", "CIL", "Monthly plan for our 6 company cars. Reliable every single time."]
  ],

  /* Sample team — replace with your real team */
  team: [
    { n: "Anas", r: "Founder & head detailer", y: "9 yrs" },
    { n: "Sara", r: "Customer care & booking", y: "4 yrs" },
    { n: "Youssef", r: "Paint correction specialist", y: "6 yrs" },
    { n: "Imane", r: "Interior specialist", y: "5 yrs" },
    { n: "Reda", r: "Mobile van lead", y: "3 yrs" },
    { n: "Hicham", r: "Ceramic coating", y: "7 yrs" }
  ],

  timeline: [
    ["2019", "One bucket, one van", "Started washing cars in Maârif parkings, one customer at a time."],
    ["2021", "The studio opens", "Our first covered studio with lights for proper paint inspection."],
    ["2023", "Ceramic & correction", "Certified in machine polishing and ceramic coatings."],
    ["2025", "Three vans on the road", "Doorstep service across every neighbourhood of Casablanca."],
    ["2026", "12,000+ cars later", "Still washing every car by hand, the same careful way."]
  ],

  faq: [
    ["How long does a wash take?", "Express takes about 25 minutes, Complete about an hour. Interior deep cleans take 2–3 hours, and ceramic coating needs 1–2 days so the coating can cure."],
    ["Do you come to my home or office?", "Yes. Our vans carry their own water and power, so we can wash anywhere in Casablanca — driveways, residence parkings and office basements. Doorstep service is +40 MAD."],
    ["How do I pay?", "After the wash, by cash, card or bank transfer. No payment is needed to book."],
    ["Will you scratch my paint?", "No brushes ever touch your car. We use the two-bucket method, pH-neutral shampoo and clean microfibre for every car, and we're fully insured."],
    ["Can I book for the same day?", "Most days, yes. Send us a WhatsApp message and we'll usually confirm within 10 minutes."],
    ["Do you have plans for companies?", "Yes — monthly fleet plans with a fixed price per car and a dedicated contact. Message us for a quote."]
  ],

  zones: ["Maârif", "Anfa", "Ain Diab", "Gauthier", "Racine", "Bourgogne", "Californie", "Sidi Maarouf", "CIL", "Oasis", "Casa Finance City", "Bouskoura", "Dar Bouazza", "Ain Sebaâ", "Hay Hassani"],
  brands: ["Dacia", "Renault", "Mercedes-Benz", "Peugeot", "BMW", "Range Rover", "Toyota", "Audi", "Hyundai", "Porsche"],

  posts: [
    { slug: "sea-salt-and-paint", cat: "Paint care", title: "Sea salt & your paint: why Ain Diab cars need a wash every 10 days", author: "Sara B.", date: "Oct 28, 2026", read: "4 min", img: "photo-1552519507-da3b142c6e3d",
      body: ["If you live or park near the Corniche, your car is sitting in a light mist of salt water most of the day. You can't see it, but you can feel it: run a finger over the bonnet and it's slightly gritty.",
             "Salt is hygroscopic, which means it pulls moisture from the air and holds it against your paint and metal. Over weeks, that speeds up oxidation on paint, chrome trim and anything underneath the car.",
             "## What we recommend",
             "A gentle hand wash every 10 days, with extra attention to wheel arches and sills where salt collects. A rinse alone isn't enough — salt crystals need a proper shampoo to lift off.",
             "If your car lives by the sea, a ceramic coating is worth it: it gives salt nothing to bond to, and every wash takes half the time."] },
    { slug: "chergui-season", cat: "Seasonal", title: "Chergui season: protecting your car from sand and dust", author: "Youssef A.", date: "Oct 12, 2026", read: "3 min", img: "photo-1494976388531-d1058494cdd8",
      body: ["When the Chergui blows, a fine layer of sand settles on everything. The mistake most people make is wiping it off with a dry cloth — that's like using sandpaper on your clear coat.",
             "## Do this instead",
             "Rinse first, always. Let water or snow foam carry the sand away before anything touches the paint. Then wash with plenty of lubrication.",
             "Change your cabin air filter after a strong dust week, and clean the windscreen inside: dust on the inside of the glass causes more glare at sunset than you'd think."] },
    { slug: "is-ceramic-worth-it", cat: "Protection", title: "Is ceramic coating worth it in Morocco? An honest answer", author: "Imane K.", date: "Sep 30, 2026", read: "5 min", img: "photo-1583121274602-3e2820c69888",
      body: ["Short answer: for most cars that are less than 5 years old, yes. For a 15-year-old daily driver with faded paint, probably not — spend that money on paint correction first.",
             "Ceramic coating doesn't make your car scratch-proof. What it does is make the surface very hard and very slick, so dirt washes off easily and UV and salt can't attack the paint directly.",
             "## When it pays off",
             "If you wash your car at least twice a month, a coating saves time on every wash and keeps the gloss for years. Combined with Morocco's strong sun, that protection matters more here than in most of Europe.",
             "## When to skip it",
             "If the paint already has heavy scratches or peeling clear coat, a coating will lock those defects in. Fix the paint first."] },
    { slug: "two-bucket-method", cat: "How we work", title: "The two-bucket method, and why we never use brushes", author: "Anas M.", date: "Sep 14, 2026", read: "3 min", img: "photo-1607860108855-64acf2078ed9",
      body: ["Every swirl mark you see on a black car in the sun was put there by something touching the paint with dirt on it. Brushes at automatic washes are the biggest culprit.",
             "The two-bucket method is simple: one bucket with shampoo, one with clean rinse water and a grit guard. After every panel, the mitt goes into the rinse bucket first so the dirt stays there.",
             "It's slower. It's also the reason our customers' cars still look new after years of washing."] }
  ]
};
