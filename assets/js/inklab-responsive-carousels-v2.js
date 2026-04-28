(function(){
  'use strict';

  var candidates = [
    '.grid-3',
    '.grid-4',
    '.surface-card-grid',
    '.surface-steps',
    '.surface-gallery',
    '.ux-card-grid',
    '.ux-steps',
    '.ux-gallery',
    '.reviews-grid',
    '.review-grid',
    '.review-track',
    '.editorial-strip',
    '.process-final',
    '.gallery-final',
    '.nav-index-grid',
    '.home-choice-black-grid',
    '.home-choice-grid',
    '.artist-grid',
    '.treatment-grid'
  ];

  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function isCandidate(el){
    if(!el || el.dataset.inklabResponsiveReady === 'true') return false;
    if(el.closest('.nav, .dropdown-menu, .topbar, .header, .footer')) return false;
    var children = Array.prototype.filter.call(el.children, function(child){
      var tag = child.tagName ? child.tagName.toLowerCase() : '';
      return tag !== 'script' && tag !== 'style' && tag !== 'template';
    });
    return children.length > 1;
  }

  function makeControls(track){
    if(track.nextElementSibling && track.nextElementSibling.classList && track.nextElementSibling.classList.contains('inklab-carousel-controls')) return;

    var controls = document.createElement('div');
    controls.className = 'inklab-carousel-controls';
    controls.setAttribute('aria-hidden','false');

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.setAttribute('aria-label','Anterior');
    prev.textContent = '←';

    var next = document.createElement('button');
    next.type = 'button';
    next.setAttribute('aria-label','Siguiente');
    next.textContent = '→';

    function move(direction){
      var amount = Math.max(track.clientWidth * 0.86, 260) * direction;
      track.scrollBy({ left: amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', function(){ move(-1); });
    next.addEventListener('click', function(){ move(1); });

    controls.appendChild(prev);
    controls.appendChild(next);
    track.insertAdjacentElement('afterend', controls);
  }

  function enhance(){
    var nodes = document.querySelectorAll(candidates.join(','));
    Array.prototype.forEach.call(nodes, function(el){
      if(!isCandidate(el)) return;
      el.classList.add('inklab-r-carousel');
      el.dataset.inklabResponsiveReady = 'true';
      if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
      if(!el.hasAttribute('aria-label')) el.setAttribute('aria-label','Carrusel de contenido');
      makeControls(el);
    });
  }

  ready(function(){
    enhance();
    window.addEventListener('resize', function(){
      window.clearTimeout(window.__inklabResponsiveResizeTimer);
      window.__inklabResponsiveResizeTimer = window.setTimeout(enhance, 120);
    }, { passive:true });
  });
})();
