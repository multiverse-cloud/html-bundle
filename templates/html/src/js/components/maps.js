export function initMapPlaceholders(root = document) {
  root.querySelectorAll("[data-map]").forEach((map) => {
    map.setAttribute("data-map-ready", "true");
  });
}
