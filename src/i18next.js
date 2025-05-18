i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init(
    {
      fallbackLng: "en",
      debug: true,
      backend: {
        loadPath: "/public/locales/en.json",
      },
    },
    function (err, t) {
      if (err) return console.error(err);
      updateContent();
    }
  );

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = i18next.t(key);
    el.innerHTML = translated;
  });
}
