

let stockProductos = [
    {id: 1, nombre: "Jean Vogue", tipo: "Buzo", cantidad: 1, precio: 1200, img: './assets/img/productos/jean-vogue.png'},
    {id: 2, nombre: "Campera Classy", tipo: "Campera", cantidad: 1, precio: 2400, img: './assets/img/productos/campera-classy.png'},
    {id: 3, nombre: "Conjunto Pink", tipo: "Conjunto", cantidad: 1, precio: 3600, img: './assets/img/productos/conjunto-pink.png'},
    {id: 4, nombre: "Camisa Stone", tipo: "Camisa", cantidad: 1, precio: 600, img: './assets/img/productos/camisa-stone.png'},
    {id: 5, nombre: "Saco Green", tipo: "Saco", cantidad: 1, precio: 1900, img: './assets/img/productos/saco-green.png'},
    {id: 6, nombre: "Vestido Mondrian", tipo: "Vestido", cantidad: 1, precio: 3900, img: './assets/img/productos/vestido-mondrian.png'},
]

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('emptyCart');

const total = document.getElementById('totalCarrito');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito();
    }
})

emptyCart.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto','col-4','justify-content-center');
    div.innerHTML = `
    <img src=${producto.img} class="img-producto" alt="">
    <h3 class="nombreProducto">${producto.nombre}</h3>
    <p class="precioProducto">$${producto.precio}</p>
    <button id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div);





    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

})


const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find ((prod) => prod.id == prodId)
    carrito.push(item);
    actualizarCarrito ();
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId )
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito();
}


const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');
        div.innerHTML = `
        <img src=${prod.img} class="prodImgCarrito">
        <p class="cartProdName">${prod.nombre}</p>
        <p class="cartProdPrice">$${prod.precio}</p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="btn btn-primary">Eliminar</button>
        `

        contenedorCarrito.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito));

    })
    total.innerHTML = `Total: $` + carrito.reduce((acc, prod) => acc + prod.precio, 0)
}
