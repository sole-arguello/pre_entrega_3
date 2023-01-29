//traigo al contenedor padre
const contenedorProductos = document.getElementById("cardProductos")
const contenedorCarrito = document.getElementById("carritoContenedor")



let carrito = []

//recorro elarray
stokDeProductos.forEach(arrayProducto => {
    //creo el elem contenedor hijo
    const contenedorCard =  document.createElement("div")
    //creo su clase
    contenedorCard.classList.add("productos__contenedorGral--contCard", "col")
    contenedorCard.innerHTML = `
        <div class="productos__contenedorGral--contCard-card card h-100">
            <img class="img__card card-img-top" src=${arrayProducto.img} alt="producto lenceria">
            <div class="contenedor__info card-body">
                <h5 class="contenedor__info--titulo card-title fs-3">${arrayProducto.producto} 
                <span class=" fs-5 text-secondary"> - ${arrayProducto.modelo}</span></h5>
                <p class="contenedor__info--precio card-text fs-4">$ ${arrayProducto.precio}</p>
                <button id="agregar${arrayProducto.id}" class="contenedor__info--btn">Agregar al carrito</button>
            </div>
        </div>
    `
    //agrego los elementos al padre
    contenedorProductos.appendChild(contenedorCard);
    //se produce el evento del click en el boton
    const btnAgregar = document.getElementById(`agregar${arrayProducto.id}`)
    btnAgregar.addEventListener("click", () =>{
        //por cada click en un boton se agrega el producto
        agregarAlCarrito(arrayProducto.id)
        
    })
})   

//por parametro le doy el id del prod
const agregarAlCarrito = (prodId) => {
    //voy a comparar que el id del array coincida con el que recibe por parametro
    const item = stokDeProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
    actualizarCarrito()
    //console.log(carrito)
}

//elimina los del carrito no los del stock
const eliminarDelCarrito = (prodId) =>{
    //obtengo el elem del array
    const itemCarrito = carrito.fin((prod) => prod.id === prodId)
    const indice = carrito.indexOf(itemCarrito)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () =>{
    //cada vez que llamo a la funcio borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //recorre el array y lo llena con info actualizada
    carrito.forEach((arrayCarrito) => {
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carritoBody", "row")
        contItemsCarrito.innerHTML = `
            <p class="body__producto col">${arrayCarrito.producto}</P>
            <p class="body__precio col">Precio: ${arrayCarrito.precio}</p>
            <p class="body__cant col">Cantidad: <span id="cantidad">${arrayCarrito.cantidad}</span></p>
            <a id="eliminarDelCarrito${arrayCarrito.id}" class="body__btnElim col text-center ">🗑️</a>
        `
        contenedorCarrito.appendChild(contItemsCarrito)

        const btnEliminar = document.getElementById(`eliminarDelCarrito${arrayCarrito.id}`)
        btnEliminar.addEventListener("click", () => {
            eliminarDelCarrito(arrayCarrito.id)
        }) 
            
        
})
}