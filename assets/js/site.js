/* All Kolorz Custom Paint & Body — site interactions (vanilla, no dependencies) */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  function setMenu(open) {
    if (!menuBtn || !mobileNav) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
    mobileNav.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    if (open) {
      var first = mobileNav.querySelector("a");
      if (first) first.focus();
    }
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false);
    });
  }

  /* ---------- Reveal: rise, pinstripes, airbrush ---------- */
  var sprays = [].slice.call(document.querySelectorAll(".spray"));
  if (!reduce) {
    sprays.forEach(function (el, i) {
      // vary the spray origin so every reveal looks hand-sprayed
      var pts = [[32, 38], [66, 30], [44, 64], [58, 48], [28, 56], [70, 62]];
      var p = pts[i % pts.length];
      el.style.setProperty("--sx", p[0] + "%");
      el.style.setProperty("--sy", p[1] + "%");
      var r = el.getBoundingClientRect();
      // only arm the mask for elements below the fold (no flash for what is already visible)
      if (r.top > window.innerHeight * 0.9) el.classList.add("armed");
      el.addEventListener("transitionend", function (e) {
        if (e.propertyName === "--r" && el.classList.contains("in")) el.classList.add("done");
      });
    });
  }
  var revealTargets = [].slice.call(document.querySelectorAll(".rise, .spray, .pin, [data-reveal]"));
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          if (en.target.classList.contains("armed")) {
            // safety: remove the mask even if transitionend never fires (no @property support)
            setTimeout(function () { en.target.classList.add("done"); }, 2200);
          }
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in", "done"); });
  }

  /* ---------- Flip-flop paint: gradient shifts with scroll position ---------- */
  var flips = [].slice.call(document.querySelectorAll(".flip"));
  if (flips.length && !reduce) {
    var visible = new Set();
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      visible.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var c = (r.top + r.height / 2) / vh; // 0 top -> 1 bottom
        var t = Math.max(-0.4, Math.min(1.4, c));
        el.style.setProperty("--p", (0.08 + (1 - t) * 0.62).toFixed(4));
        el.style.setProperty("--h", ((0.5 - t) * 26).toFixed(2));
      });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    if ("IntersectionObserver" in window) {
      var fio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
        });
        onScroll();
      });
      flips.forEach(function (el) { fio.observe(el); });
    } else {
      flips.forEach(function (el) { visible.add(el); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---------- Countdown to the next show ---------- */
  [].slice.call(document.querySelectorAll("[data-countdown]")).forEach(function (el) {
    var target = new Date(el.getAttribute("data-countdown"));
    var diff = target - new Date();
    if (isNaN(diff)) return;
    if (diff <= 0) {
      el.textContent = el.getAttribute("data-after") || el.textContent;
      return;
    }
    var days = Math.ceil(diff / 86400000);
    el.textContent = days === 1 ? "Tomorrow night" : days + " days out";
  });

  /* ---------- Gallery filter + lightbox ---------- */
  var chips = [].slice.call(document.querySelectorAll(".chip[data-filter]"));
  var tiles = [].slice.call(document.querySelectorAll(".tile"));
  var status = document.getElementById("filter-status");
  function applyFilter(f) {
    var shown = 0;
    tiles.forEach(function (t) {
      var cats = (t.getAttribute("data-cat") || "").split(" ");
      var on = f === "all" || cats.indexOf(f) > -1;
      t.hidden = !on;
      if (on) shown++;
    });
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-filter") === f ? "true" : "false"); });
    if (status) status.textContent = shown + (shown === 1 ? " piece" : " pieces") + " shown";
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () { applyFilter(c.getAttribute("data-filter")); });
  });
  if (chips.length) {
    var initial = (location.hash || "").replace("#", "");
    if (initial && chips.some(function (c) { return c.getAttribute("data-filter") === initial; })) applyFilter(initial);
  }

  var lb = document.getElementById("lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = lb.querySelector(".lb-stage img");
    var lbCap = lb.querySelector(".lb-cap");
    var lbCount = lb.querySelector(".lb-count");
    var current = 0;
    var opener = null;
    var list = function () {
      return tiles.filter(function (t) { return !t.hidden && t.querySelector("button[data-full]"); });
    };
    var show = function (i) {
      var items = list();
      if (!items.length) return;
      current = (i + items.length) % items.length;
      var b = items[current].querySelector("button[data-full]");
      lbImg.src = b.getAttribute("data-full");
      lbImg.alt = b.querySelector("img").alt;
      lbCap.textContent = b.getAttribute("data-caption") || "";
      lbCount.textContent = (current + 1) + " / " + items.length;
    };
    tiles.forEach(function (t) {
      var b = t.querySelector("button[data-full]");
      if (!b) return;
      b.addEventListener("click", function () {
        opener = b;
        show(list().indexOf(t));
        lb.showModal();
        document.body.classList.add("menu-open");
      });
    });
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(current - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(current + 1); });
    lb.querySelector("[data-lb-close]").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) lb.close(); });
    lb.addEventListener("close", function () {
      document.body.classList.remove("menu-open");
      if (opener) opener.focus();
    });
  }

  /* ---------- Quote form validation (Netlify Forms) ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    var setErr = function (input, msg) {
      var box = document.getElementById(input.id + "-err");
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (box) box.textContent = msg || "";
    };
    var check = function (input) {
      var v = (input.value || "").trim();
      if (input.required && !v) { setErr(input, "Please fill this in."); return false; }
      if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { setErr(input, "Enter a valid email, like name@example.com."); return false; }
      if (input.type === "tel" && v && v.replace(/\D/g, "").length < 10) { setErr(input, "Enter a 10-digit phone number."); return false; }
      if (input.type === "file" && input.files && input.files.length) {
        var total = 0;
        for (var i = 0; i < input.files.length; i++) total += input.files[i].size;
        if (input.files.length > 1) { setErr(input, "Please attach one photo here and text any extras."); return false; }
        if (total > 8 * 1024 * 1024) { setErr(input, "That photo is over 8 MB. Try a smaller one or text it to us."); return false; }
      }
      setErr(input, "");
      return true;
    };
    var fields = [].slice.call(form.querySelectorAll("input:not([type=hidden]):not([type=radio]):not(.hp input), select, textarea"));
    fields.forEach(function (f) {
      f.addEventListener("blur", function () { if (f.value) check(f); });
      f.addEventListener("change", function () { check(f); });
    });
    if (/[?&]sent=1/.test(location.search)) {
      form.hidden = true;
      document.getElementById("form-success").hidden = false;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      fields.forEach(function (f) { if (!check(f)) { ok = false; if (!firstBad) firstBad = f; } });
      if (!ok) { firstBad.focus(); return; }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.querySelector("span").textContent = "Sending...";
      var done = function () {
        form.hidden = true;
        var s = document.getElementById("form-success");
        s.hidden = false;
        s.focus();
      };
      fetch("/", { method: "POST", body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () {
          btn.disabled = false;
          btn.querySelector("span").textContent = "Send my quote request";
          var g = document.getElementById("form-general-err");
          g.textContent = "Something went wrong sending the form. Please text your photos to (804) 647-1222 instead.";
          g.focus();
        });
    });
  }

  /* ---------- Footer year ---------- */
  [].slice.call(document.querySelectorAll("[data-year]")).forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
