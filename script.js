(function(){
  const canvas = document.getElementById('particles');
  const W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  const ctx = canvas.getContext('2d');
  const particles = [];
  for(let i=0;i<35;i++) particles.push({
    x: Math.random()*W, y: Math.random()*H+H,
    r: Math.random()*1.5+0.3,
    speed: Math.random()*0.4+0.15,
    opacity: Math.random()*0.35+0.05,
    color: Math.random()>.5 ? '#00FFB2' : '#00D4FF'
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.y -= p.speed;
      if(p.y < -10) { p.y = H+10; p.x = Math.random()*W; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── Scroll reveal ─── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ─── Live data ticker ─── */
function r(base, range) { return (base + (Math.random()-.5)*range).toFixed(1); }
function ri(base, range) { return Math.round(base + (Math.random()-.5)*range); }
setInterval(()=>{
  const m = r(67,5);
  document.getElementById('d-moisture').textContent = m + '%';
  document.getElementById('d-mbar').style.width = m + '%';
  document.getElementById('d-temp').textContent = r(24,2) + '°C';
  document.getElementById('d-hum').textContent = ri(58,6) + '%';
  document.getElementById('d-aqi').textContent = ri(38,10);
  document.getElementById('d-pm').textContent = ri(9,4) + ' µg/m³';
}, 3000);

/* ─── Dashboard time ─── */
function updateTime(){
  const now = new Date();
  document.getElementById('dashTime').textContent =
    now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) + ' · Live';
}
setInterval(updateTime, 1000); updateTime();

/* ─── Countdown timer (90 days from now) ─── */
const launch = new Date(Date.now() + 90*24*60*60*1000);
function updateCountdown(){
  const diff = launch - Date.now();
  const d = Math.floor(diff/864e5);
  const h = Math.floor((diff%864e5)/36e5);
  const m = Math.floor((diff%36e5)/6e4);
  const s = Math.floor((diff%6e4)/1e3);
  document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000); updateCountdown();

/* ─── Waitlist submit ─── */
function joinWaitlist(){
  const email = document.getElementById('wlEmail').value.trim();
  if(!email || !email.includes('@')){ 
    document.getElementById('wlEmail').style.borderColor = 'rgba(255,80,80,.5)';
    setTimeout(()=>document.getElementById('wlEmail').style.borderColor='',1500);
    return;
  }
  document.getElementById('wlFormWrap').style.display = 'none';
  const s = document.getElementById('wlSuccess');
  s.style.display = 'flex';
  setTimeout(()=>{ s.style.opacity='1'; s.style.transform='none'; }, 10);
}
document.getElementById('wlEmail').addEventListener('keydown', e => { if(e.key==='Enter') joinWaitlist(); });

/* ─── Mobile menu ─── */
function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('open');
}
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', ()=>{
  document.getElementById('mobileMenu').classList.remove('open');
}));

/* ─── Parallax on hero ─── */
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  const rings = document.querySelectorAll('.hero-ring');
  rings.forEach((r,i) => {
    r.style.transform = `translate(-50%,-50%) translateY(${y*(i===0?.08:.04)}px) rotate(${y*.02}deg)`;
  });
});