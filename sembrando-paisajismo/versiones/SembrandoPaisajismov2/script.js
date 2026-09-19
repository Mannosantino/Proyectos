// Configuración de EmailJS
emailjs.init("sfJAyGX-cjg6LwG7L");

// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Tierra Orgánica Premium",
        categoria: "tierra",
        precio: 25000,
        descripcion: "Tierra rica en nutrientes para plantas de interior y exterior",
        imagen: "fas fa-seedling",
        popular: true,
        foto: "images/tierra-organica.jpg"
    },
    {
        id: 2,
        nombre: "Sustrato para Cactus",
        categoria: "tierra",
        precio: 18000,
        descripcion: "Mezcla especial para cactus y suculentas",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/sustrato-cactus.jpg"
    },
    {
        id: 3,
        nombre: "Rosa de Jardín",
        categoria: "plantas",
        precio: 45000,
        descripcion: "Hermosa rosa en maceta de 20cm",
        imagen: "fas fa-seedling",
        popular: true,
        foto: "images/rosa-jardin.jpg"
    },
    {
        id: 4,
        nombre: "Lavanda",
        categoria: "plantas",
        precio: 200,
        descripcion: "Planta aromática de lavanda",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/lavanda.jpg"
    },
    {
        id: 5,
        nombre: "Semillas de Tomate",
        categoria: "semillas",
        precio: 8500,
        descripcion: "Paquete de 50 semillas de tomate cherry",
        imagen: "fas fa-seedling",
        popular: true,
        foto: "images/semillas-tomate.jpg"
    },
    {
        id: 6,
        nombre: "Semillas de Albahaca",
        categoria: "semillas",
        precio: 6500,
        descripcion: "Semillas de albahaca orgánica",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/semillas-albahaca.jpg"
    },
    {
        id: 7,
        nombre: "Pala de Jardín",
        categoria: "herramientas",
        precio: 35000,
        descripcion: "Pala resistente para trabajos de jardinería",
        imagen: "fas fa-tools",
        popular: true,
        foto: "images/pala-jardin.jpg"
    },
    {
        id: 8,
        nombre: "Tijeras de Podar",
        categoria: "herramientas",
        precio: 28000,
        descripcion: "Tijeras profesionales para poda",
        imagen: "fas fa-tools",
        popular: false,
        foto: "images/tijeras-podar.jpg"
    },
    {
        id: 9,
        nombre: "Tierra para Bonsai",
        categoria: "tierra",
        precio: 22000,
        descripcion: "Sustrato especial para bonsai",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/tierra-bonsai.jpg"
    },
    {
        id: 10,
        nombre: "Orquídea Phalaenopsis",
        categoria: "plantas",
        precio: 75000,
        descripcion: "Elegante orquídea en flor",
        imagen: "fas fa-seedling",
        popular: true,
        foto: "images/orquidea-phalaenopsis.jpg"
    },
    {
        id: 11,
        nombre: "Semillas de Girasol",
        categoria: "semillas",
        precio: 7500,
        descripcion: "Semillas de girasol gigante",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/semillas-girasol.jpg"
    },
    {
        id: 12,
        nombre: "Regadera de Metal",
        categoria: "herramientas",
        precio: 42000,
        descripcion: "Regadera elegante de metal",
        imagen: "fas fa-tools",
        popular: true,
        foto: "images/regadera-metal.jpg"
    },
    {
        id: 13,
        nombre: "Tierra para Huerta",
        categoria: "tierra",
        precio: 30000,
        descripcion: "Tierra especial para cultivo de hortalizas",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/tierra-huerta.jpg"
    },
    {
        id: 14,
        nombre: "Cactus Echinopsis",
        categoria: "plantas",
        precio: 25000,
        descripcion: "Cactus decorativo fácil de cuidar",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/cactus-echinopsis.jpg"
    },
    {
        id: 15,
        nombre: "Semillas de Zanahoria",
        categoria: "semillas",
        precio: 5500,
        descripcion: "Semillas de zanahoria naranja",
        imagen: "fas fa-seedling",
        popular: false,
        foto: "images/semillas-zanahoria.jpg"
    },
    {
        id: 16,
        nombre: "Rastrillo de Jardín",
        categoria: "herramientas",
        precio: 32000,
        descripcion: "Rastrillo para limpieza de hojas",
        imagen: "fas fa-tools",
        popular: false,
        foto: "images/rastrillo-jardin.jpg"
    }
];

