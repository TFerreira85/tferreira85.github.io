/*
  FL Street Radar — landing page
  JS puro, sem dependencias. Responsavel por:
  - menu mobile
  - destaque do link ativo na nav conforme o scroll
  - troca de aba no showcase "Tres telas, do login a tese"
  - animacao de entrada dos blocos marcados com [data-reveal]
  - formulario de solicitacao de acesso (front-end apenas — ver nota abaixo)
*/
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Link ativo na nav conforme a secao visivel ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var navSections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (navSections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinks.find(function (l) {
            return l.getAttribute("href") === "#" + entry.target.id;
          });
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navSections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Showcase: troca de telas do aplicativo ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".showcase-tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".showcase-panel"));

  function activateTab(tab) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    panels.forEach(function (panel) {
      var match = panel.id === "panel-" + tab.dataset.tab;
      panel.classList.toggle("is-active", match);
      if (match) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { activateTab(tab); });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Botoes "Solicitar acesso" levam ao formulario ---------- */
  document.querySelectorAll("[data-open-form]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.setTimeout(function () {
        var first = document.getElementById("f-nome");
        if (first) first.focus({ preventScroll: true });
      }, 450);
    });
  });

  /* ---------- Formulario de solicitacao de acesso ----------
     Este site e um prototipo estatico (HTML+CSS+JS puro, sem backend).
     O envio abaixo NAO chama nenhuma API: apenas valida os campos no
     navegador e mostra uma confirmacao visual. Antes de publicar de
     verdade, troque o preventDefault() por uma chamada real (fetch para
     um endpoint proprio, um servico de formularios, etc.).
  --------------------------------------------------------------- */
  var form = document.getElementById("access-form");
  var note = document.getElementById("form-note");

  if (form && note) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      var empresa = form.empresa.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !empresa || !emailOk) {
        note.textContent = "Preencha nome, e-mail corporativo válido e empresa para continuar.";
        note.classList.add("is-error");
        return;
      }

      note.classList.remove("is-error");
      note.textContent =
        "Solicitação recebida. O time da FL Street entra em contato em até 1 dia útil.";
      form.reset();
    });
  }

  var demoBtn = document.getElementById("btn-demo");
  if (demoBtn && note) {
    demoBtn.addEventListener("click", function () {
      note.classList.remove("is-error");
      note.textContent =
        "Pedido de demonstração registrado. Preencha o formulário acima para confirmar o contato.";
      var first = document.getElementById("f-nome");
      if (first) first.focus({ preventScroll: false });
    });
  }
})();
