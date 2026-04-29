(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.header .nav');
    if(!nav) return;
    nav.querySelectorAll('a[href]').forEach(function(a){
      a.addEventListener('click', function(){ if(toggle) toggle.checked = false; }, false);
    });
    document.querySelectorAll('.nav-dd').forEach(function(d){
      d.addEventListener('toggle', function(){
        if(!d.open) return;
        if(window.matchMedia('(min-width:981px)').matches){
          document.querySelectorAll('.nav-dd').forEach(function(o){ if(o!==d) o.removeAttribute('open'); });
        }
      });
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && toggle) toggle.checked = false; });
  });
})();

/* === INK LAB V15 MOBILE CAROUSELS + NAV HARDENING === */
(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var selectors = [
      '.mobile-carousel',
      '.surface-card-grid',
      '.surface-steps',
      '.surface-gallery',
      '.editorial-strip',
      '.process-final',
      '.gallery-final',
      '.review-track',
      '.ux-card-grid',
      '.ux-steps',
      '.ux-gallery',
      '.grid-3',
      '.grid-4',
      '.nav-index-grid',
      '.home-choice-grid',
      '.home-choice-black-grid',
      '.faq-final'
    ];
    var seen = new Set();
    var carousels = Array.prototype.slice.call(document.querySelectorAll(selectors.join(','))).filter(function(el){
      if(seen.has(el) || el.children.length < 2 || el.closest('.nav') || el.closest('.dropdown-menu')) return false;
      seen.add(el);
      return true;
    });
    carousels.forEach(function(el, idx){
      el.classList.add('m-carousel-2026');
      if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
      if(!el.hasAttribute('role')) el.setAttribute('role','region');
      if(!el.hasAttribute('aria-label')) el.setAttribute('aria-label','Carrusel de contenido ' + (idx + 1));
      el.setAttribute('aria-roledescription','carrusel');
      Array.prototype.forEach.call(el.children, function(child){ child.setAttribute('data-carousel-item','true'); });
      if(!el.nextElementSibling || !el.nextElementSibling.classList || !el.nextElementSibling.classList.contains('mobile-carousel-controls')){
        var controls = document.createElement('div');
        controls.className = 'mobile-carousel-controls';
        var prev = document.createElement('button');
        var next = document.createElement('button');
        prev.type = 'button'; next.type = 'button';
        prev.setAttribute('aria-label','Ver elemento anterior');
        next.setAttribute('aria-label','Ver elemento siguiente');
        prev.innerHTML = '‹'; next.innerHTML = '›';
        controls.appendChild(prev); controls.appendChild(next);
        el.insertAdjacentElement('afterend', controls);
        function amount(){ return Math.max(260, Math.floor(el.clientWidth * 0.86)); }
        prev.addEventListener('click', function(){ el.scrollBy({left:-amount(), behavior:'smooth'}); });
        next.addEventListener('click', function(){ el.scrollBy({left: amount(), behavior:'smooth'}); });
        function update(){
          var max = el.scrollWidth - el.clientWidth - 4;
          prev.disabled = el.scrollLeft <= 4;
          next.disabled = el.scrollLeft >= max;
        }
        el.addEventListener('scroll', function(){ window.requestAnimationFrame(update); }, {passive:true});
        window.addEventListener('resize', update, {passive:true});
        update();
      }
      el.addEventListener('keydown', function(e){
        if(e.key === 'ArrowRight'){ e.preventDefault(); el.scrollBy({left:Math.max(260, el.clientWidth*.86), behavior:'smooth'}); }
        if(e.key === 'ArrowLeft'){ e.preventDefault(); el.scrollBy({left:-Math.max(260, el.clientWidth*.86), behavior:'smooth'}); }
      });
    });

    document.querySelectorAll('img').forEach(function(img, i){
      if(!img.hasAttribute('loading') && !img.closest('.hero,.page-hero,.surface-hero')) img.setAttribute('loading','lazy');
      if(!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
      if(!img.hasAttribute('alt')) img.setAttribute('alt','');
    });

    var toggle = document.querySelector('.nav-toggle');
    if(toggle){
      document.querySelectorAll('.header .nav a[href]').forEach(function(a){
        a.addEventListener('click', function(){ toggle.checked = false; }, false);
      });
      toggle.addEventListener('change', function(){ document.documentElement.classList.toggle('mobile-nav-open', !!toggle.checked); });
    }
  });
})();
/* === END INK LAB V15 === */