// Estado de la aplicación
let carrito = [];
let productosFiltrados = [...productos];
let filtrosActivos = {
    categorias: ['tierra', 'plantas', 'semillas', 'herramientas'],
    precioMaximo: 200000,
    orden: 'popular'
};

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const contactModal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');
const clearFilters = document.getElementById('clearFilters');
const productCount = document.getElementById('productCount');
const contactForm = document.getElementById('contactForm');
const checkoutBtn = document.getElementById('checkoutBtn');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const couponMessage = document.getElementById('couponMessage');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
    actualizarContadorProductos();
    configurarEventListeners();
    configurarFiltros();
});

// Configurar event listeners
function configurarEventListeners() {
    // Carrito
    cartBtn.addEventListener('click', toggleCarrito);
    closeCart.addEventListener('click', toggleCarrito);
    checkoutBtn.addEventListener('click', finalizarCompra);
    
    // Modal de contacto
    contactBtn.addEventListener('click', toggleModalContacto);
    closeModal.addEventListener('click', toggleModalContacto);
    overlay.addEventListener('click', cerrarModales);
    
    // Búsqueda
    searchBtn.addEventListener('click', buscarProductos);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarProductos();
        }
    });
    
    // Formulario de contacto
    contactForm.addEventListener('submit', enviarMensaje);
    
    // Scroll del header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Evento para aplicar cupón
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', aplicarCupon);
    }
}

// Configurar filtros
function configurarFiltros() {
    // Filtros de categoría
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const categoria = this.value;
            if (this.checked) {
                if (!filtrosActivos.categorias.includes(categoria)) {
                    filtrosActivos.categorias.push(categoria);
                }
            } else {
                filtrosActivos.categorias = filtrosActivos.categorias.filter(cat => cat !== categoria);
            }
            aplicarFiltros();
        });
    });
    
    // Filtro de precio
    priceRange.addEventListener('input', function() {
        const precio = parseInt(this.value);
        priceValue.textContent = `$${formatearPrecio(precio)}`;
        filtrosActivos.precioMaximo = precio;
        aplicarFiltros();
    });
    
    // Ordenamiento
    sortSelect.addEventListener('change', function() {
        filtrosActivos.orden = this.value;
        aplicarFiltros();
    });
    
    // Limpiar filtros
    clearFilters.addEventListener('click', limpiarFiltros);
}

// Aplicar filtros
function aplicarFiltros() {
    productosFiltrados = productos.filter(producto => {
        const cumpleCategoria = filtrosActivos.categorias.includes(producto.categoria);
        const cumplePrecio = producto.precio <= filtrosActivos.precioMaximo;
        return cumpleCategoria && cumplePrecio;
    });
    
    // Aplicar ordenamiento
    ordenarProductos();
    
    // Aplicar búsqueda si hay texto
    const busqueda = searchInput.value.toLowerCase();
    if (busqueda) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda) ||
            producto.descripcion.toLowerCase().includes(busqueda)
        );
    }
    
    renderizarProductos();
    actualizarContadorProductos();
}

// Ordenar productos
function ordenarProductos() {
    switch (filtrosActivos.orden) {
        case 'price-low':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-high':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'name':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'popular':
        default:
            productosFiltrados.sort((a, b) => b.popular - a.popular);
            break;
    }
}

// Buscar productos
function buscarProductos() {
    aplicarFiltros();
}

// Limpiar filtros
function limpiarFiltros() {
    // Resetear checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    // Resetear precio
    priceRange.value = 200000;
    priceValue.textContent = '$200.000';
    
    // Resetear orden
    sortSelect.value = 'popular';
    
    // Resetear búsqueda
    searchInput.value = '';
    
    // Resetear estado
    filtrosActivos = {
        categorias: ['tierra', 'plantas', 'semillas', 'herramientas'],
        precioMaximo: 200000,
        orden: 'popular'
    };
    
    aplicarFiltros();
}

