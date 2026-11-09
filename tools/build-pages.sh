#!/usr/bin/env bash
# Generates every page with the same <head> and scripts.
# Run from the project root:  bash tools/build-pages.sh
set -e
U() { echo "https://images.unsplash.com/$1?auto=format&fit=crop&w=${2:-1600}&q=80"; }
AR='<span class="ar">↗</span>'

head() { # $1 page  $2 title  $3 description  $4 extra-attrs
cat <<EOF
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$2</title>
<meta name="description" content="$3">
<meta property="og:title" content="$2">
<meta property="og:description" content="$3">
<meta name="theme-color" content="#0A0A0A">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M20 2l5.3 7.2 8.9-.9-.9 8.9L40 20l-6.7 2.8.9 8.9-8.9-.9L20 38l-5.3-7.2-8.9.9.9-8.9L0 20l6.7-2.8-.9-8.9 8.9.9z' fill='%23FFD60A'/%3E%3Ccircle cx='20' cy='20' r='6.5' fill='%230A0A0A'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
EOF
cat <<EOF
</head>
<body data-page="$1" $4>
<div class="curtain" id="curtain"></div>
<main>
EOF
}

foot() {
cat <<'EOF'
</main>
<script src="assets/js/data.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="assets/js/site.js"></script>
EOF
echo '</body>'
echo '</html>'
}

phero() { # $1 crumb  $2 h1-html  $3 paragraph  $4 image-id  $5 right-side html
local pimg=""
[ -n "$4" ] && pimg='<div class="phero-img ph" data-clip data-par><img src="'"$(U $4 2000)"'" alt=""></div>'
cat <<EOF
<section class="phero"><div class="wrap">
  <div class="crumbs" data-reveal><a href="index.html">Home</a>/<span>$1</span></div>
  <h1 data-split="intro">$2</h1>
  <div class="phero-row"><p data-reveal>$3</p>$5</div>
  $pimg
</div></section>
EOF
}

PROCESS='<section class="pad" id="process"><div class="wrap proc">
  <div class="proc-sticky">
    <span class="tag" data-reveal>How it works</span>
    <h2 class="h2" data-split>From dusty<br>to dazzling.</h2>
    <div class="proc-num" aria-hidden="true"><div id="pn"><span>01</span><span>02</span><span>03</span><span>04</span></div></div>
    <div class="bar"><i id="pbar"></i></div>
  </div>
  <div>
    <div class="step on"><h3><small>01</small>Book in 30 seconds</h3><p class="muted">Pick a service and a time on WhatsApp or with our form. Studio or doorstep, your choice.</p></div>
    <div class="step"><h3><small>02</small>We arrive, or you drop in</h3><p class="muted">Our vans carry their own water and power, so we can wash in a parking lot, a villa driveway or an office basement.</p></div>
    <div class="step"><h3><small>03</small>Hands-on care</h3><p class="muted">Snow foam, two-bucket hand wash, wheels and arches, then a full interior pass with steam where needed.</p></div>
    <div class="step"><h3><small>04</small>Inspection &amp; photos</h3><p class="muted">We check every panel under light and send you before/after photos. Not happy? We redo it, free.</p></div>
  </div>
</div></section>'

FAQ='<section class="pad pad-t0"><div class="wrap faq">
  <div><span class="tag" data-reveal>FAQ</span><h2 class="h2" data-split>Good<br>questions.</h2><p class="muted" data-reveal style="margin:20px 0 24px;max-width:360px">Something else on your mind? We answer on WhatsApp in about 10 minutes.</p><a href="contact.html" class="btn btn-ink" data-reveal>Contact us '"$AR"'</a></div>
  <div data-render="faq" data-reveal></div>
</div></section>'

REVIEWS='<section class="dark pad" style="overflow:hidden">
  <div class="wrap"><div class="sec-head"><div><span class="tag" data-reveal>Reviews</span><h2 class="h2" data-split>Casa has spoken.</h2></div><div data-reveal><span class="stars">★★★★★</span> <span class="muted">Loved by drivers across the city</span></div></div></div>
  <div data-render="reviews"></div>
</section>'

