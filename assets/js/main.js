document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{const t=document.querySelector('#nav-toggle'); if(t) t.checked=false;}));

document.querySelectorAll('.ux-accordion-item > button').forEach(btn=>{btn.addEventListener('click',()=>{btn.parentElement.classList.toggle('is-open')})});
