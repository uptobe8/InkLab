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
