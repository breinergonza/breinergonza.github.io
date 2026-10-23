// Interacciones del sitio, sin dependencias.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tema claro/oscuro
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* sin almacenamiento */ }
    });
  }

  // Año actual en el pie de página
  var year = document.querySelector(".js-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Texto rotativo del hero
  var rotate = document.querySelector(".rotate");
  if (rotate && !reduceMotion) {
    var words = [];
    try { words = JSON.parse(rotate.getAttribute("data-words") || "[]"); } catch (e) { words = []; }
    if (words.length > 1) {
      var i = 0, txt = words[0], deleting = true;
      var tick = function () {
        var full = words[i];
        txt = deleting ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1);
        rotate.textContent = txt;
        var delay = deleting ? 35 : 70;
        if (!deleting && txt === full) { delay = 2200; deleting = true; }
        else if (deleting && txt === "") { deleting = false; i = (i + 1) % words.length; delay = 300; }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 2400);
    }
  }

  // Aparición progresiva de secciones. El contenido solo se oculta cuando este
  // script está activo; si no carga o falla, todo permanece visible.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    root.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Resaltar la sección activa en la navegación
  var links = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (link && entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) navIo.observe(section);
    });
  }
})();
