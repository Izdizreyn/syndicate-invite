// Swap this when the Discord invite is regenerated
const INVITE_URL = "https://discord.gg/25WjHmh7ZU";
const $ = (id) => document.getElementById(id);
$("link").setAttribute("href", INVITE_URL);
$("linkText").textContent = INVITE_URL;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fx = $("fx"),
  card = $("card");

function smokeAt(x, y, n, spread) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    p.className = "puff";
    const s = 40 + Math.random() * 70,
      a = Math.random() * 6.283,
      d = spread * (0.4 + Math.random() * 0.8);
    p.style.cssText = `width:${s}px;height:${s}px;left:${x - s / 2}px;top:${y - s / 2}px`;
    fx.appendChild(p);
    p.animate(
      [
        { transform: "translate(0,0) scale(.3)", opacity: 0.9 },
        {
          transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d * 0.6}px) scale(2.8)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 700,
        easing: "ease-out",
        fill: "forwards",
      },
    ).onfinish = () => p.remove();
  }
}
function smokeCard() {
  const r = card.getBoundingClientRect();
  for (let i = 0; i < 22; i++)
    smokeAt(
      r.left + Math.random() * r.width,
      r.top + Math.random() * r.height,
      1,
      90,
    );
  for (let i = 0; i < 8; i++)
    smokeAt(r.left + r.width / 2, r.top + r.height * 0.3, 1, r.width * 0.5);
}
function shake(px = 6) {
  card.animate(
    [
      { transform: "translate(0,0)" },
      { transform: `translate(${px}px,${px}px)` },
      { transform: `translate(-${px}px,${-px / 2}px)` },
      { transform: `translate(${px / 2}px,0)` },
      { transform: "none" },
    ],
    { duration: 220 },
  );
}

async function run() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  await wait(500);
  // 1. all gray text + shapes slam down together
  const g = $("gray");
  await g.animate(
    [
      { transform: "scale(2.6)", opacity: 0, filter: "blur(10px)" },
      {
        transform: "scale(1.5)",
        opacity: 0.7,
        filter: "blur(4px)",
        offset: 0.65,
      },
      { transform: "scale(1)", opacity: 1, filter: "blur(0)" },
    ],
    { duration: 650, easing: "cubic-bezier(.55,0,1,.4)", fill: "forwards" },
  ).finished;
  g.style.opacity = 1;
  shake(8);
  smokeCard();
  await wait(900);
  // 2. link eases in
  const l = $("link");
  await l.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1100,
    easing: "ease-in",
    fill: "forwards",
  }).finished;
  l.style.opacity = 1;
  // 3. seal stamps first
  const seal = $("seal");
  await seal.animate(
    [
      { transform: "scale(3.4) rotate(-25deg)", opacity: 0 },
      { transform: "scale(1.06) rotate(4deg)", opacity: 1, offset: 0.75 },
      { transform: "scale(.93)", opacity: 1, offset: 0.88 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 650, easing: "cubic-bezier(.6,0,1,.5)", fill: "forwards" },
  ).finished;
  seal.style.opacity = 1;
  shake(7);
  const r = seal.getBoundingClientRect();
  smokeAt(r.left + r.width / 2, r.top + r.height / 2, 9, 110);
  await wait(700);
  // 4. TOP SECRET floats big/small
  const s = $("secret");
  s.style.opacity = 1;
  await s.animate(
    [
      { transform: "scale(.3)", opacity: 0 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 600, easing: "ease-out" },
  ).finished;
  s.animate(
    [
      { transform: "scale(.88)" },
      { transform: "scale(1.22)" },
      { transform: "scale(.88)" },
    ],
    { duration: 3200, iterations: Infinity, easing: "ease-in-out" },
  );
  // 5. link clickable
  l.classList.add("live");
}
run();
