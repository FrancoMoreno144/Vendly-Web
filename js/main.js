// =====================================================
// 🌓 SISTEMA DE TEMA (CLARO / OSCURO)
// =====================================================
const htmlEl = document.documentElement;
const btn = document.getElementById("themeToggle");
const vendlyLogos = document.querySelectorAll(".vendlyLogo");
const navbar = document.querySelector(".navbar");

// Cambiar tema con transición suave
function setTheme(theme) {
  htmlEl.classList.add("transition");
  htmlEl.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);

  // Cambiar texto y color del botón
  btn.innerHTML =
    theme === "light"
      ? '<i class="bi bi-moon"></i> Modo oscuro'
      : '<i class="bi bi-sun"></i> Modo claro';
  btn.className =
    theme === "light"
      ? "btn btn-dark ms-lg-3 mt-2 mt-lg-0"
      : "btn btn-light ms-lg-3 mt-2 mt-lg-0";

  // Cambiar logotipos
  vendlyLogos.forEach((logo) => {
    logo.src = theme === "dark" ? logo.dataset.dark : logo.dataset.light;
  });

  // Actualizar navbar
  navbar.setAttribute("data-bs-theme", theme);

  // Quitar clase de transición tras animación
  setTimeout(() => htmlEl.classList.remove("transition"), 600);
}

// Aplicar tema guardado
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Evento del botón
btn.addEventListener("click", () => {
  const newTheme =
    htmlEl.getAttribute("data-bs-theme") === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// =====================================================
// 🌫️ NAVBAR CON EFECTO SCROLL
// =====================================================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =====================================================
// ✨ AOS (Animaciones al hacer scroll)
// =====================================================
AOS.init({ duration: 1000, once: true });

// =====================================================
// 📧 FORMULARIO DE CONTACTO (EmailJS + Toast)
// =====================================================
const contactForm = document.getElementById("contactForm");
const toastContainer = document.createElement("div");
toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
document.body.appendChild(toastContainer);

// Inicializar EmailJS (usa tu Public Key)
emailjs.init("vt1akY_jssjE-uek8");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = this;
  const submitBtn = form.querySelector('button[type="submit"]');

  // Desactivar botón mientras se envía
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

  // Datos para el correo al administrador
  const adminData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
    message: form.message.value,
  };

  // Datos para correo automático al cliente
  const clientData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
  };

  try {
    // Enviar correo al administrador
    await emailjs.send("vendly123", "vendly456", adminData);
    // Enviar correo automático al cliente
    await emailjs.send("vendly123", "vendly789", clientData);

    // Mostrar toast de éxito
    showToast(
      "¡Mensaje enviado correctamente! Te responderemos pronto.",
      "success"
    );

    form.reset();
  } catch (error) {
    console.error("❌ Error al enviar mensaje:", error);
    showToast(
      "Ocurrió un error al enviar el mensaje. Intenta nuevamente.",
      "danger"
    );
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
  }
});

// =====================================================
// 🔔 FUNCIÓN PARA MOSTRAR TOAST
// =====================================================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;

  toastContainer.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay: 5000 });
  bsToast.show();

  // Eliminar toast del DOM después de ocultarse
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}
