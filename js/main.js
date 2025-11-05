// Selección de elementos
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

// Inicializar EmailJS (reemplaza tu clave si es necesario)
emailjs.init('vt1akY_jssjE-uek8');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const form = this;

  // Datos para el correo al administrador
  const adminData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
    message: form.message.value
  };

  // Datos para el correo automático al cliente
  const clientData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value
  };

  // Enviar correo al administrador
  emailjs.send('vendly123', 'vendly456', adminData)
    .then(response => {
      console.log('Correo al admin enviado!', response.status, response.text);
    })
    .catch(error => {
      console.error('Error al enviar correo al admin:', error);
    });

  // Enviar correo automático al cliente
  emailjs.send('vendly123', 'vendly789', clientData)
    .then(response => {
      console.log('📧 Correo automático al cliente enviado!', response.status, response.text);
    })
    .catch(error => {
      console.error('Error al enviar correo automático:', error);
    });

  // Mostrar alerta animada
  formAlert.style.display = 'block';
  formAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
  formAlert.innerHTML = `
    ¡Mensaje enviado correctamente! Te responderemos pronto.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;

  // Ocultar alerta automáticamente después de 5 segundos
  setTimeout(() => {
    formAlert.classList.remove('show');
    setTimeout(() => (formAlert.style.display = 'none'), 200); // se oculta suavemente
  }, 5000);

  function setTheme(theme) {
  htmlEl.classList.add("transition");
  htmlEl.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
  btn.textContent = theme === "light" ? "Modo oscuro" : "Modo claro";
  btn.className = theme === "light" ? "btn btn-dark ms-lg-3 mt-2 mt-lg-0" : "btn btn-light ms-lg-3 mt-2 mt-lg-0";
  vendlyLogos.forEach(logo => {
    logo.src = theme === "dark" ? logo.dataset.dark : logo.dataset.light;
  });
  navbar.setAttribute("data-bs-theme", theme);
  setTimeout(() => htmlEl.classList.remove("transition"), 600);
}

  // Reiniciar formulario
  form.reset();
});


