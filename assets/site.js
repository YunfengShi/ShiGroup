/* Shared header, footer and page behaviors. Edit NAV to change the menu. */
(function () {
  const NAV = [
    ["index.html", "Home"],
    ["research.html", "Research"],
    ["people.html", "People"],
    ["publications.html", "Publications"],
    ["news.html", "News"],
    ["teaching.html", "Teaching"],
    ["join.html", "Join us"],
  ];
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const onHero = document.body.classList.contains("has-hero");

  const mark = `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="9" cy="10" r="5" fill="#c8102e"/><circle cx="21" cy="8" r="3.6" fill="currentColor" opacity=".55"/>
      <circle cx="23" cy="20" r="5" fill="currentColor" opacity=".85"/><circle cx="11" cy="23" r="3.6" fill="currentColor" opacity=".55"/>
      <path d="M9 10L21 8M21 8L23 20M23 20L11 23M11 23L9 10M9 10L23 20" stroke="currentColor" stroke-width="1.2" opacity=".35"/></svg>`;

  const header = document.createElement("header");
  header.className = "site-header" + (onHero ? " on-hero" : "");
  header.innerHTML = `<div class="wrap nav">
      <a class="brand" href="index.html">${mark}<span>Shi Group<small>Rensselaer · MSE</small></span></a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      <ul class="nav-links">${NAV.map(([h, t]) => `<li><a href="${h}"${h === here ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}</ul>
    </div>`;
  document.body.prepend(header);
  const tog = header.querySelector(".nav-toggle"), links = header.querySelector(".nav-links");
  tog.addEventListener("click", () => { const o = links.classList.toggle("open"); tog.setAttribute("aria-expanded", o); });

  if (onHero) {
    const hero = document.querySelector(".hero");
    const upd = () => header.classList.toggle("on-hero", hero.getBoundingClientRect().bottom > 70);
    addEventListener("scroll", upd, { passive: true }); upd();
  }

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="wrap">
    <div class="footer-grid">
      <div><a class="brand" href="index.html">${mark}<span>Shi Group</span></a>
        <p style="margin-top:14px;max-width:380px">Molecular simulation of materials. Department of Materials Science and Engineering, Rensselaer Polytechnic Institute, Troy, NY.</p></div>
      <div><h5>Explore</h5><ul>${NAV.slice(1, 5).map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h5>Connect</h5><ul>
        <li><a href="join.html">Prospective students</a></li>
        <li><a href="https://mse.rpi.edu" target="_blank" rel="noopener">RPI MSE</a></li>
        <li><a href="teaching.html">Courses</a></li></ul></div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Shi Research Group, Rensselaer Polytechnic Institute</span><span>Troy, New York</span></div>
  </div>`;
  document.body.append(footer);

  // Reveal on scroll
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }) : null;
  window.observeReveal = (root) => (root || document).querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  observeReveal();
})();

/* ---------- Helpers used by pages ---------- */
window.Site = {
  fmtDate(d) {
    const [y, m] = d.split("-");
    const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m ? `${M[+m - 1]} ${y}` : y;
  },
  initials(n) { return n.replace(/\(.*?\)/g, "").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join(""); },
  avatar(p) { return `<div class="avatar">${p.photo ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">` : Site.initials(p.name)}</div>`; },
  boldPI(a) { return a.replace(/(Yunfeng Shi|Y\.\s?F\.\s?Shi|YF Shi|Y\. Shi|Y Shi)(<sup>\*<\/sup>)?/g, "<b>$1$2</b>"); },
  newsItem(n) {
    return `<li class="news-item reveal"><span class="news-date">${Site.fmtDate(n.date)}</span><span class="tag ${n.tag}">${n.tag}</span><span class="news-text">${n.text}</span></li>`;
  },
  paperLink(p) { return p.url || `https://scholar.google.com/scholar?q=${encodeURIComponent('"' + p.title + '"')}`; },
};

/* ---------- Hero: live MD of a binary Lennard-Jones mixture; the cursor is a local heater ----------
   ~500 A + ~500 B particles, number density 0.2, T adjustable (default 0.2), Langevin thermostat, periodic box.
   A-B: eps 1.0, sigma 1.0, rc 1.5   A-A and B-B: eps 0.2, sigma adjustable (default 1.5), rc = 1.12 sigma (cutoffs in absolute units).
   Unlike pairs bind strongly, so A-B networks and clusters self-assemble; heat melts them locally. */
