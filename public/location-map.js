(() => {
  const element = document.querySelector('#location-map');
  if (!element) return;
  const status = element.querySelector('[role="status"]');
  const loadAsset = (tag, attributes) => new Promise((resolve, reject) => {
    const asset = document.createElement(tag);
    Object.assign(asset, attributes);
    asset.onload = resolve;
    asset.onerror = reject;
    document.head.append(asset);
  });
  const loadMap = async () => {
    try {
      await Promise.all([
        loadAsset('link', {rel: 'stylesheet', href: '/leaflet.css'}),
        loadAsset('script', {src: '/leaflet.js'}),
      ]);
      const point = [Number(element.dataset.lat), Number(element.dataset.lng)];
      const map = L.map(element, {scrollWheelZoom: false}).setView(point, 16);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const icon = L.icon({iconUrl: '/favicon.svg?v=logo-g', className: 'garage-map-pin', iconSize: [44,44], iconAnchor: [22,22], popupAnchor: [0,-22]});
      L.marker(point, {icon, title:'garage by tom', alt:'garage by tom, Stadtplatz 57'})
        .addTo(map).bindPopup('<strong>garage by tom</strong><br>Stadtplatz 57<br>5230 Mattighofen');
      status?.remove();
      element.dataset.loaded = 'true';
    } catch {
      if (status) status.textContent = 'Die Karte ist gerade nicht verfügbar. Nutze „Karte groß öffnen“ oder „Navigation starten“.';
    }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); loadMap(); }
    });
    observer.observe(element);
  } else { loadMap(); }
})();
