// carrito.js
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function obtenerPrecioProducto(nombreProducto) {
    const precios = {
        'productoX': 19.99,
        'productoY': 24.99,
        'productoZ': 29.99,
        'productoW': 39.99,
        // Agrega más productos según sea necesario
    };

    return precios[nombreProducto] || 0;
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${producto.nombre} - Precio: ${producto.precio} - Cantidad: ${producto.cantidad} - Total: ${producto.total}`;

        // Agregar botón de borrar
        const btnBorrar = document.createElement('button');
        btnBorrar.className = 'btn btn-danger btn-borrar ml-3';
        btnBorrar.textContent = 'Borrar';
        btnBorrar.addEventListener('click', () => borrarProducto(index));

        li.appendChild(btnBorrar);
        listaCarrito.appendChild(li);
    });
}

function borrarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarTabla();
}

function actualizarTabla() {
    const tablaProductos = document.getElementById('tablaProductos');
    const precioFinalElement = document.getElementById('precioFinal');

    tablaProductos.innerHTML = '';

    let precioFinal = 0;

    carrito.forEach(producto => {
        const row = tablaProductos.insertRow();
        const cellNombre = row.insertCell(0);
        const cellCantidad = row.insertCell(1); // Agregado para la cantidad
        const cellPrecio = row.insertCell(2);

        cellNombre.textContent = producto.nombre;
        cellCantidad.textContent = producto.cantidad; // Agregado para la cantidad
        cellPrecio.textContent = `$${producto.total.toFixed(2)}`;

        precioFinal += producto.total;
    });

    // Actualizar el precio final
    precioFinalElement.textContent = `$${precioFinal.toFixed(2)}`;
}

function agregarAlCarrito(nombre, precio, cantidad) {
    console.log("Agregando al carrito:", nombre, precio, cantidad);

    const producto = {
        nombre,
        precio,
        cantidad,
        total: precio * cantidad
    };
    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
    actualizarTabla();
}

// Función para agregar producto desde el desplegable
function agregarDesdeDesplegable() {
    const selectProductos = document.getElementById('productos');
    const nombreProducto = selectProductos.value;
    const precioProducto = obtenerPrecioProducto(nombreProducto);
    const cantidad = 1;

    agregarAlCarrito(nombreProducto, precioProducto, cantidad);
}

// Función para agregar producto desde el formulario
function agregarProducto() {
    const nombreProducto = document.getElementById('productos').value;
    const precioProducto = obtenerPrecioProducto(nombreProducto);
    const cantidad = 1;

    agregarAlCarrito(nombreProducto, precioProducto, cantidad);
}

function finalizarCompra() {
    // Obtener datos del cliente
    const nombreCliente = document.getElementById('nombreCliente').value.trim();
    const rutCliente = document.getElementById('rutCliente').value.trim();
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Determinar si es CONSUMIDOR FINAL
    const tipoCliente = nombreCliente || rutCliente ? 'CLIENTE' : 'CONSUMIDOR FINAL';

    // Mostrar alerta con la información del cliente y productos en el carrito
    alert(`¡Compra finalizada!\nCliente: ${tipoCliente}\nProductos: ${JSON.stringify(carrito)}`);

    // Limpia el carrito y recarga la página (puedes ajustar esto según tus necesidades).
    localStorage.removeItem('carrito');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarCarrito();
});