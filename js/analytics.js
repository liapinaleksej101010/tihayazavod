/*
 * ВЕБ-АНАЛИТИКА сайта «Тихая заводь»
 * ------------------------------------------------------------
 * 1. LiveInternet — код счётчика уже стоит в подвале каждой страницы (блок #counters).
 *    Достаточно зарегистрировать сайт на liveinternet.ru/add.
 * 2. Sber Ads (Топ-100) — впишите номер проекта в sberAdsProjectId.
 * 3. MyTracker (Top.Mail.Ru) — впишите ID счётчика в myTrackerId.
 * Если в личном кабинете сервиса выдан код, отличающийся от кода ниже, —
 * используйте код из личного кабинета.
 */
window.SITE_ANALYTICS = {
  sberAdsProjectId: null, // например: 7712345
  myTrackerId: null       // например: "3512345"
};

/* Список событий/целей сайта (идентификаторы для настройки в сервисах):
 *  add_to_cart      — товар добавлен в корзину (каталог, главная)
 *  begin_checkout   — переход в корзину/начало оформления
 *  order_submit     — заказ оформлен (корзина)          ← основная цель
 *  callback_request — заявка на обратный звонок (контакты)
 *  phone_click      — клик по номеру телефона (шапка, контакты)
 *  subscribe        — подписка на рассылку (главная)
 *  catalog_filter   — выбор категории в каталоге (+ хэш в адресе)
 *  article_read     — открыта статья в блоге (+ хэш в адресе)
 */

(function () {
  var cfg = window.SITE_ANALYTICS;

  /* ---------- Sber Ads (бывший Рамблер/Топ-100) ---------- */
  if (cfg.sberAdsProjectId) {
    (function (w, d, c) {
      (w[c] = w[c] || []).push(function () {
        var options = {
          project: cfg.sberAdsProjectId,
          element: "top100_widget",       // счётчик-кнопка в подвале
          trackHashes: true,              // учёт хэшей (#rods, #lesson-1 …)
          attributes_dataset: ["analytics-block"] // аналитика блоков: data-analytics-block
        };
        try { w.top100Counter = new top100(options); } catch (e) {}
      });
      var n = d.getElementsByTagName("script")[0],
          s = d.createElement("script"),
          f = function () { n.parentNode.insertBefore(s, n); };
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://st.top100.ru/top100/top100.js";
      if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
    })(window, document, "_top100q");
  }

  /* ---------- MyTracker / Top.Mail.Ru ---------- */
  if (cfg.myTrackerId) {
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: cfg.myTrackerId, type: "pageView", start: (new Date()).getTime() });
    (function (d, w, id) {
      if (d.getElementById(id)) return;
      var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
      ts.src = "https://top-fwz1.mail.ru/js/code.js";
      var f = function () { var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s); };
      if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
    })(document, window, "tmr-code");
  }

  /* ---------- Единая функция отправки событий ---------- */
  window.trackGoal = function (goal, params) {
    params = params || {};
    try {
      if (window.top100Counter && typeof window.top100Counter.trackEvent === "function") {
        window.top100Counter.trackEvent(goal, params);
      }
    } catch (e) {}
    try {
      if (cfg.myTrackerId) {
        window._tmr.push({ type: "reachGoal", id: cfg.myTrackerId, goal: goal, params: params });
      }
    } catch (e) {}
    if (window.console) console.log("[analytics] событие:", goal, params);
  };

  /* Виртуальный просмотр при смене хэша (для MyTracker; Sber Ads считает хэши сам) */
  window.addEventListener("hashchange", function () {
    if (cfg.myTrackerId && window._tmr) {
      window._tmr.push({ id: cfg.myTrackerId, type: "pageView", url: location.href, start: (new Date()).getTime() });
    }
  });
})();
