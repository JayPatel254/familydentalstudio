"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../components/Scene";

const WA = "919033731482";
const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const MAPQ = "Family Dental Studio, Atlanta Business Hub, Vesu, Surat";

const services = [
  { t: "Root canal treatment", d: "Gentle, advanced root canals that save your natural tooth and end the pain, often with a hassle-free single visit feel." },
  { t: "Smile designing and restorative care", d: "Fillings, cosmetic corrections, cleaning and extractions, planned around how your smile should look and feel." },
  { t: "Dentures and implants", d: "Fixed and removable dentures and dental implants, backed by Dr. Mayuri's OSSTEM implant master course." },
];
const reviews = [
  ["Jyoti Goyal", "It was my first time at a dentist and I was scared, but Dr Mayuri made it such a pleasant experience. So genuine with her patients. Thank you for the root canal and cleaning."],
  ["Hemali Dharmaj", "Brilliant doctor, cooperative and apt with her work. Root canal, fillings and scaling, and she explained everything. The whole procedure was very smooth."],
  ["Dimple Jain", "I took my 6 year old to Dr. Mayuri and he was so comfortable with her. She treated him so well."],
  ["Anmol Jain", "A really smooth experience with my root canal treatment. Would recommend it to everyone looking for oral and dental care."],
  ["himmat jain", "I had pain in my teeth for 5 days. Dr Mayuri did my treatment really well and smoothly. I recommend her for any dental problem."],
  ["khyati jain", "Quality treatment with up to the mark advice. I would choose you over anyone for dental advice and treatment."],
];
const hours = [["Monday to Saturday", "10:00 AM to 1:30 PM"], ["", "4:30 PM to 7:30 PM"], ["Sunday", "Closed"]];

