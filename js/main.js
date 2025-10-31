const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const form = this;

  const adminData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
    message: form.message.value
  };

  const clientData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value
  };

  // Enviar al admin
  emailjs.send('vendly123', 'vendly456', adminData)
    .then(function(response) {
      console.log('Correo al admin enviado!', response.status, response.text);
    }, function(error) {
      console.log('Error al enviar correo al admin', error);
    });

  // Enviar al cliente
  emailjs.send('vendly123', 'vendly789', clientData)
    .then(function(response) {
      console.log('Correo automático al cliente enviado!', response.status, response.text);
    }, function(error) {
      console.log('Error al enviar correo automático', error);
    });

  // Mostrar alert animado
  formAlert.style.display = 'block';
  formAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
  formAlert.textContent = '¡Mensaje enviado correctamente! Te responderemos pronto.';

  // Cerrar alert después de 5s
  setTimeout(() => {
    formAlert.classList.remove('show');
    formAlert.classList.add('hide');
  }, 5000);

  form.reset();
});
