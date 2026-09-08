// VeriSlí — minimal site JS
// Handles: mobile nav open/close, closing the mobile menu after a link tap,
// and keeping only one FAQ answer open at a time.
// The FAQ accordion uses native <details>/<summary>, so it stays fully
// keyboard-accessible and works even if this script fails to load — the
// only thing JS adds here is closing sibling answers for a tidier page.

(function () {
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var iconOpen = document.getElementById('navIconOpen');
  var iconClose = document.getElementById('navIconClose');

  if (navToggle && mobileNav) {
    function closeMenu() {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (iconOpen) iconOpen.style.display = '';
      if (iconClose) iconClose.style.display = 'none';
    }

    function toggleMenu() {
      var isOpen = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (iconOpen) iconOpen.style.display = isOpen ? 'none' : '';
      if (iconClose) iconClose.style.display = isOpen ? '' : 'none';
    }

    navToggle.addEventListener('click', toggleMenu);

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Exclusive FAQ accordion: opening one answer closes the others.
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();