function Compare() {
  const [v, setV] = useState(50);
  return (
    <div className="ba" style={{ "--v": v + "%" }}>
      <div className="ba-i b" /><div className="ba-i a" />
      <span className="tag l">Before</span><span className="tag r">After</span>
      <div className="knob"><i /></div>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label="Drag to compare before and after scaling" />
    </div>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".h1 i", { yPercent: 115, duration: 1.2, stagger: 0.08 })
        .from(".hero-sub > *", { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7");
      gsap.utils.toArray(".num").forEach((el) => {
        const n = +el.dataset.n;
        gsap.from(el, { textContent: 0, duration: 2, ease: "power1.out", snap: { textContent: n % 1 ? 0.1 : 1 }, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray(".unveil").forEach((el) =>
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 80%" } }));
      gsap.utils.toArray(".par").forEach((el) =>
        gsap.to(el, { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, scrub: true } }));
    });
    return () => ctx.revert();
  }, []);

  const tilt = (e) => { const r = e.currentTarget.getBoundingClientRect(); gsap.to(e.currentTarget, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, transformPerspective: 900, duration: 0.4 }); };
  const flat = (e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6 });
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    window.open(wa(`Hello Family Dental Studio, I'm ${f.get("n")} (${f.get("p")}). I'd like to book: ${f.get("s")}. ${f.get("m") || ""}`), "_blank");
    setSent(true);
  };
  const words = (s) => s.split(" ").map((w, i) => <span className="w" key={i}><i>{w}&nbsp;</i></span>);

  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand"><img src="/img/logo.jpg" alt="Family Dental Studio logo" /><span>Family Dental Studio</span></a>
        <nav><a href="#about">Doctor</a><a href="#services">Treatments</a><a href="#results">Results</a><a href="#reviews">Reviews</a><a href="#visit" className="btn sm">Book a visit</a></nav>
      </header>

      <section className="hero" id="top">
        <Scene />
        <div className="hero-in">
          <h1 className="h1">{words("Smiles made gently, for the whole family.")}</h1>
          <div className="hero-sub">
            <p>Family Dental Studio in Vesu, Surat. Root canals, smile designing, dentures and implants with Dr. Mayuri Jain.</p>
            <div className="row">
              <a className="btn" href={wa("Hello, I'd like to book an appointment at Family Dental Studio.")} target="_blank" rel="noreferrer">Book on WhatsApp</a>
              <a className="btn ghost" href="tel:+919033731482">Call +91 90337 31482</a>
            </div>
            <p className="rate">Rated 4.9 out of 5 by 68+ patients on Google</p>
          </div>
        </div>
      </section>

      <section className="stats">
        {[["9", "+", "years of clinical experience"], ["4.9", "", "average Google rating"], ["68", "+", "patient reviews"]].map(([n, s, l]) => (
          <div key={l}><b><span className="num" data-n={n}>{n}</span>{s}</b><p>{l}</p></div>
        ))}
      </section>

      <section className="about" id="about">
        <div className="unveil ph"><img className="par" src="/img/doctor.jpg" alt="Dr. Mayuri Jain at the clinic" /></div>
        <div>
          <h2>Meet Dr. Mayuri Jain</h2>
          <p>Dr. Mayuri holds a BDS from Rajiv Gandhi University and has treated patients for over 9 years. Patients describe her the same way: she explains every step, and nervous first-timers leave relaxed.</p>
          <p>She keeps training. In 2022 and 2023 she completed the professional OSSTEM implant master course in Surat.</p>
          <figure className="cert"><img src="/img/cert.jpg" alt="Dr. Mayuri Jain receiving her OSSTEM master course certificate" /><figcaption>OSSTEM implant master course, Surat</figcaption></figure>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Treatments</h2>
        <div className="grid3">
          {services.map((s) => (
            <article key={s.t} className="card" onMouseMove={tilt} onMouseLeave={flat}><h3>{s.t}</h3><p>{s.d}</p>
              <a href={wa(`Hello, I'd like to ask about ${s.t}.`)} target="_blank" rel="noreferrer">Ask about this on WhatsApp</a></article>
          ))}
        </div>
      </section>

      <section className="results" id="results">
        <h2>Real patient results</h2>
        <p className="lead">Drag the handle to compare a professional cleaning, then see a smile restored by Dr. Mayuri.</p>
        <div className="res-grid">
          <Compare />
          <figure><img src="/img/smile.jpg" alt="Before and after smile treatment by Dr. Mayuri Jain" /></figure>
        </div>
      </section>

      <section className="studio">
        <div className="vid"><video src="/studio.mp4" autoPlay muted loop playsInline controls /></div>
        <div>
          <h2>A calm clinic, even for children</h2>
          <p>Bright, clean and unhurried. Parents tell us their kids feel at ease in Dr. Mayuri's chair, and the thumbs-up at the end says the rest.</p>
          <img className="kid" src="/img/kid.jpg" alt="A young patient giving a thumbs up in the dental chair" />
        </div>
      </section>

      <section className="camp">
        <div><h2>Dentistry in the community</h2><p>The team also takes check-ups out to residential buildings, so neighbours and elders can be seen close to home.</p></div>
        <img src="/img/camp1.jpg" alt="Dental check-up camp in a residential lobby" /><img src="/img/camp2.jpg" alt="Dentists speaking with residents at a check-up camp" />
      </section>

      <section className="reviews" id="reviews">
        <h2>What patients say</h2>
        <div className="rv">{reviews.map(([n, t]) => (<blockquote key={n}><p>{t}</p><cite>{n}, Google review</cite></blockquote>))}</div>
      </section>

      <section className="visit" id="visit">
        <div>
          <h2>Book your visit</h2>
          <form onSubmit={submit}>
            <input name="n" placeholder="Your name" required autoComplete="name" />
            <input name="p" placeholder="Phone number" required type="tel" autoComplete="tel" />
            <select name="s" defaultValue="Check-up and consultation">
              <option>Check-up and consultation</option><option>Root canal treatment</option><option>Fillings or smile designing</option><option>Dentures or implants</option><option>Teeth cleaning</option><option>Child dentistry</option>
            </select>
            <textarea name="m" rows="3" placeholder="Anything we should know? (optional)" />
            <button className="btn" type="submit">Send on WhatsApp</button>
            {sent && <p className="ok">WhatsApp opened with your message. Send it there and we will reply to confirm your slot.</p>}
          </form>
          <dl className="hours">{hours.map(([d, h], i) => (<div key={i}><dt>{d}</dt><dd>{h}</dd></div>))}</dl>
          <address>G-19, Atlanta Business Hub, opposite Ofira Posh, near Rajhans Zion, Vesu canal road, Surat<br /><a href="tel:+919033731482">+91 90337 31482</a> · <a href="https://www.instagram.com/familydentalstudio_surat/" target="_blank" rel="noreferrer">Instagram</a></address>
        </div>
        <div className="map">
          <iframe title="Family Dental Studio on Google Maps" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(MAPQ)}&output=embed`} />
          <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPQ)}`} target="_blank" rel="noreferrer">Get directions</a>
        </div>
      </section>

      <footer><img src="/img/logo.jpg" alt="" /><p>Family Dental Studio. We are the smile makers.</p></footer>
      <a className="fab" href={wa("Hello, I'd like to book an appointment.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">Chat</a>
    </main>
  );
}