window.startHero = function (canvas) {
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RHO = 0.2, GAMMA = 1.0, dt = 0.004, FMAX = 200;
  // pair index p = typ[i] + typ[j]: 0 = AA, 1 = AB, 2 = BB
  let T0 = 0.2;
  window.heroSetTemperature = t => { T0 = t; };
  const EPS = [0.2, 1.0, 0.2], SIG = [1.5, 1.0, 1.5], RCUT = [1.68, 1.5, 1.68];
  let rc2 = [], s2 = [], e4 = EPS.map(e => 4 * e), CELL = 1.68;
  function setLikeSigma(sig) {             // A-A and B-B sigma; cutoff always 1.12 sigma
    SIG[0] = SIG[2] = sig; RCUT[0] = RCUT[2] = 1.12 * sig;
    rc2 = RCUT.map(r => r * r); s2 = SIG.map(q => q * q); CELL = Math.max(...RCUT);
  }
  setLikeSigma(1.5);
  window.heroSetLikeSigma = setLikeSigma;
  const HEAT_R = 7, HEAT_T = 3.0;
  let W, H, S, dpr, Lx, Ly, N, x, y, vx, vy, fx, fy, typ, ke;
  let heater = null;

  function init() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    N = W < 700 ? 600 : 1000;                           // ~500 of each species on desktop
    const area = N / RHO;
    Lx = Math.sqrt(area * W / H); Ly = area / Lx; S = W / Lx;
    x = new Float32Array(N); y = new Float32Array(N); vx = new Float32Array(N); vy = new Float32Array(N);
    fx = new Float32Array(N); fy = new Float32Array(N); typ = new Uint8Array(N); ke = new Float32Array(N);
    // random, non-overlapping placement
    let k = 0, tries = 0;
    while (k < N && tries < 200000) {
      tries++;
      const px = Math.random() * Lx, py = Math.random() * Ly;
      let ok = true;
      for (let j = 0; j < k; j++) {
        let dx = x[j] - px, dy = y[j] - py;
        dx -= Lx * Math.round(dx / Lx); dy -= Ly * Math.round(dy / Ly);
        if (dx * dx + dy * dy < 1.4 * 1.4) { ok = false; break; }
      }
      if (!ok) continue;
      x[k] = px; y[k] = py; typ[k] = k % 2;
      const s = Math.sqrt(T0); vx[k] = s * gauss(); vy[k] = s * gauss(); k++;
    }
    N = k;
    forces();
  }

  function gauss() { let u = 0; for (let i = 0; i < 6; i++) u += Math.random(); return (u - 3) * Math.SQRT2; }

  function forces() {
    fx.fill(0); fy.fill(0);
    const gx = Math.max(3, Math.floor(Lx / CELL)), gy = Math.max(3, Math.floor(Ly / CELL));
    const cw = Lx / gx, ch = Ly / gy, head = new Int32Array(gx * gy).fill(-1), next = new Int32Array(N);
    for (let i = 0; i < N; i++) {
      const cx = Math.min(gx - 1, (x[i] / cw) | 0), cy = Math.min(gy - 1, (y[i] / ch) | 0), c = cy * gx + cx;
      next[i] = head[c]; head[c] = i;
    }
    for (let cy = 0; cy < gy; cy++) for (let cx = 0; cx < gx; cx++) {
      for (let i = head[cy * gx + cx]; i >= 0; i = next[i]) {
        for (let n = 0; n < 5; n++) {               // half shell: self, E, NW, N, NE
          const ox = [0, 1, -1, 0, 1][n], oy = [0, 0, 1, 1, 1][n];
          const c = ((cy + oy) % gy) * gx + (cx + ox + gx) % gx;
          for (let j = n === 0 ? next[i] : head[c]; j >= 0; j = next[j]) {
            let dx = x[j] - x[i], dy = y[j] - y[i];
            dx -= Lx * Math.round(dx / Lx); dy -= Ly * Math.round(dy / Ly);
            const r2 = dx * dx + dy * dy, p = typ[i] + typ[j];
            if (r2 >= rc2[p] || r2 < 1e-6) continue;
            const q = s2[p] / r2, q6 = q * q * q;
            let f = e4[p] * (12 * q6 * q6 - 6 * q6) / r2;
            if (f > FMAX) f = FMAX;
            fx[i] -= f * dx; fy[i] -= f * dy; fx[j] += f * dx; fy[j] += f * dy;
          }
        }
      }
    }
  }

  function step() {
    const c1 = Math.exp(-GAMMA * dt);
    for (let i = 0; i < N; i++) {
      vx[i] += 0.5 * dt * fx[i]; vy[i] += 0.5 * dt * fy[i];
      x[i] += dt * vx[i]; y[i] += dt * vy[i];
      if (x[i] < 0) x[i] += Lx; else if (x[i] >= Lx) x[i] -= Lx;
      if (y[i] < 0) y[i] += Ly; else if (y[i] >= Ly) y[i] -= Ly;
    }
    forces();
    for (let i = 0; i < N; i++) {
      vx[i] += 0.5 * dt * fx[i]; vy[i] += 0.5 * dt * fy[i];
      let T = T0;
      if (heater) {                                   // local heater: Langevin bath hotter near the cursor
        let dx = x[i] - heater.x, dy = y[i] - heater.y;
        dx -= Lx * Math.round(dx / Lx); dy -= Ly * Math.round(dy / Ly);
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < HEAT_R) { const u = 1 - r / HEAT_R; T = T0 + HEAT_T * u * u; }
      }
      const c2 = Math.sqrt((1 - c1 * c1) * T);
      vx[i] = c1 * vx[i] + c2 * gauss(); vy[i] = c1 * vy[i] + c2 * gauss();
      ke[i] = 0.9 * ke[i] + 0.1 * 0.5 * (vx[i] * vx[i] + vy[i] * vy[i]);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // A-B bonds
    ctx.lineWidth = 3.2; ctx.strokeStyle = "rgba(170,185,210,0.5)"; ctx.beginPath();
    const gx = Math.max(3, Math.floor(Lx / 1.3)), gy = Math.max(3, Math.floor(Ly / 1.3));
    const cw = Lx / gx, ch = Ly / gy, head = new Int32Array(gx * gy).fill(-1), next = new Int32Array(N);
    for (let i = 0; i < N; i++) { const c = Math.min(gy - 1, (y[i] / ch) | 0) * gx + Math.min(gx - 1, (x[i] / cw) | 0); next[i] = head[c]; head[c] = i; }
    for (let i = 0; i < N; i++) {
      if (typ[i]) continue;
      const cx = Math.min(gx - 1, (x[i] / cw) | 0), cy = Math.min(gy - 1, (y[i] / ch) | 0);
      for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
        for (let j = head[((cy + oy + gy) % gy) * gx + (cx + ox + gx) % gx]; j >= 0; j = next[j]) {
          if (!typ[j]) continue;
          let dx = x[j] - x[i], dy = y[j] - y[i];
          dx -= Lx * Math.round(dx / Lx); dy -= Ly * Math.round(dy / Ly);
          if (dx * dx + dy * dy < 1.69) { ctx.moveTo(x[i] * S, y[i] * S); ctx.lineTo((x[i] + dx) * S, (y[i] + dy) * S); }
        }
      }
    }
    ctx.stroke();
    // particles: A blue, B red; hot particles glow toward white-gold
    for (let i = 0; i < N; i++) {
      const h = Math.min(1, Math.max(0, (ke[i] - T0 - 0.3) / 1.5));
      const base = typ[i] ? [214, 60, 76] : [70, 120, 200];
      const r = base[0] + (255 - base[0]) * h, g = base[1] + (210 - base[1]) * h, b = base[2] + (120 - base[2]) * h;
      ctx.beginPath(); ctx.arc(x[i] * S, y[i] * S, (typ[i] ? 0.42 : 0.42) * S, 0, 6.2832);
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.8 + 0.2 * h})`; ctx.fill();
    }
    if (heater) {
      const g = ctx.createRadialGradient(heater.x * S, heater.y * S, 0, heater.x * S, heater.y * S, HEAT_R * S);
      g.addColorStop(0, "rgba(255,170,60,0.18)"); g.addColorStop(1, "rgba(255,170,60,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(heater.x * S, heater.y * S, HEAT_R * S, 0, 6.2832); ctx.fill();
    }
  }

  let raf;
  function loop() { for (let s = 0; s < 8; s++) step(); draw(); raf = requestAnimationFrame(loop); }
  init();
  // let A-B networks start forming before the first frame
  for (let s = 0; s < 1500; s++) step();
  if (reduce) draw();
  else {
    raf = requestAnimationFrame(loop);
    new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(loop); }).observe(canvas);
  }
  const host = canvas.parentElement;
  const move = (cx, cy) => { const b = canvas.getBoundingClientRect(); heater = { x: (cx - b.left) / S, y: (cy - b.top) / S }; if (reduce) { step(); draw(); } };
  host.addEventListener("pointermove", e => { if (e.target.closest(".hero-ctrl")) { heater = null; return; } move(e.clientX, e.clientY); });
  host.addEventListener("pointerleave", () => { heater = null; });
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (Math.abs(canvas.clientWidth - W) > 40) { init(); for (let s = 0; s < 200; s++) step(); draw(); } }, 250); });
};
