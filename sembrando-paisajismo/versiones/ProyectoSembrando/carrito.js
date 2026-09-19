// Función para formatear números en formato argentino
function formatearPrecio(numero) {
    return numero.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Objeto para almacenar los precios de los productos
const precios = {
    'maceta-fibrocemento': 0,
    'maceta-barro': 0,
    'maceta-plastico': 0,
    'plantas-florales': 0,
    'arbustos': 0,
    'cactus': 0,
    'citricos': 0,
    'orquideas': 0,
    'carnivoras': 0,
    'bonsai': 0,
    'tierra-bolsa': 0,
    'tierra-camion': 0,
    'aspersores': 0,
    'bombas': 0,
    'accesorios-riego': 0
};

// Carrito de compras
let carrito = {};

// Función para mostrar/ocultar el modal del carrito
function toggleCarrito() {
    const modal = document.getElementById('carrito-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');
    if (!contador) {
        console.error('Contador del carrito no encontrado');
        return;
    }
    const total = Object.values(carrito).reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const total = Object.values(carrito).reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('carrito-total').textContent = formatearPrecio(total);
}

// Función para mostrar notificación
function mostrarNotificacion(nombreProducto) {
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${nombreProducto} se agregó al carrito`,
        icon: 'success',
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#f4f7f1',
        iconColor: '#2d5a27',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            content: 'swal-custom-content'
        }
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    try {
        // Verificar que el producto existe y tiene precio
        if (!precios[productoId] && precios[productoId] !== 0) {
            console.error('Precio no encontrado para el producto:', productoId);
            return;
        }

        const precio = precios[productoId];
        const productoElement = document.querySelector(`[data-id="${productoId}"]`);
        
        if (!productoElement) {
            console.error('Elemento del producto no encontrado:', productoId);
            return;
        }

        const nombreProducto = productoElement.querySelector('h3').textContent;
        
        // Tratamiento especial para tierra por camión
        if (productoId === 'tierra-camion') {
            carrito[productoId] = {
                nombre: nombreProducto + ' (A PRESUPUESTAR)',
                precio: 0,
                cantidad: 1,
                esPresupuesto: true
            };
        } else {
            // Agregar o actualizar el producto en el carrito
            if (carrito[productoId]) {
                carrito[productoId].cantidad++;
            } else {
                carrito[productoId] = {
                    nombre: nombreProducto,
                    precio: precio,
                    cantidad: 1
                };
            }
        }

        // Actualizar la interfaz
        actualizarCarritoUI();
        actualizarContadorCarrito();
        
        // Mostrar notificación
        mostrarNotificacion(nombreProducto);

    } catch (error) {
        console.error('Error al agregar al carrito:', error);
    }
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(productoId, cambio) {
    if (carrito[productoId]) {
        carrito[productoId].cantidad += cambio;
        
        if (carrito[productoId].cantidad <= 0) {
            delete carrito[productoId];
        }
        
        actualizarCarritoUI();
        actualizarContadorCarrito();
    }
}

// Función para actualizar la interfaz del carrito
function actualizarCarritoUI() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoEmpty = document.getElementById('carrito-empty');
    
    if (!carritoItems || !carritoEmpty) {
        console.error('Elementos del carrito no encontrados');
        return;
    }

    carritoItems.innerHTML = '';
    
    if (Object.keys(carrito).length === 0) {
        carritoEmpty.style.display = 'block';
        carritoItems.style.display = 'none';
    } else {
        carritoEmpty.style.display = 'none';
        carritoItems.style.display = 'block';
        
        Object.entries(carrito).forEach(([id, item]) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrito-item';
            
            // Mostrar diferente si es un item a presupuestar
            if (item.esPresupuesto) {
                itemElement.innerHTML = `
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                    </div>
                    <div class="precio-unitario">
                        A presupuestar
                    </div>
                    <div class="carrito-item-cantidad">
                        <button class="cantidad-btn" onclick="actualizarCantidad('${id}', -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="cantidad-btn" onclick="actualizarCantidad('${id}', 1)">+</button>
                    </div>
                    <div class="precio-total">
                        A presupuestar
                    </div>
                `;
            } else {
                itemElement.innerHTML = `
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                    </div>
                    <div class="precio-unitario">
                        $${formatearPrecio(item.precio)}
                    </div>
                    <div class="carrito-item-cantidad">
                        <button class="cantidad-btn" onclick="actualizarCantidad('${id}', -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="cantidad-btn" onclick="actualizarCantidad('${id}', 1)">+</button>
                    </div>
                    <div class="precio-total">
                        $${formatearPrecio(item.precio * item.cantidad)}
                    </div>
                `;
            }
            carritoItems.appendChild(itemElement);
        });
    }
    
    actualizarTotal();
}

// Función para finalizar la compra
function finalizarCompra() {
    if (Object.keys(carrito).length === 0) {
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'Por favor, agrega productos antes de finalizar la compra',
            icon: 'warning'
        });
        return;
    }
    
    // Crear el mensaje para WhatsApp
    let mensaje = "¡Hola! Me gustaría realizar el siguiente pedido:\n\n";
    let total = 0;

    Object.entries(carrito).forEach(([id, item]) => {
        const subtotal = item.precio * item.cantidad;
        mensaje += `▪️ ${item.nombre}\n`;
        mensaje += `   Cantidad: ${item.cantidad}\n`;
        mensaje += `   Precio unitario: $${formatearPrecio(item.precio)}\n`;
        mensaje += `   Subtotal: $${formatearPrecio(subtotal)}\n\n`;
        total += subtotal;
    });

    mensaje += `💰 Total del pedido: $${formatearPrecio(total)}`;

    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Mostrar confirmación antes de enviar
    Swal.fire({
        title: '¿Confirmar pedido?',
        text: 'Se abrirá WhatsApp para finalizar tu compra',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Detectar si es dispositivo móvil
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Construir la URL de WhatsApp según el dispositivo
            const phoneNumber = '5491135908522';
            const whatsappURL = isMobile
                ? `whatsapp://send?phone=${phoneNumber}&text=${mensajeCodificado}`
                : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${mensajeCodificado}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappURL, '_blank');
            
            // Limpiar el carrito
            carrito = {};
            actualizarCarritoUI();
            actualizarContadorCarrito();
            toggleCarrito();

            // Mostrar mensaje de éxito
            Swal.fire({
                title: '¡Gracias por tu compra!',
                text: 'Tu pedido ha sido enviado a WhatsApp',
                icon: 'success'
            });
        }
    });
}

