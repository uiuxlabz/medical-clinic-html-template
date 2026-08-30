/* ============================================================
   MEDINOVA — main.js
   Burger toggle, active nav, data-year, IntersectionObserver,
   data-form, prefers-reduced-motion
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     1. DOM READY
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initBurger();
    initActiveNav();
    initYearStamp();
    initRevealAnimations();
    initForms();
    initBackToTop();
    initHeaderScroll();
  }

  /* --------------------------------------------------------
     2. BURGER / MOBILE NAV
     -------------------------------------------------------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.nav');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close nav on link click (mobile)
    var navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------
     3. ACTIVE NAV LINK
     -------------------------------------------------------- */
  function initActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPath = href.split('/').pop();

      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------
     4. DATA-YEAR — auto-fill current year
     -------------------------------------------------------- */
  function initYearStamp() {
    var yearEls = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* --------------------------------------------------------
     5. INTERSECTION OBSERVER — reveal animations
     -------------------------------------------------------- */
  function initRevealAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Immediately reveal all if reduced motion
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger')
        .forEach(function (el) {
          el.classList.add('revealed');
        });
      return;
    }

    var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------
     6. FORM HANDLING — data-form
     -------------------------------------------------------- */
  function initForms() {
    var forms = document.querySelectorAll('[data-form]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var okMsg = form.querySelector('.form-ok');
        var errMsg = form.querySelector('.form-err');

        // Hide previous messages
        if (okMsg) okMsg.classList.remove('visible');
        if (errMsg) errMsg.classList.remove('visible');

        // Basic validation
        var requiredFields = form.querySelectorAll('[required]');
        var allValid = true;

        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            allValid = false;
            field.style.borderColor = '#DC2626';
          } else {
            field.style.borderColor = '';
          }
        });

        // Email validation
        var emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailField.value)) {
            allValid = false;
            emailField.style.borderColor = '#DC2626';
          }
        }

        if (allValid) {
          if (okMsg) okMsg.classList.add('visible');
          form.reset();
          // Scroll to message
          if (okMsg) {
            okMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          if (errMsg) errMsg.classList.add('visible');
          if (errMsg) {
            errMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });

      // Clear error on input
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        input.addEventListener('input', function () {
          this.style.borderColor = '';
          var errEl = form.querySelector('.form-err');
          if (errEl) errEl.classList.remove('visible');
        });
      });
    });
  }

  /* --------------------------------------------------------
     7. BACK TO TOP
     -------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------
     8. HEADER SCROLL SHADOW
     -------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

})();
