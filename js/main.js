(function () {
  var CART_KEY = "zavod_cart";
  var track = function (g, p) { if (window.trackGoal) window.trackGoal(g, p); };
  var fmt = function (n) { return n.toLocaleString("ru-RU") + " ₽"; };
  var byId = function (id) { return window.PRODUCTS.filter(function (p) { return p.id === id; })[0]; };

  /* ---------- Корзина (localStorage, с защитой) ---------- */
  var memCart = {};
  function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return memCart; } }
  function saveCart(c) { memCart = c; try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} updateCount(); }
  function cartCount() { var c = loadCart(), n = 0; for (var k in c) n += c[k]; return n; }
  function updateCount() { document.querySelectorAll("[data-cart-count]").forEach(function (el) { el.textContent = cartCount(); }); }
  function addToCart(id, source) {
    var c = loadCart(); c[id] = (c[id] || 0) + 1; saveCart(c);
    var p = byId(id);
    track("add_to_cart", { product_id: id, name: p.name, price: p.price, category: p.cat, source: source });
    toast("«" + p.name + "» в корзине");
  }

  var toastTimer;
  function toast(text) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }

  /* ---------- Карточка товара ---------- */
  function card(p, source) {
    return '<article class="product" data-analytics-block="product-card">' +
      '<div class="pic">' + (p.tag ? '<span class="tag">' + p.tag + '</span>' : '') + window.ICONS[p.cat] + '</div>' +
      '<div class="body"><span class="brand">' + p.brand + '</span><h3>' + p.name + '</h3>' +
      '<div class="specs">' + p.specs.map(function (s) { return "<span>" + s + "</span>"; }).join("") + '</div></div>' +
      '<div class="foot"><span class="price">' + fmt(p.price) + '</span>' +
      '<button class="add-btn" type="button" data-add="' + p.id + '" data-source="' + source + '">В корзину</button></div></article>';
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (b) {
      addToCart(b.getAttribute("data-add"), b.getAttribute("data-source"));
      b.classList.add("added"); b.textContent = "Добавлено ✓";
      setTimeout(function () { b.classList.remove("added"); b.textContent = "В корзину"; }, 1500);
    }
    var tel = e.target.closest('a[href^="tel:"]');
    if (tel) track("phone_click", { place: tel.getAttribute("data-place") || "page" });
    var cl = e.target.closest("[data-cart-link]");
    if (cl && cartCount() > 0) track("begin_checkout", { items: cartCount() });
  });

  document.querySelectorAll("[data-icon]").forEach(function (el) { el.innerHTML = window.ICONS[el.getAttribute("data-icon")]; });

  /* ---------- Хиты на главной ---------- */
  var hits = document.getElementById("hits");
  if (hits) hits.innerHTML = window.PRODUCTS.filter(function (p) { return p.tag; }).map(function (p) { return card(p, "home_hits"); }).join("");

  /* ---------- Каталог с фильтром по хэшу ---------- */
  var grid = document.getElementById("catalog-grid");
  if (grid) {
    var sortSel = document.getElementById("sort");
    var renderCatalog = function () {
      var cat = location.hash.replace("#", "");
      var known = window.CATEGORIES.some(function (c) { return c.id === cat; });
      if (!known) cat = "all";
      var list = window.PRODUCTS.filter(function (p) { return cat === "all" || p.cat === cat; });
      var s = sortSel.value;
      if (s === "asc") list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (s === "desc") list = list.slice().sort(function (a, b) { return b.price - a.price; });
      grid.innerHTML = list.map(function (p) { return card(p, "catalog"); }).join("");
      document.getElementById("found").textContent = "Найдено товаров: " + list.length;
      document.querySelectorAll(".filters a").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + cat || (cat === "all" && a.getAttribute("href") === "#all"));
      });
      var c = window.CATEGORIES.filter(function (x) { return x.id === cat; })[0];
      document.getElementById("cat-title").textContent = c ? c.name : "Все товары";
      return cat;
    };
    renderCatalog();
    window.addEventListener("hashchange", function () { var c = renderCatalog(); track("catalog_filter", { category: c }); });
    sortSel.addEventListener("change", renderCatalog);
  }

  /* ---------- Корзина и оформление заказа ---------- */
  var cartBox = document.getElementById("cart-box");
  if (cartBox) {
    var renderCart = function () {
      var c = loadCart(), ids = Object.keys(c).filter(function (id) { return byId(id); }), total = 0;
      if (!ids.length) {
        cartBox.innerHTML = '<div class="empty"><p>Корзина пока пустая. Загляните в каталог — там удилища, катушки и приманки к сезону.</p><a class="btn" href="catalog.html">Перейти в каталог</a></div>';
        document.getElementById("order-total").textContent = fmt(0);
        return;
      }
      var rows = ids.map(function (id) {
        var p = byId(id), sum = p.price * c[id]; total += sum;
        return "<tr><td>" + p.name + '<br><span class="form-note">' + p.specs.join(" · ") + '</span></td>' +
          '<td><span class="qty"><button type="button" data-dec="' + id + '" aria-label="Меньше">−</button><span>' + c[id] + '</span><button type="button" data-inc="' + id + '" aria-label="Больше">+</button></span></td>' +
          '<td class="num">' + fmt(sum) + '</td><td><button class="rm" type="button" data-rm="' + id + '">Удалить</button></td></tr>';
      }).join("");
      var delivery = total >= 5000 ? 0 : 390;
      cartBox.innerHTML = '<div class="table-wrap"><table><thead><tr><th>Товар</th><th>Кол-во</th><th class="num">Сумма</th><th></th></tr></thead><tbody>' + rows +
        '<tr><td colspan="2">Доставка ' + (delivery ? '(бесплатно от 5 000 ₽)' : '') + '</td><td class="num">' + (delivery ? fmt(delivery) : "бесплатно") + '</td><td></td></tr>' +
        '<tr class="total-row"><td colspan="2">Итого</td><td class="num">' + fmt(total + delivery) + '</td><td></td></tr></tbody></table></div>';
      document.getElementById("order-total").textContent = fmt(total + delivery);
    };
    cartBox.addEventListener("click", function (e) {
      var c = loadCart(), t = e.target, id;
      if ((id = t.getAttribute("data-inc"))) c[id]++;
      else if ((id = t.getAttribute("data-dec"))) { c[id]--; if (c[id] <= 0) delete c[id]; }
      else if ((id = t.getAttribute("data-rm"))) delete c[id];
      else return;
      saveCart(c); renderCart();
    });
    renderCart();

    var orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("order-error");
      if (cartCount() === 0) { err.textContent = "Добавьте в корзину хотя бы один товар."; return; }
      if (!orderForm.checkValidity()) { err.textContent = "Заполните имя, телефон и адрес — по ним курьер найдёт вас."; orderForm.reportValidity(); return; }
      err.textContent = "";
      var c = loadCart(), revenue = 0; for (var k in c) revenue += byId(k).price * c[k];
      var num = "ТЗ-" + String(Date.now()).slice(-6);
      track("order_submit", { order_id: num, revenue: revenue, items: cartCount(), delivery: orderForm.delivery.value, payment: orderForm.payment.value });
      saveCart({}); renderCart();
      orderForm.hidden = true;
      var ok = document.getElementById("order-ok");
      ok.hidden = false;
      ok.querySelector("b").textContent = num;
    });
  }

  /* ---------- Обратный звонок ---------- */
  var cb = document.getElementById("callback-form");
  if (cb) cb.addEventListener("submit", function (e) {
    e.preventDefault();
    track("callback_request", { topic: cb.topic.value });
    cb.hidden = true; document.getElementById("callback-ok").hidden = false;
  });

  /* ---------- Подписка ---------- */
  var sub = document.getElementById("subscribe-form");
  if (sub) sub.addEventListener("submit", function (e) {
    e.preventDefault();
    track("subscribe", { place: "home_band" });
    sub.innerHTML = "<p><b>Готово.</b> Первое письмо с прогнозом клёва придёт в пятницу.</p>";
  });

  /* ---------- Блог: чтение статьи по хэшу ---------- */
  if (document.querySelector(".articles")) {
    var onArticle = function () { var h = location.hash.replace("#", ""); if (h && document.getElementById(h)) track("article_read", { article: h }); };
    window.addEventListener("hashchange", onArticle); onArticle();
  }

  /* ---------- Прогноз клёва на 7 дней (демонстрационный) ---------- */
  var fc = document.getElementById("forecast");
  if (fc) {
    var days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], html = "", d = new Date();
    var bites = [4, 3, 2, 3, 5, 4, 2], press = [748, 751, 756, 753, 746, 744, 750], temp = [6, 7, 9, 8, 5, 4, 6];
    for (var i = 0; i < 7; i++) {
      var day = new Date(d.getTime() + i * 864e5);
      var bars = ""; for (var j = 0; j < 5; j++) bars += '<i class="' + (j < bites[i] ? "on" : "") + '"></i>';
      html += '<div class="fday"><span class="d">' + days[day.getDay()] + ", " + day.getDate() + "." + String(day.getMonth() + 1).padStart(2, "0") + '</span>' +
        '<span class="bite" aria-label="Клёв ' + bites[i] + ' из 5">' + bars + '</span>' +
        '<span class="meta">' + press[i] + ' мм рт.ст.<br>вода +' + temp[i] + '°C</span></div>';
    }
    fc.innerHTML = html;
  }

  updateCount();
})();