########## HOME ##########
{ head home "Casa Shine — Car Wash & Detailing in Casablanca" "Premium hand wash, interior cleaning and ceramic detailing in Casablanca. In our Maârif studio or at your door. Book on WhatsApp." "data-nocta"
cat <<EOF
<section class="hero">
  <div class="hero-in">
    <div class="hero-bg ph"><img src="$(U photo-1601362840469-51e4d8d58785 2200)" alt="Car covered in foam during a hand wash"></div>
    <svg class="badge-rot" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="c" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs><text><textPath href="#c">Hand wash · Casablanca · Since 2019 ·</textPath></text><circle cx="60" cy="60" r="16" fill="#FFD60A"/></svg>
    <h1 data-split="intro">Casa<br><em>Shine.</em></h1>
    <div class="hero-row">
      <div class="hero-card" data-intro>
        <div class="ph"><img src="$(U photo-1607860108855-64acf2078ed9 300)" alt=""></div>
        <div><small>Book on WhatsApp — reply in 10 min</small><b data-s="phone"></b></div>
      </div>
      <div class="hero-side" data-intro>
        <p>Hand wash, interior care and ceramic detailing — in our Maârif studio or at your door, anywhere in Casablanca.</p>
        <a href="contact.html#book" class="btn btn-y">Book your wash $AR</a>
      </div>
    </div>
    <div class="scroll-ind" aria-hidden="true"></div>
  </div>
</section>

<section class="pad" id="about"><div class="wrap">
  <span class="tag" data-reveal>About us</span>
  <p class="big-txt" data-words-hl>Born on the boulevards of Casablanca, we treat every car like a piece of zellige: patient hands, the right products, and attention to every last tile, so you leave cleaner than the Corniche at sunrise.</p>
  <a href="about.html" class="btn btn-ink" data-reveal>Our story $AR</a>
  <div class="about-grid">
    <div class="stats" data-stagger>
      <div class="stat"><b><span data-count="12400">0</span><sup>+</sup></b><span class="muted">cars washed since 2019</span></div>
      <div class="stat"><b><span data-count="15">0</span><sup>areas</sup></b><span class="muted">of Casablanca covered by our vans</span></div>
      <div class="stat"><b><span data-count="45">0</span><sup>min</sup></b><span class="muted">for a complete in &amp; out wash</span></div>
    </div>
    <div class="about-img ph" data-par data-clip><img src="$(U photo-1520340356584-f9917d1eea6f)" alt="Car being rinsed with water spray" loading="lazy"></div>
  </div>
</div></section>

<div data-render="brands" aria-label="Brands we care for"></div>

<section class="dark pad" id="services"><div class="wrap">
  <div class="sec-head">
    <div><span class="tag" data-reveal>Services</span><h2 class="h2" data-split>Six ways to fall<br>in love again.</h2></div>
    <div data-reveal style="max-width:340px"><p class="muted" style="margin-bottom:18px">pH-neutral shampoo, the two-bucket method and microfibre only. No brushes, no swirls.</p><a href="services.html" class="btn btn-y">All services $AR</a></div>
  </div>
  <div data-render="services-acc"></div>
</div></section>

$PROCESS

<section class="dark" data-hpin style="padding:clamp(80px,9vw,120px) 0;overflow:hidden">
  <div class="wrap"><div class="sec-head"><div><span class="tag" data-reveal>Recent work</span><h2 class="h2" data-split>Fresh off<br>the bay.</h2></div><p class="muted" data-reveal style="max-width:320px">Slide through a few cars that left our studio this season.</p></div></div>
  <div data-render="works"></div>
</section>

<div data-render="bigmarq" data-words="Hand wash|Interior|Ceramic|Doorstep|Casablanca" style="margin-top:40px"></div>

<section class="pad"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Why Casa Shine</span><h2 class="h2" data-split>Care you can<br>actually see.</h2></div></div>
  <div class="bento" data-rise3d>
    <div class="bx b1" data-tilt>
      <svg class="zell" viewBox="0 0 40 40"><path d="M20 2l5.3 7.2 8.9-.9-.9 8.9L40 20l-6.7 2.8.9 8.9-8.9-.9L20 38l-5.3-7.2-8.9.9.9-8.9L0 20l6.7-2.8-.9-8.9 8.9.9z" fill="#FFD60A"/></svg>
      <div><h3>Water-smart washing</h3><p style="opacity:.8">Our rinseless technique uses under 20 litres per car, about a tenth of a jet wash. Good for your paint, better for Morocco.</p></div>
      <a href="services.html" class="btn btn-y" style="align-self:flex-start;margin-top:22px">See services $AR</a>
    </div>
    <div class="bx b2"><div class="ph"><img src="$(U photo-1619405399517-d7fce0f13302 1400)" alt="Detailer cleaning a car interior" loading="lazy"></div>
      <div class="ov"><h3>A trained team, not a hose</h3><p style="opacity:.85">Every washer completes three weeks of in-house training before touching a customer's car.</p></div></div>
    <div class="bx b3" data-tilt><div><span class="big" data-count="98">0</span><span class="big pct">%</span></div><p><strong>of customers rebook</strong> within 60 days. We'd love you to be next.</p></div>
    <div class="bx b4" data-tilt><h3>Always included</h3><ul class="ticks"><li>Insured work on every vehicle</li><li>Photos before &amp; after</li><li>Eco, pH-neutral products</li><li>Free re-do guarantee</li><li>Pay cash, card or transfer</li><li>Arabic, French &amp; English spoken</li></ul></div>
  </div>
</div></section>

<section class="pad pad-t0" id="pricing"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Pricing</span><h2 class="h2" data-split>Clear prices.<br>No surprises.</h2></div><a href="pricing.html" class="btn btn-ink" data-reveal>Full price list $AR</a></div>
  <div data-render="plans"></div>
</div></section>

$REVIEWS

<section class="pad"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Before &amp; after</span><h2 class="h2" data-split>Drag to see<br>the difference.</h2></div><a href="contact.html#book" class="btn btn-ink" data-reveal>Book now $AR</a></div>
  <div class="ba" data-ba data-reveal data-cursor="Drag">
    <div class="ph after"><img src="$(U photo-1503376780353-7e6692767b70 2000)" alt="Clean shiny sports car" loading="lazy"></div>
    <div class="ph before"><img src="$(U photo-1503376780353-7e6692767b70 2000)" alt="" loading="lazy"><div class="dirt"></div></div>
    <span class="lab" style="left:20px">Before</span><span class="lab" style="right:20px">After</span>
    <div class="handle"></div><div class="knob" aria-hidden="true">⇆</div>
  </div>
</div></section>

<section class="pad pad-t0" id="zones"><div class="wrap">
  <span class="tag" data-reveal>Where we go</span>
  <h2 class="h2" data-split>Everywhere in Casa.</h2>
  <p class="muted" data-reveal style="max-width:520px;margin-top:16px">Studio in Maârif. Our vans cover the whole city seven days a week, 8:00 to 21:00.</p>
  <div data-render="zones" data-reveal></div>
</div></section>

<section class="pad pad-t0"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Journal</span><h2 class="h2" data-split>Tips for the<br>Casa driver.</h2></div><a href="blog.html" class="btn btn-ink" data-reveal>All articles $AR</a></div>
  <div data-render="posts" data-limit="3"></div>
</div></section>

<section class="dark pad" id="book"><div class="wrap book">
  <div><span class="tag" data-reveal>Book</span><h2 data-split style="margin-top:20px">Your car<br>deserves it.</h2>
  <p class="muted" data-reveal style="max-width:420px;margin-top:20px">Send the form and WhatsApp opens with your request ready to send. We confirm in about 10 minutes.</p></div>
  <div data-render="book" data-reveal></div>
</div></section>
EOF
foot home; } > index.html