// Función para establecer el precio de un producto
function establecerPrecio(productoId, precio) {
    precios[productoId] = precio;
    const precioElement = document.querySelector(`[data-id="${productoId}"] .amount`);
    if (precioElement) {
        precioElement.textContent = formatearPrecio(precio);
    }
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('carrito-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Establecer precios de los productos
document.addEventListener('DOMContentLoaded', function() {
    
    // Macetas
    establecerPrecio('maceta-fibrocemento', 30000);
    establecerPrecio('maceta-barro', 30000);
    establecerPrecio('maceta-plastico', 20000);
    
    // Plantas
    establecerPrecio('plantas-florales', 10000);
    establecerPrecio('arbustos', 45000);
    establecerPrecio('cactus', 20000);
    establecerPrecio('citricos', 25000);
    establecerPrecio('orquideas', 60000);
    establecerPrecio('carnivoras', 35000);
    establecerPrecio('bonsai', 70000);
    
    // Sustratos
    establecerPrecio('tierra-bolsa', 45000);
    establecerPrecio('tierra-camion', 0); // Precio 0 porque es a presupuestar
    
    // Riego
    establecerPrecio('aspersores', 10000);
    establecerPrecio('bombas', 15000);
    establecerPrecio('accesorios-riego', 30000);
}); 