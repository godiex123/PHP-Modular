<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Académico - Universidad Nacional</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary-color: #1e40af;
            --secondary-color: #3b82f6;
            --accent-color: #fbbf24;
            --dark-color: #1f2937;
            --light-bg: #f8fafc;
        }

        * {
            font-family: 'Inter', sans-serif;
        }

        body {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            min-height: 100vh;
            position: relative;
        }

        .bg-overlay {
            background-image: url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.15;
        }

        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-card {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-radius: 16px;
            overflow: hidden;
        }

        .university-logo {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
        }

        .btn-academic {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            padding: 12px 24px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
        }

        .btn-academic:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4);
            background: linear-gradient(135deg, #1d4ed8, #2563eb);
        }

        .form-control {
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            padding: 12px 16px;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(30, 64, 175, 0.25);
        }

        .input-group-text {
            background: transparent;
            border: 2px solid #e5e7eb;
            border-right: none;
            border-radius: 8px 0 0 8px;
        }

        .form-control.with-icon {
            border-left: none;
            border-radius: 0 8px 8px 0;
        }

        .feature-item {
            padding: 16px 0;
            border-left: 3px solid var(--accent-color);
            padding-left: 20px;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0 8px 8px 0;
        }

        .text-accent {
            color: var(--accent-color) !important;
        }

        .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            border: none;
            background: none;
            color: #6b7280;
            cursor: pointer;
            z-index: 3;
        }

        .password-toggle:hover {
            color: var(--primary-color);
        }

        @media (max-width: 768px) {
            .welcome-section {
                text-align: center;
                margin-bottom: 2rem;
            }
        }
    </style>
</head>
<body>
<div class="bg-overlay"></div>

<!-- Header -->
<nav class="navbar navbar-expand-lg header-glass">
    <div class="container">
        <div class="navbar-brand d-flex align-items-center">
            <div class="university-logo me-3">
                <i class="bi bi-mortarboard-fill text-white fs-3"></i>
            </div>
            <div>
                <h5 class="text-white mb-0 fw-bold">Universidad Nacional</h5>
                <small class="text-white-50">Campus Virtual • Sistema Académico</small>
            </div>
        </div>
        <div class="navbar-nav">
            <div class="nav-item d-flex align-items-center text-white-50">
                <i class="bi bi-globe me-2"></i>
                <span class="small">www.universidad.edu</span>
            </div>
        </div>
    </div>
</nav>