########## ABOUT ##########
{ head about "About — Casa Shine" "The story of Casa Shine: a Casablanca car wash that still washes every car by hand."
phero "About" "We are<br><em>Casa Shine.</em>" "A small team from Casablanca that got tired of brushes, swirl marks and rushed jobs, and decided to wash cars the slow, careful way." photo-1607860108855-64acf2078ed9 "<a href=\"contact.html#book\" class=\"btn btn-ink\" data-reveal>Book a wash $AR</a>"
cat <<EOF
<section class="pad"><div class="wrap">
  <span class="tag" data-reveal>Our story</span>
  <p class="big-txt" data-words-hl>It started in 2019 with one bucket, one van and a simple promise to our neighbours in Maârif: we will never touch your car with a brush. Seven years later the promise is the same, only the team and the vans got bigger.</p>
  <div class="stats-row" data-stagger style="margin-top:50px">
    <div class="stat"><b><span data-count="12400">0</span><sup>+</sup></b><span class="muted">cars washed</span></div>
    <div class="stat"><b><span data-count="7">0</span><sup>yrs</sup></b><span class="muted">in Casablanca</span></div>
    <div class="stat"><b><span data-count="3">0</span><sup>vans</sup></b><span class="muted">on the road daily</span></div>
    <div class="stat"><b><span data-count="20">0</span><sup>L</sup></b><span class="muted">of water per car, max</span></div>
  </div>
</div></section>

<section class="dark pad"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Timeline</span><h2 class="h2" data-split>Seven years,<br>one method.</h2></div></div>
  <div data-render="timeline"></div>
</div></section>

<section class="pad"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Values</span><h2 class="h2" data-split>What we<br>stand for.</h2></div></div>
  <div class="values" data-rise3d>
    <div class="val" data-tilt><span class="ic">✋</span><div><h3>Hands only</h3><p class="muted">No brushes, no shortcuts. Every car is washed by a person who cares how it looks at the end.</p></div></div>
    <div class="val" data-tilt><span class="ic">💧</span><div><h3>Water-smart</h3><p class="muted">Morocco is short on water. Our methods use a fraction of what a jet wash does.</p></div></div>
    <div class="val" data-tilt><span class="ic">🤝</span><div><h3>Honest prices</h3><p class="muted">The price we quote is the price you pay. If you're not happy, we redo it for free.</p></div></div>
  </div>
</div></section>

<div data-render="bigmarq" data-words="Since 2019|Maârif|By hand|Casablanca"></div>

<section class="pad"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Team</span><h2 class="h2" data-split>The people<br>behind the shine.</h2></div><a href="team.html" class="btn btn-ink" data-reveal>Meet everyone $AR</a></div>
  <div data-render="team" data-limit="3"></div>
</div></section>

$REVIEWS
EOF
foot; } > about.html

