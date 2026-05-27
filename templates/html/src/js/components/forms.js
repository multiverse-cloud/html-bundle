export function initFormEnhancements(root = document) {
  root.querySelectorAll("form").forEach((form) => {
    form.setAttribute("data-tailadmin-form", "enhanced");
  });
}
