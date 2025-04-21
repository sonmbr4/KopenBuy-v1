document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('button[data-bs-target="#login-modal"]');
    const registerButton = document.querySelector('.btn-primary[style*="background-color: var(--primary-color)"]');

    // Forzar type="email" y type="password"
    setInterval(() => {
        if (emailInput.type !== 'email') emailInput.type = 'email';
        if (passwordInput.type !== 'password') passwordInput.type = 'password';
    }, 100);

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Credenciales de admin
            const adminEmail = 'correoadmin@gmail.com';
            const adminPassword = '1234';

            // Validación básica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Por favor ingrese un correo válido');
                return;
            }

            // Verificar credenciales
            if (emailInput.value === adminEmail && passwordInput.value === adminPassword) {
                // Redirigir a panel de admin
                window.location.href = 'inicioAdmin.html';
            } else {
                // Ocultar botones de login/register
                loginButton.style.display = 'none';
                registerButton.style.display = 'none';

                // Crear icono de usuario
                const userIcon = document.createElement('div');
                userIcon.className = 'd-flex align-items-center user-logged dropdown';
                userIcon.innerHTML = `
                    <i class="bi bi-person-circle fs-4 me-2"></i>
                    <span class="dropdown-toggle" data-bs-toggle="dropdown">${emailInput.value.split('@')[0]}</span>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item text-danger" href="#" id="logout-btn">Cerrar sesión</a></li>
                    </ul>
                `;

                // Insertar en el navbar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                navbarCollapse.appendChild(userIcon);

                // Configurar evento para el botón de cerrar sesión
                userIcon.querySelector('#logout-btn').addEventListener('click', function (e) {
                    e.preventDefault();
                    // Eliminar el icono de usuario
                    userIcon.remove();
                    // Mostrar nuevamente los botones de login/register
                    loginButton.style.display = 'block';
                    registerButton.style.display = 'block';
                    // Limpiar el formulario
                    loginForm.reset();
                });

                // Cerrar modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('login-modal'));
                modal.hide();
            }
        });
    }

    // Lógica del formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validaciones
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }

            if (!document.getElementById('register-terms').checked) {
                alert("Debes aceptar los términos y condiciones");
                return;
            }

            // Simulamos registro exitoso (en un caso real, aquí iría una petición al servidor)
            alert(`¡Registro exitoso, ${name}! Ahora puedes iniciar sesión.`);

            // Cerramos el modal y limpiamos el formulario
            const modal = bootstrap.Modal.getInstance(document.getElementById('register-modal'));
            modal.hide();
            registerForm.reset();

            // Opcional: Redirigir o mostrar mensaje de éxito
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll').forEach(element => {
        observer.observe(element);
    });
});

