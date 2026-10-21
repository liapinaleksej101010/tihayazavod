/*
 * ВЕБ-АНАЛИТИКА сайта «Тихая заводь»
 * ------------------------------------------------------------
 * 1. LiveInternet — код счётчика уже стоит в подвале каждой страницы (блок #counters).
 *    Достаточно зарегистрировать сайт на liveinternet.ru/add.
 * 2. Sber Ads (Топ-100) — код счётчика (проект 7753172) уже стоит в начале <body> каждой страницы.
 * 3. MyTracker (Top.Mail.Ru) — код счётчика (ID 3807149) уже стоит в начале <body> каждой страницы.
 * Если в личном кабинете сервиса выдан код, отличающийся от кода ниже, —
 * используйте код из личного кабинета.
 */
window.SITE_ANALYTICS = {
  sberAdsProjectId: 7753172, // справочно: код счётчика стоит в каждой HTML-странице
  myTrackerId: "3807149"  // нужен для отправки целей; код счётчика стоит в каждой HTML-странице
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

  /* ---------- Sber Ads (бывший Рамблер/Топ-100) ----------
   * Код счётчика (проект 7753172) вставлен в начало <body> каждой страницы.
   * Здесь он не подключается повторно; trackGoal() ниже использует window.top100Counter.
   */

  /* ---------- MyTracker / Top.Mail.Ru ----------
   * Код счётчика (ID 3807149) вставлен в начало <body> каждой страницы, здесь повторно не подключается.
   * trackGoal() ниже отправляет цели через _tmr.push({type: "reachGoal", ...}).
   */

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
        (window._tmr = window._tmr || []).push({ type: "reachGoal", id: cfg.myTrackerId, goal: goal, params: params });
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
