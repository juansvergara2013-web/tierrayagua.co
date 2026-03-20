const pages = [
  { id: "inicio", label: "Inicio", href: "index.html" },
  { id: "soluciones", label: "Soluciones", href: "soluciones.html" },
  { id: "biofiltros", label: "Biofiltros", href: "biofiltros-humedales.html" },
  { id: "bioconstruccion", label: "Bioconstruccion", href: "bioconstruccion.html" },
  { id: "aplicaciones", label: "Aplicaciones", href: "aplicaciones.html" },
  { id: "nosotros", label: "Nosotros", href: "nosotros.html" },
  { id: "contacto", label: "Contacto", href: "contacto.html" },
  { id: "ilustraciones", label: "Ilustraciones", href: "ilustraciones.html" }
];

const currentPage = document.body.dataset.page;

const navLinks = pages
  .map((page) => {
    const activeClass = page.id === currentPage ? "is-active" : "";
    return `<a class="${activeClass}" href="${page.href}">${page.label}</a>`;
  })
  .join("");

const headerSlot = document.querySelector("[data-site-header]");
const footerSlot = document.querySelector("[data-site-footer]");

if (headerSlot) {
  headerSlot.innerHTML = `
    <header class="site-header">
      <div class="shell nav-wrap">
        <a class="brand brand-header" href="index.html" aria-label="Tierra y Agua, ir al inicio">
          <span class="brand-logo-wrap brand-logo-header-wrap">
            <img
              class="brand-logo"
              src="assets/brand/logo/LOGO-FONDO%20VERDE.png"
              alt="Logo Tierra y Agua"
            />
          </span>
        </a>
        <div class="nav-center">
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu">
            <span class="nav-toggle-box" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span class="nav-toggle-label">Menu</span>
          </button>
          <div class="nav-panel">
            <nav id="site-menu" class="nav-menu" aria-label="Principal">
              ${navLinks}
            </nav>
          </div>
        </div>
        <div class="nav-actions">
          <a class="button button-primary nav-cta" href="contacto.html">Ponte en contacto</a>
        </div>
      </div>
    </header>
  `;
}

if (footerSlot) {
  footerSlot.innerHTML = `
    <footer class="site-footer">
      <div class="shell">
        <div class="footer-grid">
          <div>
            <a class="brand footer-brand" href="index.html" aria-label="Tierra y Agua, ir al inicio">
              <span class="brand-logo-wrap footer-logo-wrap">
                <img
                  class="brand-logo"
                  src="assets/brand/logo/LOGO-FONDO%20VERDE.png"
                  alt="Logo Tierra y Agua"
                />
              </span>
            </a>
          </div>
          <div class="footer-nav">
            <span class="footer-title">Mapa</span>
            ${pages.map((page) => `<a href="${page.href}">${page.label}</a>`).join("")}
          </div>
          <div class="footer-notes">
            <span class="footer-title">Contacto</span>
            <a href="https://www.instagram.com/biofiltro.tierrayagua/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="mailto:hola@tierrayagua.bio">hola@tierrayagua.bio</a>
            <span>Colombia</span>
          </div>
        </div>
        <div class="footer-bottom">
          <span><span id="year"></span> Tierra & Agua</span>
          <span>Base reusable para futuras webs y adaptaciones sectoriales</span>
        </div>
      </div>
    </footer>
  `;
}

document.getElementById("year")?.append(String(new Date().getFullYear()));

const toggle = document.querySelector(".nav-toggle");
const panel = document.querySelector(".nav-panel");
const navMenuLinks = document.querySelectorAll(".nav-menu a, .nav-cta");

toggle?.addEventListener("click", () => {
  const isOpen = panel?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    panel?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    panel?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

const form = document.querySelector(".contact-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const honeypot = form.querySelector('input[name="empresa_web"]');
  if (honeypot && honeypot.value.trim() !== "") {
    alert("No fue posible procesar la solicitud.");
    return;
  }
  alert("Formulario de demostracion. Conecta este bloque a tu canal real de captacion.");
});

const carousel = document.querySelector(".js-carousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".home-carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dots] button"));
  let activeIndex = 0;
  let autoplayId;

  const renderCarousel = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  };

  const goToSlide = (nextIndex) => {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    renderCarousel(normalizedIndex);
  };

  const startAutoplay = () => {
    autoplayId = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 5000);
  };

  carousel.addEventListener("mouseenter", () => window.clearInterval(autoplayId));
  carousel.addEventListener("mouseleave", startAutoplay);

  renderCarousel(0);
  startAutoplay();
}