// Renderizar productos
function renderizarProductos() {
    productsGrid.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666;">No se encontraron productos</h3>
                <p style="color: #999;">Intenta ajustar los filtros o la búsqueda</p>
            </div>
        `;
        return;
    }
    
    productosFiltrados.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.foto}" alt="${producto.nombre}" style="width:100%;height:200px;object-fit:cover;border-radius:10px;">
                ${producto.popular ? '<span class="product-badge">Popular</span>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${obtenerNombreCategoria(producto.categoria)}</div>
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-price">$${formatearPrecio(producto.precio)}</div>
                <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                    <i class="fas fa-cart-plus"></i>
                    Agregar al Carrito
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Obtener nombre de categoría
function obtenerNombreCategoria(categoria) {
    const nombres = {
        'tierra': 'Tierra y Sustratos',
        'plantas': 'Plantas y Flores',
        'semillas': 'Semillas',
        'herramientas': 'Herramientas'
    };
    return nombres[categoria] || categoria;
}

// Formatear precio
function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR');
}

// Actualizar contador de productos
function actualizarContadorProductos() {
    productCount.textContent = `${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''}`;
}

// Carrito de compras
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

function actualizarCarrito() {
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Renderizar items
    cartItems.innerHTML = '';
    
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '$0';
        return;
    }
    
    carrito.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="${item.imagen}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.nombre}</div>
                <div class="cart-item-price">$${formatearPrecio(item.precio)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar total
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    if (descuentoAplicado > 0) {
        total = total - (total * descuentoAplicado);
    }
    cartTotal.textContent = `$${formatearPrecio(total)}`;
}

function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== productoId);
        }
        actualizarCarrito();
    }
}

function toggleCarrito() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }

    fetch('crear_preferencia.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito })
    })
    .then(res => res.json())
    .then(data => {
        if (data.init_point) {
            window.location.href = data.init_point; // Redirige a Mercado Pago
        } else {
            mostrarNotificacion('Error al iniciar el pago', 'error');
        }
    })
    .catch(() => mostrarNotificacion('Error al conectar con el servidor', 'error'));
}

// Modal de contacto
function toggleModalContacto() {
    contactModal.classList.toggle('active');
    overlay.classList.toggle('active');
}

function cerrarModales() {
    cartSidebar.classList.remove('active');
    contactModal.classList.remove('active');
    overlay.classList.remove('active');
}

// Enviar mensaje de contacto
function enviarMensaje(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const nombre = e.target[0].value;
    const email = e.target[1].value;
    const mensaje = e.target[2].value;
    
    // Mostrar estado de carga
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Configurar EmailJS
    const templateParams = {
        from_name: nombre,
        from_email: email,
        message: mensaje,
        to_name: 'Sembrando Jardinería'
    };
    
    emailjs.send('default_service', 'template_vh3zran', templateParams)
        .then(function(response) {
            mostrarNotificacion('Mensaje enviado correctamente', 'success');
            e.target.reset();
        }, function(error) {
            mostrarNotificacion('Error al enviar el mensaje', 'error');
            console.error(error);
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Notificaciones
function mostrarNotificacion(mensaje, tipo = 'info', posicion = 'right') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo} ${posicion}`;
    notificacion.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${mensaje}</span>
    `;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        ${posicion === 'left' ? 'left: 20px;' : 'right: 20px;'}
        background: ${tipo === 'success' ? '#4caf50' : tipo === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(${posicion === 'left' ? '-400px' : '400px'});
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// =====================
// === CUPONES FINAL ===
// =====================

// Definición de cupones
const cupones = {
    "JARDIN10": 0.10,
    "JARDIN15": 0.15
};

// Evento para aplicar cupón
if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', aplicarCupon);
}

function aplicarCupon() {
    const codigo = couponInput.value.trim().toUpperCase();
    if (cupones[codigo]) {
        descuentoAplicado = cupones[codigo];
        cuponUsado = codigo;
        // Notificación emergente a la izquierda
        mostrarNotificacion(`Cupón aplicado: ${codigo} (${descuentoAplicado * 100}% OFF)`, 'success', 'left');
        couponMessage.textContent = '';
        actualizarCarrito();
    } else {
        descuentoAplicado = 0;
        cuponUsado = "";
        // Notificación emergente a la izquierda
        mostrarNotificacion('Cupón inválido', 'error', 'left');
        couponMessage.textContent = '';
        actualizarCarrito();
    }
}