########## SERVICES ##########
{ head services "Services — Casa Shine" "Express wash, complete in & out, interior deep clean, paint correction, ceramic coating and doorstep service in Casablanca."
phero "Services" "Every service,<br><em>by hand.</em>" "From a 25-minute express wash to a two-day ceramic coating. Every service is done by hand, in our Maârif studio or at your door." "" "<a href=\"pricing.html\" class=\"btn btn-ink\" data-reveal>See prices $AR</a>"
cat <<EOF
<section class="pad" style="padding-top:60px"><div class="wrap"><div data-render="cards"></div></div></section>
<div data-render="bigmarq" data-words="Express|Complete|Interior|Correction|Ceramic|Doorstep"></div>
$PROCESS
<section class="pad pad-t0"><div class="wrap">
  <div class="band" data-reveal>
    <div><h2 data-split>Running a fleet?</h2><p style="margin-top:14px;max-width:460px">Monthly plans for companies, rental agencies and residences, with one fixed price per car and a dedicated contact.</p></div>
    <div style="justify-self:end"><a href="contact.html" class="btn btn-ink">Ask for a quote $AR</a></div>
  </div>
</div></section>
$FAQ
EOF
foot; } > services.html

########## SERVICE DETAIL ##########
{ head service "Service — Casa Shine" "Service details, price and booking for Casa Shine car care in Casablanca."; foot; } > service.html

########## PRICING ##########
{ head pricing "Pricing — Casa Shine" "Clear car wash and detailing prices in MAD for citadines, berlines, SUVs and luxury cars in Casablanca."
phero "Pricing" "Clear prices.<br><em>No surprises.</em>" "Choose your vehicle and see exactly what you pay. VAT included, payment after the wash." "" ""
cat <<EOF
<section class="pad" style="padding-top:60px"><div class="wrap"><div data-render="plans"></div></div></section>
<section class="pad pad-t0"><div class="wrap">
  <div class="sec-head"><div><span class="tag" data-reveal>Add-ons</span><h2 class="h2" data-split>Make it<br>even better.</h2></div><p class="muted" data-reveal style="max-width:340px">Add any of these to a wash. Prices are the same for every vehicle size.</p></div>
  <div data-render="addons"></div>
</div></section>
<section class="pad pad-t0"><div class="wrap">
  <div class="band" data-reveal>
    <div><h2 data-split>Washing every month?</h2><p style="margin-top:14px;max-width:460px">Ask about our monthly plans for individuals and companies. One fixed price, booked automatically.</p></div>
    <div style="justify-self:end"><a href="contact.html" class="btn btn-ink">Talk to us $AR</a></div>
  </div>
</div></section>
$FAQ
EOF
foot; } > pricing.html

