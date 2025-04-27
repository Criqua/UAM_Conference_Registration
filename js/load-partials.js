async function loadHTML(id, url) {
    const resp = await fetch(url);

    if (resp.ok) {
      document.getElementById(id).innerHTML = await resp.text();
    } else {
      console.error(`Error al cargar ${url}: ${resp.status}`);
    }
}
  
window.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', 'partial-views/navbar.html');
    loadHTML('footer', 'partial-views/footer.html');
});