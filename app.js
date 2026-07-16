const dialog = document.querySelector("[data-consult-dialog]");
const openers = document.querySelectorAll("[data-consult-open]");
const closers = document.querySelectorAll("[data-consult-close]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const form = document.querySelector("[data-consult-form]");

const heroSecondaryAction = document.querySelector(".hero-actions .secondary-button");

if (heroSecondaryAction?.tagName === "BUTTON") {
  const schoolLink = document.createElement("a");
  schoolLink.className = "secondary-button";
  schoolLink.href = "https://www.harvard.edu/";
  schoolLink.target = "_blank";
  schoolLink.rel = "noreferrer";
  schoolLink.innerHTML = '访问学校官网 <i data-lucide="external-link"></i>';
  heroSecondaryAction.replaceWith(schoolLink);
}

openers.forEach((button) => {
  button.addEventListener("click", () => {
    mobileMenu.hidden = true;
    dialog.showModal();
    dialog.querySelector("input").focus();
  });
});

closers.forEach((button) => button.addEventListener("click", () => dialog.close()));

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.hidden;
  mobileMenu.hidden = !isHidden;
  menuToggle.setAttribute("aria-label", isHidden ? "关闭导航" : "打开导航");
  menuToggle.innerHTML = `<i data-lucide="${isHidden ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-label", "打开导航");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const body = [
    "您好，我想咨询哈佛大学短期交流项目。",
    "",
    `姓名：${data.get("name")}`,
    `当前阶段：${data.get("stage")}`,
    `意向方向：${data.get("degree")}`,
    `重点想了解：${data.get("message") || "未填写"}`,
  ].join("\n");
  const subject = "哈佛大学短期交流项目咨询";
  window.location.href = `mailto:info@ruieredu.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  dialog.close();
  form.reset();
});

lucide.createIcons();