<!-- Main Content -->
<div class="container-fluid position-relative" style="z-index: 1;">
    <div class="row min-vh-100 align-items-center py-5">
        <div class="col-12">
            <div class="row justify-content-center align-items-center g-5">

                <!-- Welcome Section -->
                <div class="col-lg-6 welcome-section">
                    <div class="text-white">
                        <h1 class="display-4 fw-bold mb-4">
                            Bienvenido al
                            <span class="d-block text-accent">Portal Académico</span>
                        </h1>
                        <p class="lead mb-5 text-white-75">
                            Accede a tu información académica, consulta tus calificaciones,
                            inscríbete a materias y mantente conectado con la comunidad universitaria.
                        </p>

                        <!-- Features -->
                        <div class="row g-4">
                            <div class="col-md-6">
                                <div class="feature-item">
                                    <h6 class="fw-semibold text-white mb-2">
                                        <i class="bi bi-laptop me-2 text-accent"></i>
                                        Sistema Integrado
                                    </h6>
                                    <p class="text-white-75 mb-0 small">
                                        Toda tu información académica en un solo lugar
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="feature-item">
                                    <h6 class="fw-semibold text-white mb-2">
                                        <i class="bi bi-clock me-2 text-accent"></i>
                                        Acceso 24/7
                                    </h6>
                                    <p class="text-white-75 mb-0 small">
                                        Disponible las 24 horas, todos los días del año
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="feature-item">
                                    <h6 class="fw-semibold text-white mb-2">
                                        <i class="bi bi-shield-check me-2 text-accent"></i>
                                        Seguro y Confiable
                                    </h6>
                                    <p class="text-white-75 mb-0 small">
                                        Tu información protegida con los más altos estándares
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="feature-item">
                                    <h6 class="fw-semibold text-white mb-2">
                                        <i class="bi bi-phone me-2 text-accent"></i>
                                        Multiplataforma
                                    </h6>
                                    <p class="text-white-75 mb-0 small">
                                        Accede desde cualquier dispositivo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Login Form -->
                <div class="col-lg-5 col-xl-4">
                    <div class="card login-card glass-effect border-0">
                        <div class="card-body p-5">
                            <!-- Logo and Title -->
                            <div class="text-center mb-5">
                                <div class="university-logo mx-auto mb-4">
                                    <i class="bi bi-mortarboard-fill text-white fs-2"></i>
                                </div>
                                <h3 class="fw-bold text-dark mb-2">Portal Académico</h3>
                                <p class="text-muted">Ingresa con tu cuenta institucional</p>
                            </div>

                            <!-- Login Form -->
                            <form id="loginForm">
                                <!-- Email Field -->
                                <div class="mb-4">
                                    <label for="email" class="form-label fw-semibold text-dark">
                                        Correo Electrónico
                                    </label>
                                    <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="bi bi-envelope text-muted"></i>
                                            </span>
                                        <input
                                            type="email"
                                            class="form-control with-icon"
                                            id="email"
                                            placeholder="tu.email@universidad.edu"
                                            required
                                        >
                                    </div>
                                </div>

                                <!-- Password Field -->
                                <div class="mb-4">
                                    <label for="password" class="form-label fw-semibold text-dark">
                                        Contraseña
                                    </label>
                                    <div class="input-group position-relative">
                                            <span class="input-group-text">
                                                <i class="bi bi-lock text-muted"></i>
                                            </span>
                                        <input
                                            type="password"
                                            class="form-control with-icon pe-5"
                                            id="password"
                                            placeholder="••••••••"
                                            required
                                        >
                                        <button
                                            type="button"
                                            class="password-toggle"
                                            onclick="togglePassword()"
                                        >
                                            <i class="bi bi-eye" id="passwordIcon"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Remember & Forgot -->
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="remember">
                                        <label class="form-check-label text-muted" for="remember">
                                            Recordarme
                                        </label>
                                    </div>
                                    <a href="#" class="text-decoration-none" style="color: var(--primary-color);">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>

                                <!-- Login Button -->
                                <button type="submit" class="btn btn-academic text-white w-100 mb-4">
                                    <i class="bi bi-box-arrow-in-right me-2"></i>
                                    Iniciar Sesión
                                </button>
                            </form>

                            <!-- Support Links -->
                            <div class="text-center">
                                <p class="text-muted mb-3">
                                    ¿Problemas para acceder?
                                    <a href="#" class="text-decoration-none" style="color: var(--primary-color);">
                                        Contacta soporte técnico
                                    </a>
                                </p>
                                <small class="text-muted">
                                    <i class="bi bi-shield-lock me-1"></i>
                                    Sistema protegido por políticas de seguridad institucional
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="header-glass mt-auto">
    <div class="container py-3">
        <div class="text-center text-white-50">
            <small>
                © 2024 Universidad Nacional. Todos los derechos reservados. |
                Soporte: <a href="mailto:soporte@universidad.edu" class="text-white text-decoration-none">soporte@universidad.edu</a>
            </small>
        </div>
    </div>
</footer>

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // Toggle password visibility
    function togglePassword() {
        const passwordField = document.getElementById('password');
        const passwordIcon = document.getElementById('passwordIcon');

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            passwordIcon.className = 'bi bi-eye-slash';
        } else {
            passwordField.type = 'password';
            passwordIcon.className = 'bi bi-eye';
        }
    }

    // Form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Basic validation
        if (!email || !password) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Simulate login process
        const submitButton = document.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>Iniciando sesión...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('¡Bienvenido al Portal Académico!\n\nCredenciales recibidas:\nEmail: ' + email + '\nRecordar: ' + (remember ? 'Sí' : 'No'));

            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Here you would typically redirect to the main portal
            // window.location.href = '/portal/dashboard.html';
        }, 2000);
    });

    // Add smooth focus effects
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.input-group')?.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.closest('.input-group')?.classList.remove('focused');
        });
    });

    // Floating animations for feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate__animated', 'animate__fadeInUp');
    });
</script>

<style>
    .input-group.focused .input-group-text,
    .input-group.focused .form-control {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 0.2rem rgba(30, 64, 175, 0.25);
    }

    .text-white-75 {
        color: rgba(255, 255, 255, 0.75) !important;
    }

    .text-white-50 {
        color: rgba(255, 255, 255, 0.5) !important;
    }
</style>
</body>
</html>