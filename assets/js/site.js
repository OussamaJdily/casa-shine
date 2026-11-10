/* ================= CASA SHINE — site engine =================
   Layout (nav/footer), page renderers, widgets and motion.
   Content comes from assets/js/data.js
   ============================================================ */
(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || "";
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G = !!(window.gsap && window.ScrollTrigger) && !RM;
  const HOVER = matchMedia("(hover:hover)").matches;
  if (!G) document.documentElement.classList.add("no-motion");
  const qs = new URLSearchParams(location.search);
  const U = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  const img = (id, alt = "", w) => `<img src="${U(id, w)}" alt="${alt}" loading="lazy">`;
  const mad = n => Number(n).toLocaleString("en");
  const store = { get(k) { try { return sessionStorage.getItem(k) } catch (e) { return null } }, set(k, v) { try { sessionStorage.setItem(k, v) } catch (e) {} } };

  // crown + car mark (same artwork as assets/img/logo.svg)
  const MARK = `<svg viewBox="0 0 140 100" aria-hidden="true"><g fill="#FFD60A"><path d="M22 88 L12 30 Q27 44 40 52 L42 18 Q53 36 58 46 L70 9 L82 46 Q87 36 98 18 L100 52 Q113 44 128 30 L118 88 Z"/><circle cx="11" cy="25.5" r="6"/><circle cx="42" cy="13" r="6"/><circle cx="70" cy="6" r="6"/><circle cx="98" cy="13" r="6"/><circle cx="129" cy="25.5" r="6"/></g><g fill="#0A0A0A"><path d="M38 62 L45 49 Q47.5 45 53 45 H87 Q92.5 45 95 49 L102 62 Z"/><path d="M27 69 Q27 62 34 61 H106 Q113 62 113 69 V86 Q113 89 110 89 H30 Q27 89 27 86 Z"/><path d="M30 58 Q30 55 33 55 H39 L37.5 60 H32 Q30 60 30 58 Z"/><path d="M110 58 Q110 55 107 55 H101 L102.5 60 H108 Q110 60 110 58 Z"/><rect x="31" y="86" width="15" height="9" rx="2.5"/><rect x="94" y="86" width="15" height="9" rx="2.5"/></g><g fill="#FFD60A"><path d="M44 60 L49 50.5 Q50.5 48.5 54 48.5 H86 Q89.5 48.5 91 50.5 L96 60 Z"/><path d="M32 67 Q32 65 34.5 65 H50 L47 72 H35 Q32 72 32 70 Z"/><path d="M108 67 Q108 65 105.5 65 H90 L93 72 H105 Q108 72 108 70 Z"/><rect x="55" y="66" width="30" height="2.4" rx="1.2"/><rect x="55" y="70.4" width="30" height="2.4" rx="1.2"/><rect x="55" y="74.8" width="30" height="2.4" rx="1.2"/><rect x="34" y="81" width="72" height="2.6" rx="1.3"/><circle cx="38" cy="76.5" r="2"/><circle cx="102" cy="76.5" r="2"/></g><g fill="#0A0A0A"><path d="M58 50.5 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3z"/><path d="M67 50 l.8 2 2 .8 -2 .8 -.8 2 -.8 -2 -2 -.8 2 -.8z"/><path d="M78 55 L84 49.5 H87.5 L80 56.5 Z" opacity=".55"/><path d="M83 57.5 L90 51 H91.5 L84.5 57.5 Z" opacity=".55"/></g><g fill="none" stroke="#FFD60A" stroke-width="2"><circle cx="8" cy="76" r="5"/><circle cx="13" cy="90" r="3"/><circle cx="132" cy="72" r="4"/><circle cx="127" cy="88" r="5.5"/></g><g fill="#FFD60A"><circle cx="3" cy="62" r="1.8"/><circle cx="137" cy="58" r="1.6"/></g></svg>`;
  const LOGO = `${MARK}<span class="lw"><b>${S.name}</b><small>Car wash · Casablanca</small></span>`;
  const AR = `<span class="ar">↗</span>`;
  const NAV = [["index.html", "Home"], ["about.html", "About"], ["services.html", "Services"], ["pricing.html", "Pricing"], ["team.html", "Team"], ["blog.html", "Journal"], ["contact.html", "Contact"]];
  const active = { home: "index.html", about: "about.html", services: "services.html", service: "services.html", pricing: "pricing.html", team: "team.html", blog: "blog.html", post: "blog.html", contact: "contact.html" }[page];
  const cleanPath = p => p.replace(/\.html$/, "").replace(/\/index$/, "/") || "/";
  const samePath = (a, b) => cleanPath(a) === cleanPath(b);
  const waLink = (msg = "") => `https://wa.me/${S.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;

  /* ================= 1. CHROME ================= */
  const curtain = $("#curtain");
  if (curtain) curtain.innerHTML = `<span class="logo">${LOGO}</span>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="cur" id="cur"><span></span></div>
    <header class="nav" id="nav">
      <a href="index.html" class="logo" aria-label="${S.name} home">${LOGO}</a>
      <ul>${NAV.map(([h, t]) => `<li><a href="${h}" class="${h === active ? "on" : ""}">${t}</a></li>`).join("")}</ul>
      <div class="right">
        <a href="contact.html#book" class="btn btn-y">Book a wash ${AR}</a>
        <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </header>
    <nav class="mmenu" aria-label="Mobile" data-lenis-prevent>
      <div>${NAV.map(([h, t], i) => `<a class="big" href="${h}">${t}<small>0${i + 1}</small></a>`).join("")}</div>
      <div><a href="contact.html#book" class="btn btn-y" style="margin:24px 0 16px">Book a wash ${AR}</a><div class="muted">${S.address}<br>${S.phone}</div></div>
    </nav>`);

  const main = $("main");
  const noCta = document.body.hasAttribute("data-nocta");
  main.insertAdjacentHTML("afterend", `
    ${noCta ? "" : `<section class="cta-band" style="margin-top:20px"><div class="wrap">
      <span class="tag">Book today</span>
      <div class="row" style="margin-top:26px">
        <h2 data-split>Ready to<br><span class="y">shine?</span></h2>
        <div style="max-width:360px"><p class="muted" style="margin-bottom:20px">Studio in Maârif or at your door anywhere in Casablanca. We reply on WhatsApp in about 10 minutes.</p>
        <a href="contact.html#book" class="btn btn-y">Book your wash ${AR}</a></div>
      </div></div></section>`}
    <footer><div class="wrap">
      <div class="fgrid">
        <div>
          <a href="index.html" class="logo">${LOGO}</a>
          <p class="muted" style="margin-top:14px;max-width:340px">Premium hand wash, interior care and ceramic detailing in Casablanca. Monthly offers in your inbox:</p>
          <form class="news" data-news><input type="email" required placeholder="Your email" aria-label="Email"><button class="btn btn-ink" style="padding:10px 18px">Join</button></form>
        </div>
        <div><h5>Pages</h5><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
        <div><h5>Services</h5><ul>${S.services.map(s => `<li><a href="service.html?s=${s.slug}">${s.title}</a></li>`).join("")}</ul></div>
        <div><h5>Studio</h5><ul>
          <li>${S.address}</li>
          <li><a href="tel:${S.phone.replace(/\s/g, "")}">${S.phone}</a></li>
          <li><a href="mailto:${S.email}">${S.email}</a></li>
          <li>${S.hours}</li>
          <li style="display:flex;gap:14px;flex-wrap:wrap;margin-top:6px">${Object.entries(S.socials).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener">${k}</a>`).join("")}</li>
        </ul></div>
      </div>
      <div class="giant" id="giant">${S.name.toUpperCase()}</div>
      <div class="fbot"><span>© ${new Date().getFullYear()} ${S.name}. All rights reserved.</span><span>Made in Casablanca 🇲🇦</span></div>
    </div></footer>
    <a class="wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.3-1.5-5.2C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z"/></svg>
    </a>`);

  /* ================= 2. RENDERERS ================= */
  const R = {
    brands: el => { const set = S.brands.map(b => `<div class="chip"><i></i>${b}</div>`).join(""); el.innerHTML = `<div class="marq-t">${set}${set}</div>`; el.classList.add("marq"); el.dataset.marq = el.dataset.marq || "1"; },
    bigmarq: el => { const w = (el.dataset.words || "Hand wash|Detailing|Ceramic|Casablanca").split("|"); const set = w.map((t, i) => `<span class="${i % 2 ? "ol" : ""}">${t}</span>`).join(""); el.innerHTML = `<div class="marq-t">${set}${set}</div>`; el.classList.add("marq-big"); el.dataset.marq = el.dataset.marq || "1"; el.dataset.skew = "1"; },
    zones: el => { el.className = "zones"; el.innerHTML = S.zones.map(z => `<span>${z}</span>`).join(""); },
    "services-acc": el => {
      el.innerHTML = S.services.map((s, i) => `
        <div class="svc ${i === 0 ? "open" : ""}" data-reveal>
          <button class="svc-h" aria-expanded="${i === 0}"><span class="n">0${i + 1}</span><h3>${s.title}</h3><span class="pm">+</span></button>
          <div class="svc-b"><div><div class="svc-in"><span></span>
            <div class="ph">${img(s.img, s.title, 1000)}</div>
            <div><p>${s.short}</p><ul class="ticks">${s.list.map(x => `<li>${x}</li>`).join("")}</ul>
            <div class="svc-price">${s.plus ? "Supplement" : "Starting"} <b>${s.plus ? "+" : ""}${mad(s.price)} MAD</b></div>
            <a class="btn btn-line" href="service.html?s=${s.slug}">Service details ${AR}</a></div>
          </div></div></div>
        </div>`).join("");
      el.addEventListener("click", e => {
        const h = e.target.closest(".svc-h"); if (!h) return;
        const s = h.parentElement, was = s.classList.contains("open");
        $$(".svc", el).forEach(x => { x.classList.remove("open"); $(".svc-h", x).setAttribute("aria-expanded", "false"); });
        if (!was) { s.classList.add("open"); h.setAttribute("aria-expanded", "true"); }
        setTimeout(() => G && ScrollTrigger.refresh(), 650);
      });
    },
    cards: el => {
      const skip = el.dataset.skip, lim = +el.dataset.limit || 99;
      const list = S.services.filter(s => s.slug !== skip).slice(0, lim);
      el.className = "cards"; el.dataset.rise3d = "";
      el.innerHTML = list.map(s => `
        <a class="card" href="service.html?s=${s.slug}" data-tilt>
          <div class="ph">${img(s.img, s.title, 900)}</div>
          <div class="cb"><span class="num">0${S.services.indexOf(s) + 1} · ${s.time}</span><h3>${s.title}</h3><p class="muted">${s.short}</p>
          <div class="foot"><b>${s.plus ? "+" : "from "}${mad(s.price)} MAD</b><span class="go">↗</span></div></div>
        </a>`).join("");
    },
    works: el => {
      el.innerHTML = `<div class="hwrap"><div class="htrack">${S.works.map((w, i) => `
        <article class="work"><div class="ph">${img(w.img, w.t, 1200)}</div>
        <div class="wcap"><span class="wn">${String(i + 1).padStart(2, "0")} / ${String(S.works.length).padStart(2, "0")}</span><h4>${w.t}</h4>
        <dl><div><dt>Service</dt><dd>${w.s}</dd></div><div><dt>Year</dt><dd>${w.y}</dd></div><div><dt>Area</dt><dd>${w.z}</dd></div></dl></div></article>`).join("")}
      </div></div><div class="wrap"><div class="hprog"><i></i></div></div>`;
    },
    plans: el => {
      el.innerHTML = `<div class="tabs" data-reveal><span class="pill"></span>${S.vehicles.map((v, i) => `<button class="${i ? "" : "on"}" data-v="${i}">${v}</button>`).join("")}</div>
        <div class="plans" data-rise3d>${S.plans.map((p, i) => `
          <div class="plan ${p.hot ? "hot" : ""}" data-tilt>
            <div class="pt"><h3>${p.name}</h3>${p.hot ? '<span class="pop">Most popular</span>' : ""}</div>
            <div class="pr"><span data-i="${i}">${mad(p.prices[0])}</span> <small>MAD</small></div>
            <p>${p.desc}</p><ul class="ticks">${p.list.map(x => `<li>${x}</li>`).join("")}</ul>
            <a href="contact.html#book" class="btn ${p.hot ? "btn-y" : "btn-ink"}">Book ${p.name} ${AR}</a>
          </div>`).join("")}</div>
        <p class="muted" style="margin-top:18px;font-size:14px">Prices in MAD, VAT included. Doorstep service +40 MAD anywhere inside Casablanca.</p>`;
      const tabs = $(".tabs", el), pill = $(".pill", tabs);
      const move = b => Object.assign(pill.style, { left: b.offsetLeft + "px", top: b.offsetTop + "px", width: b.offsetWidth + "px", height: b.offsetHeight + "px" });
      tabs.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        $$("button", tabs).forEach(x => x.classList.toggle("on", x === b)); move(b);
        $$(".pr span", el).forEach(s => { s.classList.add("flip"); setTimeout(() => { s.textContent = mad(S.plans[s.dataset.i].prices[b.dataset.v]); s.classList.remove("flip"); }, 220); });
      });
      const sync = () => move($("button.on", tabs));
      requestAnimationFrame(sync); addEventListener("resize", sync); addEventListener("load", sync);
    },
    addons: el => { el.className = "addons"; el.dataset.stagger = ""; el.innerHTML = S.addons.map(([n, p]) => `<div class="addon"><span>${n}</span><b>+${p} MAD</b></div>`).join(""); },
    reviews: el => {
      const tc = r => `<div class="tc"><div class="stars">★★★★★</div><q>“${r[2]}”</q><div class="who"><span class="av">${r[0][0]}</span><div><b>${r[0]}</b><div class="muted">${r[1]}</div></div></div></div>`;
      const a = S.reviews.slice(0, 4), b = S.reviews.slice(4);
      el.innerHTML = `<div class="tst-row" data-marq="1" data-speed="40"><div class="tst-t">${[...a, ...a, ...a, ...a].map(tc).join("")}</div></div>
        <div class="tst-row" data-marq="-1" data-speed="40" style="margin-top:6px"><div class="tst-t">${[...b, ...b, ...b, ...b].map(tc).join("")}</div></div>`;
    },
    faq: el => {
      el.innerHTML = S.faq.map(([q, a], i) => `<div class="qa ${i === 0 ? "open" : ""}"><button aria-expanded="${i === 0}">${q}<span class="pm">+</span></button><div class="a"><div><p>${a}</p></div></div></div>`).join("");
      el.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        const q = b.parentElement, was = q.classList.contains("open");
        $$(".qa", el).forEach(x => { x.classList.remove("open"); $("button", x).setAttribute("aria-expanded", "false"); });
        if (!was) { q.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
        setTimeout(() => G && ScrollTrigger.refresh(), 550);
      });
    },
    team: el => {
      const lim = +el.dataset.limit || 99;
      el.className = "team"; el.dataset.rise3d = "";
      el.innerHTML = S.team.slice(0, lim).map(m => `<div class="mate" data-tilt><div class="pic"><span>${m.n[0]}</span></div><div class="info"><div><h3>${m.n}</h3><p class="muted">${m.r}</p></div><span class="yrs">${m.y}</span></div></div>`).join("");
    },
    timeline: el => { el.className = "tl"; el.innerHTML = `<i class="line-fill"></i>` + S.timeline.map(([y, t, d]) => `<div data-reveal><b>${y}</b><h4>${t}</h4><p class="muted">${d}</p></div>`).join(""); },
    posts: el => {
      const lim = +el.dataset.limit || 99, filters = el.hasAttribute("data-filters"), skip = el.dataset.skip;
      const list = S.posts.filter(p => p.slug !== skip);
      const card = p => `<a href="post.html?p=${p.slug}" class="post" data-cat="${p.cat}"><div class="ph">${img(p.img, "", 900)}</div><div class="meta"><span class="cat">${p.cat}</span><span>${p.author}</span>·<span>${p.date}</span>·<span>${p.read}</span></div><h4>${p.title}</h4></a>`;
      const cats = ["All", ...new Set(list.map(p => p.cat))];
      el.innerHTML = (filters ? `<div class="filters" data-reveal>${cats.map((c, i) => `<button class="${i ? "" : "on"}">${c}</button>`).join("")}</div>` : "") +
        `<div class="posts" data-stagger>${list.slice(0, lim).map(card).join("")}</div>`;
      if (filters) $(".filters", el).addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        $$(".filters button", el).forEach(x => x.classList.toggle("on", x === b));
        $$(".post", el).forEach(p => {
          const show = b.textContent === "All" || p.dataset.cat === b.textContent;
          if (G) gsap.to(p, { autoAlpha: show ? 1 : 0, scale: show ? 1 : .95, duration: .35, onStart: () => show && (p.style.display = ""), onComplete: () => !show && (p.style.display = "none") });
          else p.style.display = show ? "" : "none";
        });
        setTimeout(() => G && ScrollTrigger.refresh(), 400);
      });
    },
    book: el => {
      const light = el.hasAttribute("data-light");
      el.innerHTML = `<form class="bf ${light ? "light" : ""}" data-book>
        <label>Name<input name="name" required placeholder="Your name" autocomplete="name"></label>
        <label>Phone<input name="phone" required placeholder="06 00 00 00 00" inputmode="tel" autocomplete="tel"></label>
        <label>Service<select name="service">${S.services.map(s => `<option ${qs.get("s") === s.slug ? "selected" : ""}>${s.title}</option>`).join("")}</select></label>
        <label>Vehicle<select name="car">${S.vehicles.map(v => `<option>${v}</option>`).join("")}</select></label>
        <label>Neighbourhood<input name="zone" placeholder="e.g. Maârif" list="zl"></label>
        <label>Date<input name="date" type="date"></label>
        <label class="full">Where<select name="where"><option>At your studio (Maârif)</option><option>At my place (+40 MAD)</option></select></label>
        ${el.hasAttribute("data-msg") ? `<label class="full">Message (optional)<textarea name="msg" rows="3" placeholder="Anything we should know?"></textarea></label>` : ""}
        <button class="btn btn-y full" type="submit">Send on WhatsApp ${AR}</button>
        <p class="note full">No payment now — pay after the wash.</p>
        <datalist id="zl">${S.zones.map(z => `<option>${z}</option>`).join("")}</datalist>
      </form>`;
    }
  };

  /* page-specific renderers */
  const P = {
    service() {
      const s = S.services.find(x => x.slug === qs.get("s")) || S.services[0];
      document.title = `${s.title} — ${S.name}`;
      const idx = S.services.indexOf(s);
      main.innerHTML = `
        <section class="phero"><div class="wrap">
          <div class="crumbs" data-reveal><a href="index.html">Home</a>/<a href="services.html">Services</a>/<span>${s.title}</span></div>
          <h1 data-split="intro">${s.title.replace(/ (\S+)$/, " <em>$1</em>")}</h1>
          <div class="phero-row"><p data-reveal>${s.short}</p>
            <div class="meta-row" data-reveal><div><span class="muted">${s.plus ? "Supplement" : "From"}</span><b>${s.plus ? "+" : ""}${mad(s.price)} MAD</b></div><div><span class="muted">Duration</span><b>${s.time}</b></div><div><span class="muted">Service</span><b>0${idx + 1}/0${S.services.length}</b></div></div>
          </div>
          <div class="phero-img ph" data-clip data-par>${img(s.img, s.title, 2000)}</div>
        </div></section>
        <section class="pad"><div class="wrap sd">
          <div class="body">
            <span class="tag" data-reveal>Overview</span>
            ${s.body.map(p => `<p data-reveal style="margin-top:22px">${p}</p>`).join("")}
            <h2 data-split>What's included</h2>
            <ul class="ticks" data-stagger style="font-size:18px">${s.list.map(x => `<li>${x}</li>`).join("")}</ul>
            <h2 data-split>How it goes</h2>
            <div class="steps4" data-stagger><div><h4>Book</h4><p class="muted">WhatsApp or the form, in 30 seconds.</p></div><div><h4>Inspect</h4><p class="muted">We check the car with you and take photos.</p></div><div><h4>Clean</h4><p class="muted">The work itself, done by hand.</p></div><div><h4>Hand-over</h4><p class="muted">Final check together, then you pay.</p></div></div>
          </div>
          <aside class="sd-card" data-reveal>
            <span class="tag">Book this service</span>
            <div class="pr">${s.plus ? "+" : ""}${mad(s.price)} <small>MAD ${s.plus ? "" : "· citadine"}</small></div>
            <div class="row"><span>Duration</span><b>${s.time}</b></div>
            <div class="row"><span>Where</span><b>Studio or doorstep</b></div>
            <div class="row"><span>Payment</span><b>After the wash</b></div>
            <a class="btn btn-y" href="contact.html?s=${s.slug}#book">Book ${s.title} ${AR}</a>
            <a class="btn btn-line" style="width:100%;justify-content:space-between;margin-top:10px" href="${waLink("Salam! Question about: " + s.title)}" target="_blank" rel="noopener">Ask on WhatsApp ${AR}</a>
          </aside>
        </div></section>
        <section class="pad pad-t0"><div class="wrap">
          <div class="sec-head"><div><span class="tag" data-reveal>More services</span><h2 class="h2" data-split>You might<br>also need.</h2></div><a href="services.html" class="btn btn-ink" data-reveal>All services ${AR}</a></div>
          <div data-render="cards" data-skip="${s.slug}" data-limit="3"></div>
        </div></section>`;
    },
    post() {
      const p = S.posts.find(x => x.slug === qs.get("p")) || S.posts[0];
      document.title = `${p.title} — ${S.name}`;
      main.innerHTML = `
        <section class="phero"><div class="wrap">
          <div class="crumbs" data-reveal><a href="index.html">Home</a>/<a href="blog.html">Journal</a>/<span>${p.cat}</span></div>
          <h1 data-split="intro" style="font-size:clamp(40px,6.4vw,96px);max-width:1150px;line-height:.95">${p.title}</h1>
          <div class="phero-row"><div class="meta-row" data-reveal><div><span class="muted">Written by</span><b>${p.author}</b></div><div><span class="muted">Published</span><b>${p.date}</b></div><div><span class="muted">Reading</span><b>${p.read}</b></div></div></div>
          <div class="phero-img ph" data-clip data-par>${img(p.img, "", 2000)}</div>
        </div></section>
        <section class="pad"><div class="wrap"><article class="article">
          ${p.body.map(t => t.startsWith("## ") ? `<h2 data-split>${t.slice(3)}</h2>` : `<p data-reveal>${t}</p>`).join("")}
          <div class="share" data-reveal><span class="muted" style="margin-right:6px">Share</span>
            <a href="${waLink(p.title + " " + location.href)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WA</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Share on Facebook">FB</a>
            <a href="https://x.com/intent/post?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Share on X">X</a>
          </div>
        </article></div></section>
        <section class="pad pad-t0"><div class="wrap">
          <div class="sec-head"><div><span class="tag" data-reveal>Keep reading</span><h2 class="h2" data-split>More from<br>the journal.</h2></div></div>
          <div data-render="posts" data-skip="${p.slug}" data-limit="3"></div>
        </div></section>`;
    },
    blog() {
      const f = S.posts[0], el = $("#feat");
      if (el) el.innerHTML = `<a href="post.html?p=${f.slug}" class="feat post"><div class="ph" data-clip>${img(f.img, "", 1600)}</div>
        <div data-reveal><div class="meta"><span class="cat">${f.cat}</span><span>${f.author}</span>·<span>${f.date}</span></div><h2>${f.title}</h2><p class="muted" style="margin-bottom:24px">${f.body[0]}</p><span class="link-ar">Read the article ↗</span></div></a>`;
    }
  };

  P[page] && P[page]();
  $$("[data-render]").forEach(el => R[el.dataset.render] && R[el.dataset.render](el));

  /* contact details filled from data.js */
  $$("[data-s]").forEach(el => el.textContent = S[el.dataset.s] || "");
  $$("[data-href]").forEach(a => {
    const k = a.dataset.href;
    a.href = k === "tel" ? "tel:" + S.phone.replace(/\s/g, "") : k === "mail" ? "mailto:" + S.email : waLink("Salam " + S.name + "!");
  });

  /* ================= 3. WIDGETS ================= */
  // broken image → gradient shows
  $$(".ph img").forEach(i => { const f = () => i.classList.add("broken"); if (i.complete && !i.naturalWidth && i.src) f(); i.addEventListener("error", f); });

  // mobile menu
  const burger = $("#burger");
  burger.onclick = () => { const o = document.body.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", o); lenis && (o ? lenis.stop() : lenis.start()); };
  $$(".mmenu a").forEach(a => a.addEventListener("click", () => { document.body.classList.remove("menu-open"); lenis && lenis.start(); }));
  addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) burger.click(); });

  // booking → WhatsApp
  $$("[data-book]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(f));
    const msg = `Salam ${S.name}! I'd like to book:\n• Service: ${d.service}\n• Vehicle: ${d.car}\n• Where: ${d.where}\n• Area: ${d.zone || "-"}\n• Date: ${d.date || "-"}\n• Name: ${d.name}\n• Phone: ${d.phone}${d.msg ? "\n• Note: " + d.msg : ""}`;
    window.open(waLink(msg), "_blank", "noopener");
  }));
  $$("[data-news]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); f.innerHTML = `<span style="padding:10px 14px">Merci! You're on the list ✓</span>`; }));

  // works slider: its photos sit off-screen to the right, so start loading them before the section arrives
  $$(".htrack").forEach(t => new IntersectionObserver((es, o) => {
    if (!es[0].isIntersecting) return; o.disconnect(); $$("img", t).forEach(i => { i.loading = "eager"; });
  }, { rootMargin: "1200px 0px" }).observe(t));

  // hero background video: tall clip on portrait screens, wide on landscape; the photo stays
  // underneath as the poster/fallback (reduced motion, data saver, autoplay blocked)
  const hv = $(".hero-vid");
  if (hv && !RM && !(navigator.connection && navigator.connection.saveData)) {
    const portrait = matchMedia("(max-aspect-ratio: 1/1)").matches;
    hv.src = portrait ? hv.dataset.tall : hv.dataset.wide;
    hv.addEventListener("playing", () => hv.classList.add("on"), { once: true });
    const tryPlay = () => { const p = hv.play(); p && p.catch(() => {}); };
    tryPlay();
    new IntersectionObserver(es => es[0].isIntersecting ? tryPlay() : hv.pause()).observe(hv);
  }

  // before / after
  $$("[data-ba]").forEach(ba => {
    const bef = $(".before", ba), hd = $(".handle", ba), kb = $(".knob", ba);
    const set = x => { const r = ba.getBoundingClientRect(), p = Math.min(Math.max((x - r.left) / r.width, 0), 1) * 100; bef.style.clipPath = `inset(0 ${100 - p}% 0 0)`; hd.style.left = kb.style.left = p + "%"; };
    let down = false;
    ba.addEventListener("pointerdown", e => { down = true; set(e.clientX); });
    addEventListener("pointermove", e => down && set(e.clientX));
    addEventListener("pointerup", () => down = false);
    new IntersectionObserver((es, o) => { if (!es[0].isIntersecting) return; o.disconnect(); const r = ba.getBoundingClientRect(), t0 = performance.now();
      const a = t => { const p = (t - t0) / 1800; if (p > 1 || down) return; set(r.left + r.width * (.5 + Math.sin(p * Math.PI * 2) * .22)); requestAnimationFrame(a); }; requestAnimationFrame(a); }, { threshold: .6 }).observe(ba);
  });

  // words highlight
  const wEl = $("[data-words-hl]"); let ws = [];
  if (wEl) { wEl.innerHTML = wEl.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" "); ws = $$(".w", wEl); if (!G) ws.forEach(w => w.classList.add("on")); }

  // counters (plain fallback)
  const countUp = el => { const to = +el.dataset.count, dec = +(el.dataset.dec || 0), t0 = performance.now();
    const st = t => { const p = Math.min((t - t0) / 1800, 1), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en"); if (p < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); };

  /* ================= 4. MOTION ================= */
  let lenis = null;
  const nav = $("#nav");

  if (!G) {
    curtain && curtain.remove();
    $$("[data-count]").forEach(countUp);
    let lastY = 0; addEventListener("scroll", () => { const y = scrollY; nav.classList.toggle("hide", y > lastY && y > 300); lastY = y; }, { passive: true });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    lenis = new Lenis({ lerp: .1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ({ direction, scroll }) => nav.classList.toggle("hide", direction === 1 && scroll > 300 && !document.body.classList.contains("menu-open")));
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => { const t = $(a.getAttribute("href")); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); } }));
  }

  /* split text */
  const split = el => {
    if (el.dataset.done) return $$(".wi", el);
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(" "));
          else { const o = document.createElement("span"), i = document.createElement("span"); o.className = "wm"; i.className = "wi"; i.textContent = p; o.appendChild(i); frag.appendChild(o); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
    });
    walk(el); el.dataset.done = 1; return $$(".wi", el);
  };

  const introTl = gsap.timeline({ paused: true });
  $$("[data-split]").forEach(el => {
    const w = split(el);
    if (el.dataset.split === "intro") introTl.from(w, { yPercent: 115, rotate: 4, duration: 1.2, ease: "expo.out", stagger: .06 }, 0);
    else gsap.from(w, { yPercent: 115, rotate: 4, duration: 1.1, ease: "expo.out", stagger: .04, scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  $$("[data-intro]").forEach((el, i) => introTl.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out" }, .35 + i * .1));

  /* reveals */
  // page-header reveals play with the intro (after the curtain), not behind it
  $$(".phero [data-reveal]").forEach((el, i) => { el.dataset.introDone = 1; introTl.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out" }, .3 + i * .08); });
  $$("[data-reveal]").forEach(el => {
    if (el.dataset.introDone || el.closest("[data-stagger],[data-rise3d]")) return;
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });
  // grid items: each row animates when IT scrolls into view (works for 3 columns and for
  // the single column on phones). Transforms are cleared afterwards so hover tilt starts clean.
  const PHONE = matchMedia("(max-width: 640px)").matches;
  const batchIn = (items, from, to) => {
    if (!items.length) return;
    gsap.set(items, from);
    ScrollTrigger.batch(items, { start: "top 92%", once: true,
      onEnter: b => gsap.to(b, { ...to, stagger: .09, overwrite: true, clearProps: "transform,transformPerspective,transformOrigin", onComplete() { b.forEach(x => x._in = 1); } }) });
  };
  $$("[data-stagger]").forEach(el => batchIn([...el.children], { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, ease: "power3.out" }));
  $$("[data-rise3d]").forEach(el => batchIn([...el.children],
    PHONE ? { y: 50, autoAlpha: 0 } : { y: 70, rotationX: -18, autoAlpha: 0, transformPerspective: 1000, transformOrigin: "50% 100%" },
    PHONE ? { y: 0, autoAlpha: 1, duration: .9, ease: "power3.out" } : { y: 0, rotationX: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out" }));

  /* parallax + 3D clip reveals */
  $$("[data-par]").forEach(el => {
    const im = $("img", el); if (!im) return;
    gsap.set(im, { scale: 1.2 });
    gsap.fromTo(im, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });
  $$("[data-clip]").forEach(el => gsap.fromTo(el,
    { clipPath: "inset(14% 10% 0% 10% round 28px)", rotationX: 14, transformPerspective: 1200, transformOrigin: "50% 100%" },
    { clipPath: "inset(0% 0% 0% 0% round 28px)", rotationX: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "top 35%", scrub: true } }));

  /* counters */
  $$("[data-count]").forEach(el => ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => countUp(el) }));

  /* words highlight */
  if (wEl) ScrollTrigger.create({ trigger: wEl, start: "top 80%", end: "bottom 45%", scrub: true, onUpdate: s => { const n = Math.round(s.progress * ws.length); ws.forEach((w, i) => w.classList.toggle("on", i < n)); } });

  /* process steps */
  const steps = $$(".step"), pn = $("#pn"), pbar = $("#pbar");
  steps.forEach((st, i) => ScrollTrigger.create({ trigger: st, start: "top 60%", end: "bottom 60%",
    onToggle: s => { if (!s.isActive) return; steps.forEach((x, j) => x.classList.toggle("on", j === i)); pn && (pn.style.transform = `translateY(${-i * 25}%)`); pbar && (pbar.style.width = (i + 1) * 25 + "%"); } }));

  /* timeline line */
  const mm = gsap.matchMedia();
  const tl = $(".tl");
  if (tl) {
    const f = $(".line-fill", tl), st = { trigger: tl, start: "top 75%", end: "bottom 60%", scrub: true };
    mm.add("(max-width: 980px)", () => { gsap.fromTo(f, { height: "0%" }, { height: "100%", ease: "none", scrollTrigger: { ...st } }); return () => gsap.set(f, { clearProps: "height" }); });
    mm.add("(min-width: 981px)", () => { gsap.fromTo(f, { width: "0%" }, { width: "100%", ease: "none", scrollTrigger: { ...st } }); return () => gsap.set(f, { clearProps: "width" }); });
  }

  /* horizontal works (desktop) */
  mm.add("(min-width: 981px)", () => {
    const pin = $("[data-hpin]"); if (!pin) return;
    const tr = $(".htrack", pin), prog = $(".hprog i", pin);
    const dist = () => tr.scrollWidth - innerWidth + 32;
    gsap.to(tr, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: s => prog && (prog.style.width = s.progress * 100 + "%") } });
  });

  /* marquees driven by scroll velocity */
  $$("[data-marq]").forEach(m => {
    const t = m.firstElementChild, dir = +m.dataset.marq < 0 ? 1 : -1, speed = +m.dataset.speed || 60, skew = m.dataset.skew;
    let x = 0, hover = false, sk = 0, half = 0, seen = true;
    // measure once (and on resize) instead of every frame — avoids layout thrash
    const measure = () => { const h = t.scrollWidth / 2; if (h) half = h; };
    new ResizeObserver(measure).observe(t); addEventListener("load", measure);
    new IntersectionObserver(es => seen = es[0].isIntersecting, { rootMargin: "200px" }).observe(m);
    m.addEventListener("mouseenter", () => hover = true); m.addEventListener("mouseleave", () => hover = false);
    gsap.ticker.add((time, dt) => {
      if (!half) measure(); if (!half || !seen) return;
      const v = lenis ? lenis.velocity : 0;
      x += dir * (hover ? .15 : 1) * speed * (1 + Math.min(Math.abs(v), 50) / 6) * dt / 1000;
      x = ((x % half) - half) % half; // keep x in (-half, 0]
      sk += ((skew ? Math.max(-12, Math.min(12, -v * .5)) : 0) - sk) * .1;
      t.style.transform = `translate3d(${x}px,0,0)${skew ? ` skewX(${sk.toFixed(2)}deg)` : ""}`;
    });
  });

  /* giant footer letters */
  const giant = $("#giant");
  if (giant) { giant.innerHTML = [...giant.textContent].map(c => `<span style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`).join("");
    gsap.from(giant.children, { yPercent: 110, rotate: 8, duration: 1.2, ease: "expo.out", stagger: .04, scrollTrigger: { trigger: giant, start: "top 98%" } }); }

  /* 3D tilt + magnetic + cursor (pointer devices) */
  if (HOVER) {
    $$("[data-tilt]").forEach(el => {
      el.insertAdjacentHTML("beforeend", '<i class="glare"></i>');
      let rx, ry;
      const ready = () => !el.parentElement.matches("[data-rise3d]") || el._in; // wait for the entrance
      el.addEventListener("pointermove", e => {
        if (!ready()) return;
        if (!rx) { gsap.set(el, { transformPerspective: 900 }); rx = gsap.quickTo(el, "rotationX", { duration: .6, ease: "power3" }); ry = gsap.quickTo(el, "rotationY", { duration: .6, ease: "power3" }); }
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; rx((.5 - y) * 7); ry((x - .5) * 9); el.style.setProperty("--gx", x * 100 + "%"); el.style.setProperty("--gy", y * 100 + "%"); });
      el.addEventListener("pointerleave", () => { rx && rx(0); ry && ry(0); });
    });
    $$(".btn, .burger").forEach(b => {
      const mx = gsap.quickTo(b, "x", { duration: .5, ease: "power3" }), my = gsap.quickTo(b, "y", { duration: .5, ease: "power3" });
      b.addEventListener("pointermove", e => { if (gsap.isTweening(b) && !b._magOn) return; b._magOn = 1; const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .25); my((e.clientY - r.top - r.height / 2) * .35); });
      b.addEventListener("pointerleave", () => { mx(0); my(0); });
    });
    const cur = $("#cur"), cx = gsap.quickTo(cur, "x", { duration: .35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: .35, ease: "power3" });
    addEventListener("pointermove", e => { cur.classList.add("show"); cx(e.clientX); cy(e.clientY); });
    document.addEventListener("pointerleave", () => cur.classList.remove("show"));
    $$("[data-cursor]").forEach(el => { el.addEventListener("pointerenter", () => { $("span", cur).textContent = el.dataset.cursor; cur.classList.add("big"); }); el.addEventListener("pointerleave", () => cur.classList.remove("big")); });
    $$("a.post, a.card").forEach(el => { el.addEventListener("pointerenter", () => { $("span", cur).textContent = "View"; cur.classList.add("big"); }); el.addEventListener("pointerleave", () => cur.classList.remove("big")); });
  }

  /* 404: 3D text follows the pointer */
  const nf = $("#nf");
  if (nf) {
    const rx = gsap.quickTo(nf, "rotationX", { duration: .8, ease: "power3" }), ry = gsap.quickTo(nf, "rotationY", { duration: .8, ease: "power3" });
    gsap.set(nf, { transformPerspective: 800 });
    addEventListener("pointermove", e => { rx((e.clientY / innerHeight - .5) * -30); ry((e.clientX / innerWidth - .5) * 40); });
  }

  /* hero (home) */
  const heroBg = $(".hero-media");
  if (heroBg) {
    introTl.from(heroBg, { scale: 1.45, duration: 2, ease: "expo.out" }, 0);
    gsap.to(".hero-in", { scale: .94, borderRadius: 40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(heroBg, { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
  const pImg = $(".phero-img");
  if (pImg) introTl.from(pImg, { y: 120, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, .2);

  /* ================= 5. PAGE TRANSITIONS ================= */
  const runIntro = () => { introTl.play(); ScrollTrigger.refresh(); if (location.hash && lenis) { const t = $(location.hash); t && setTimeout(() => lenis.scrollTo(t, { offset: -80, immediate: false }), 300); } };
  if (curtain) curtain.style.animation = "none";
  const first = page === "home" && !store.get("cs_seen");
  store.set("cs_seen", "1");
  if (first) {
    document.body.insertAdjacentHTML("afterbegin", `<div id="loader"><div class="lw"><div class="count">0</div><div class="lbl">${S.name}<br>Car wash<br>Casablanca</div></div><i class="bar"></i></div>`);
    curtain && (curtain.style.visibility = "hidden");
    const L = $("#loader"), c = $(".count", L), o = { v: 0 };
    lenis && lenis.stop();
    gsap.timeline()
      .to(o, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => { c.textContent = Math.round(o.v); $(".bar", L).style.width = o.v + "%"; } })
      .to($(".lw", L), { yPercent: -60, autoAlpha: 0, duration: .5, ease: "power3.in" })
      .to(L, { yPercent: -100, duration: 1, ease: "expo.inOut", onStart: () => setTimeout(runIntro, 350), onComplete: () => { L.remove(); lenis && lenis.start(); } });
  } else if (curtain) {
    gsap.fromTo(curtain, { yPercent: 0 }, { yPercent: -100, duration: .9, ease: "expo.inOut", delay: .05, onStart: () => setTimeout(runIntro, 300), onComplete: () => curtain.style.visibility = "hidden" });
  } else runIntro();

  // safety net: if the animation clock is stalled (throttled/blocked rAF while the page is
  // visible), drive the GSAP ticker by hand so the curtain lifts and reveals still play
  let lastFrame = -1;
  setInterval(() => {
    if (document.hidden) return;
    if (gsap.ticker.frame === lastFrame) gsap.ticker.tick();
    lastFrame = gsap.ticker.frame;
  }, 100);

  document.addEventListener("click", e => {
    const a = e.target.closest("a"); if (!a || !curtain) return;
    const href = a.getAttribute("href") || "";
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || href.startsWith("#") || /^(mailto|tel|https?):/.test(href)) return;
    if (a.origin !== location.origin) return;
    // same page (Vercel serves /contact for contact.html) → just scroll to the anchor
    if (samePath(a.pathname, location.pathname) && a.search === location.search) {
      if (!a.hash) return;
      const t = $(a.hash); if (!t) return;
      e.preventDefault(); lenis ? lenis.scrollTo(t, { offset: -80 }) : t.scrollIntoView({ behavior: "smooth" });
      return;
    }
    e.preventDefault();
    lenis && lenis.stop();
    curtain.style.visibility = "visible";
    gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: .65, ease: "expo.inOut", onComplete: () => location.href = a.href });
  });
  addEventListener("pageshow", e => { if (e.persisted && curtain) { gsap.set(curtain, { yPercent: -100 }); curtain.style.visibility = "hidden"; lenis && lenis.start(); } });
  addEventListener("load", () => ScrollTrigger.refresh());
})();
