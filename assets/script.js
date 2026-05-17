/* ==================== gift clinic — クマ取りLP / scripts ==================== */
(function () {
  'use strict';

  // ===== Countdown to 2026-05-31 23:59:59 JST =====
  // (current year is 2026 per system date)
  function getDeadline() {
    // JST = UTC+9
    // 2026-05-31 23:59:59 JST  ->  2026-05-31T14:59:59Z
    return new Date(Date.UTC(2026, 4, 31, 14, 59, 59));
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = new Date();
    var diff = getDeadline() - now;
    if (diff < 0) diff = 0;
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    var set = function (id, v) {
      var el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    set('cdD', pad(d)); set('cdH', pad(h)); set('cdM', pad(m)); set('cdS', pad(s));
    set('bD', pad(d));  set('bH', pad(h));  set('bM', pad(m));  set('bS', pad(s));
  }
  tick();
  setInterval(tick, 1000);

  // ===== Compare tabs =====
  document.querySelectorAll('.compare-tabs button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.compare-tabs button').forEach(function (b) { b.classList.toggle('on', b === btn); });
      document.querySelectorAll('.compare-pane').forEach(function (p) { p.classList.toggle('on', p.id === tab); });
    });
  });

  // ===== Reveal on scroll =====
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // ===== Smooth scroll for in-page anchors =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var t = document.getElementById(id);
      if (!t) return;
      ev.preventDefault();
      var y = t.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

// Reserve form (demo)
function submitReserve(ev) {
  ev.preventDefault();
  var btn = ev.target.querySelector('button[type=submit]');
  if (btn) {
    btn.textContent = '送信中…';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'ご予約を受け付けました ✓';
      btn.style.background = '#06C755';
    }, 600);
  }
  return false;
}
