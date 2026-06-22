
const btn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav-links');if(btn&&nav){btn.addEventListener('click',()=>nav.classList.toggle('open'));}const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
