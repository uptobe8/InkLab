(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var carouselSelectors = ['.grid-3','.grid-4','.ux-card-grid','.ux-steps','.editorial-strip','.process-final','.review-grid','.reviews-grid','.nav-index-grid','.home-choice-black-grid','.home-choice-grid','.surface-card-grid','.surface-steps','.surface-gallery','.google-reviews','.review-track','.ux-gallery'];
    carouselSelectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        if(el.children.length > 1){
          el.setAttribute('data-mobile-carousel','true');
          el.setAttribute('tabindex','0');
        }
      });
    });
    var toggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
    var nav = document.querySelector('.header .nav');
    if(nav){
      nav.querySelectorAll('a[href]').forEach(function(a){
        a.addEventListener('click', function(){ if(toggle) toggle.checked = false; }, false);
        a.addEventListener('touchend', function(){ if(toggle) toggle.checked = false; }, {passive:true});
      });
    }
  });
})();
