document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');

    // Validación de teléfono (solo números)
    telefono.addEventListener('input', function(e) {
        // Eliminar cualquier caracter que no sea número
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Validar longitud mínima (8 dígitos)
        if (this.value.length < 8) {
            this.classList.add('invalid');
            this.classList.remove('valid');
            mostrarError(this, 'El número debe tener al menos 8 dígitos');
        } else {
            this.classList.add('valid');
            this.classList.remove('invalid');
            ocultarError(this);
        }
    });

    // Validación de email
    email.addEventListener('input', function(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(this.value)) {
            this.classList.add('invalid');
            this.classList.remove('valid');
            mostrarError(this, 'Por favor, ingrese un correo electrónico válido');
        } else {
            this.classList.add('valid');
            this.classList.remove('invalid');
            ocultarError(this);
        }
    });

    // Función para mostrar mensaje de error
    function mostrarError(elemento, mensaje) {
        let errorDiv = elemento.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
        }
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }

    // Función para ocultar mensaje de error
    function ocultarError(elemento) {
        const errorDiv = elemento.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
        }
    }

    // Función para enviar email usando EmailJS
    async function enviarNotificacion(nombre, telefono, email, mensaje) {
        try {
            // Obtener la fecha actual en formato legible
            const fecha = new Date().toLocaleString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            const response = await emailjs.send(
                "service_fem43wz",
                "template_vh3zran",
                {
                    from_name: nombre,
                    telefono: telefono,
                    email: email,
                    mensaje: mensaje,
                    to_name: "Sembrando Jardinería",
                    fecha: fecha
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'Nos pondremos en contacto contigo pronto',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#2d5a27'
                });
                form.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2d5a27'
            });
        }
    }

    // Validación del formulario antes de enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar teléfono
        if (telefono.value.length < 8) {
            mostrarError(telefono, 'El número debe tener al menos 8 dígitos');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            mostrarError(email, 'Por favor, ingrese un correo electrónico válido');
            isValid = false;
        }
        
        if (isValid) {
            // Mostrar indicador de carga
            Swal.fire({
                title: 'Enviando mensaje...',
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const telefonoValue = telefono.value;
            const emailValue = email.value;
            const mensaje = document.getElementById('mensaje').value;

            // Enviar notificación
            enviarNotificacion(nombre, telefonoValue, emailValue, mensaje);
        }
    });
}); 