// Se carga en <head> para aplicar el tema guardado antes del primer pintado.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* almacenamiento no disponible */ }
})();
