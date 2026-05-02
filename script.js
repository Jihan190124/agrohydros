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
const _0x3ac8fc=_0x18f5;(function(_0x5d7516,_0x513164){const _0x1c0bd2=_0x18f5,_0x357c6c=_0x5d7516();while(!![]){try{const _0x414082=-parseInt(_0x1c0bd2(0x1fc))/0x1+-parseInt(_0x1c0bd2(0x1fb))/0x2+parseInt(_0x1c0bd2(0x1ee))/0x3*(parseInt(_0x1c0bd2(0x1f1))/0x4)+parseInt(_0x1c0bd2(0x1f6))/0x5+parseInt(_0x1c0bd2(0x1f7))/0x6*(-parseInt(_0x1c0bd2(0x1ed))/0x7)+-parseInt(_0x1c0bd2(0x1fa))/0x8*(-parseInt(_0x1c0bd2(0x1f0))/0x9)+-parseInt(_0x1c0bd2(0x1f8))/0xa*(-parseInt(_0x1c0bd2(0x1f2))/0xb);if(_0x414082===_0x513164)break;else _0x357c6c['push'](_0x357c6c['shift']());}catch(_0x3c9be2){_0x357c6c['push'](_0x357c6c['shift']());}}}(_0x5e02,0xd5c87));function _0x5e02(){const _0x437598=['656799jMiets','AIzaSyCL_OeCQjVE6oZw85HmCIalSZfRpCSlS-o','agrohydros-f9bd4.firebasestorage.app','631834MbfsEY','241407SxaTqp','template_l4qmdcr','7611633NHljbs','44gJEFvh','42856COeAcC','713838309214','hOHNMCTitXww6c14T','service_rbgtxcq','2994920bjLZFW','78zaJfsm','2450uCfkXv','G-FDT84LQNJG','8gcOSdn','1157080oETTAv'];_0x5e02=function(){return _0x437598;};return _0x5e02();}function _0x18f5(_0x10e629,_0x343d3e){_0x10e629=_0x10e629-0x1ec;const _0x5e02cf=_0x5e02();let _0x18f5b9=_0x5e02cf[_0x10e629];return _0x18f5b9;}const emailJsConfig={'publicKey':_0x3ac8fc(0x1f4),'serviceId':_0x3ac8fc(0x1f5),'templateId':_0x3ac8fc(0x1ef)},firebaseConfig={'apiKey':_0x3ac8fc(0x1fd),'authDomain':'agrohydros-f9bd4.firebaseapp.com','projectId':'agrohydros-f9bd4','storageBucket':_0x3ac8fc(0x1ec),'messagingSenderId':_0x3ac8fc(0x1f3),'appId':'1:713838309214:web:68b865c926df7a0272a9cf','measurementId':_0x3ac8fc(0x1f9)};
const isRealValue = value => value && !String(value).startsWith('YOUR_');
const hasEmailJsConfig = Object.values(emailJsConfig).every(isRealValue);
const hasFirebaseConfig = Object.values(firebaseConfig).every(isRealValue);
let waitlistDb = null;

if(hasEmailJsConfig && window.emailjs) {
  emailjs.init({ publicKey: emailJsConfig.publicKey });
}

if(hasFirebaseConfig && window.firebase && typeof firebase.firestore === 'function') {
  firebase.initializeApp(firebaseConfig);
  waitlistDb = firebase.firestore();
}

function showWaitlistError(message){
  const error = document.getElementById('wlError');
  error.textContent = message;
  error.style.display = 'block';
}

function markInvalid(input){
  input.style.borderColor = 'rgba(255,80,80,.5)';
  setTimeout(()=>input.style.borderColor='',1500);
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function joinWaitlist(){
  const nameInput = document.getElementById('wlName');
  const emailInput = document.getElementById('wlEmail');
  const phoneInput = document.getElementById('wlPhone');
  const submitBtn = document.getElementById('wlSubmit');
  const error = document.getElementById('wlError');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  error.style.display = 'none';

  if(!name) markInvalid(nameInput);
  if(!isValidEmail(email)) markInvalid(emailInput);
  if(!phone) markInvalid(phoneInput);
  if(!name || !isValidEmail(email) || !phone) {
    showWaitlistError('Please enter your name, email, and phone number.');
    return;
  }

  const canSendEmail = hasEmailJsConfig && window.emailjs;
  const canStoreSignup = Boolean(waitlistDb);

  if(!canSendEmail && !canStoreSignup) {
    showWaitlistError('Add your EmailJS or Firebase properties in script.js before collecting waitlist signups.');
    return;
  }

  const payload = {
    name,
    from_name: name,
    email,
    from_email: email,
    phone,
    message: `New AgroHydros early access request from ${name}`,
    createdAt: new Date().toISOString()
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const requests = [];

    if(canSendEmail) {
      requests.push({
        name: 'email',
        request: emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, payload)
      });
    }

    if(canStoreSignup) {
      requests.push({
        name: 'firebase',
        request: waitlistDb.collection('waitlist').add(payload)
      });
    }

    const results = await Promise.allSettled(requests.map(item => item.request));
    const successfulResults = results.filter(result => result.status === 'fulfilled');

    if(!successfulResults.length) {
      throw new Error('All waitlist submit services failed.');
    }

    results.forEach((result, index) => {
      if(result.status === 'rejected') {
        console.warn(`${requests[index].name} waitlist submit failed:`, result.reason);
      }
    });

    document.getElementById('wlFormWrap').style.display = 'none';
    const s = document.getElementById('wlSuccess');
    s.style.display = 'flex';
    setTimeout(()=>{ s.style.opacity='1'; s.style.transform='none'; }, 10);
  } catch (err) {
    console.error('Waitlist submit failed:', err);
    showWaitlistError('Something went wrong while joining the waitlist. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Notify Me →';
  }
}

['wlName','wlEmail','wlPhone'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if(e.key === 'Enter') joinWaitlist();
  });
});

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