########## TEAM ##########
{ head team "Team — Casa Shine" "Meet the Casa Shine team: detailers, coating specialists and the people who answer your WhatsApp."
phero "Team" "The hands<br><em>behind the shine.</em>" "Trained in-house for three weeks before touching a customer's car, and still learning every day." "" ""
cat <<EOF
<section class="pad" style="padding-top:60px"><div class="wrap"><div data-render="team"></div></div></section>
<div data-render="bigmarq" data-words="Trained|Insured|Careful|Casablanca"></div>
<section class="pad"><div class="wrap">
  <div class="band" data-reveal>
    <div><h2 data-split>Want to join us?</h2><p style="margin-top:14px;max-width:460px">We're always looking for careful, patient people who love cars. No experience needed — we train you.</p></div>
    <div style="justify-self:end"><a data-href="mail" href="#" class="btn btn-ink">Send your CV $AR</a></div>
  </div>
</div></section>
EOF
foot; } > team.html

########## BLOG ##########
{ head blog "Journal — Casa Shine" "Car care tips for Casablanca drivers: sea salt, Chergui dust, ceramic coatings and more."
phero "Journal" "The<br><em>journal.</em>" "Honest car care advice for life in Casablanca, from the people who wash cars every day." "" ""
cat <<EOF
<section class="pad" style="padding-top:60px"><div class="wrap">
  <div id="feat"></div>
  <div data-render="posts" data-filters data-skip="sea-salt-and-paint"></div>
</div></section>
EOF
foot; } > blog.html

########## POST ##########
{ head post "Journal — Casa Shine" "Car care advice for Casablanca drivers."; foot; } > post.html

########## CONTACT ##########
{ head contact "Contact & Booking — Casa Shine" "Book a car wash in Casablanca on WhatsApp, by phone or with our form. Studio in Maârif, doorstep service city-wide." "data-nocta"
phero "Contact" "Let's get you<br><em>shining.</em>" "Book with the form below and WhatsApp opens with your request ready. Or just call — we pick up." "" ""
cat <<EOF
<section class="pad" id="book" style="padding-top:60px"><div class="wrap contact">
  <div class="cinfo" data-stagger>
    <a class="ci" data-href="wa" href="#" target="_blank" rel="noopener"><span class="ic">💬</span><div><small>WhatsApp — fastest</small><b>Chat with us</b></div></a>
    <a class="ci" data-href="tel" href="#"><span class="ic">☎</span><div><small>Phone</small><b data-s="phone"></b></div></a>
    <a class="ci" data-href="mail" href="#"><span class="ic">✉</span><div><small>Email</small><b data-s="email"></b></div></a>
    <div class="ci"><span class="ic">⌖</span><div><small>Studio</small><b data-s="address"></b></div></div>
    <div class="ci"><span class="ic">◷</span><div><small>Opening hours</small><b data-s="hours"></b></div></div>
  </div>
  <div data-render="book" data-light data-msg data-reveal></div>
</div></section>
<section class="pad pad-t0"><div class="wrap">
  <div class="map" data-clip><iframe title="Map of our studio in Maârif, Casablanca" loading="lazy" src="https://maps.google.com/maps?q=Maarif%2C%20Casablanca&z=14&output=embed"></iframe></div>
</div></section>
$FAQ
EOF
foot; } > contact.html

########## 404 ##########
{ head 404 "Page not found — Casa Shine" "This page doesn't exist." "data-nocta"
cat <<EOF
<section class="nf"><div>
  <h1 id="nf" data-split="intro">4<em>0</em>4</h1>
  <p class="muted" data-reveal style="font-size:20px;margin:30px 0 26px">This page went through the car wash and never came back.</p>
  <a href="index.html" class="btn btn-ink" data-reveal>Back to home $AR</a>
</div></section>
EOF
foot; } > 404.html

echo "Pages built."
