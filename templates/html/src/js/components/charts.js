export function initChartPlaceholders(root = document) {
  root.querySelectorAll("[data-chart]").forEach((chart) => {
    chart.setAttribute("data-chart-ready", "true");
  });
}
