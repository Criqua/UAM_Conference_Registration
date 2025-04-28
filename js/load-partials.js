/**
 * Carga un fragmento HTML via fetch y lo inserta en el elemento con id = containerId.
 * Devuelve una promesa que se resuelve cuando el HTML ya está en el DOM.
 */
async function loadHTML(containerId, url) {
    const resp = await fetch(url);

    if (!resp.ok) {
      console.error(`Error al cargar ${url}: ${resp.status}`);
      return;
    }

    document.getElementById(containerId).innerHTML = await resp.text();

    if (containerId === "navbar") {
      activateCurrentNav();
    }
}

/**
 * Recorre todos los enlaces .nav-link dentro del navbar,
 * compara su href con la URL actual y marca active al que coincida (se resalta el menú activo).
 */
function activateCurrentNav() {
  let currentPath = window.location.pathname.split("/").pop();

  /**
   * Caso excepcional: cuando la URL es sólo el dominio 
   * (e.g. al ejecutar Live Server sin especificar un archivo .html de donde cargar) se considera que el archivo activo es index.html.
   */
  if (currentPath === "") {
    currentPath = "index.html";
  }

  document.querySelectorAll("#navbar .nav-link").forEach(link => {
    // Se extrae sólo el nombre del archivo del href
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
    await loadHTML("navbar", "partial-views/navbar.html");
    await loadHTML("footer", "partial-views/footer.html");
});