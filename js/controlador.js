//traigo al contenedor padre
const contenedorProductos = document.getElementById("cardProductos")
const contenedorCarrito = document.getElementById("carritoContenedor")
const contadorCarrito = document.getElementById("contadorCarrito")
const totalProductos = document.getElementById("precioTotal")
const btnVaciarCarrito = document.getElementById("vaciarCarrito")
const btnTodos = document.getElementById("todos")
const btnConjunto = document.getElementById("conjuntos")
const btnTop = document.getElementById("top")
const btnBombis = document.getElementById("bombis")

/*---------- storage (set Item) ----------------------*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//recorro elarray
function pintarCrad(categoria){
    //actualizo al html para spintar segun la categoria que elija
    contenedorProductos.innerHTML = "";
    
    let prodAMostrar;
    //pregunto si existe la categoria
    if(categoria){
        //guardo una copia el array original
        prodAMostrar = categoria
        console.log(prodAMostrar)
    }else{
        //sino existe la categoria que muestre el array productos
        prodAMostrar = productos
        console.log(prodAMostrar)
    }
    // recrroro la copia 
    prodAMostrar.forEach(elProducto => {
        //creo el elem contenedor hijo
        const contenedorCard =  document.createElement("div")
        //creo su clase
        contenedorCard.classList.add("productos__contenedorGral--contCard", "col")
        contenedorCard.innerHTML = `
            <div class="productos__contenedorGral--contCard-card card h-100">
                <img class="img__card card-img-top" src=${elProducto.img} alt="producto lenceria">
                <div class="contenedor__body card-body">
                    <div class="contenedor__body--info ">
                        <h2 class="contenedor__body--info--titulo card-title fs-4">${elProducto.titulo}</h2> 
                        <p class="contenedor__body--info--precio card-text fs-5 fw-semibold">$ ${elProducto.precio}</p>                   
                    </div>
                    <hr><p class="contenedor__body--info--precio card-text fs-6">Los talles disponibles
                    son<span class="fw-semibold mx-2">S - M - L - XL</span>y los podes elejir en
                    <span class="fw-semibold">Blanco - Negro - Gris - Beige - Rojo - Fuxia - Estampados</span></p> 
                    <button id="agregar${elProducto.id}" class="contenedor__body--btn btn btn-secondary text-dark">Agregar al carrito</button>
                </div>
            </div>  
       `
        //agrego los elementos al padre
        contenedorProductos.appendChild(contenedorCard);
        //escucho el evento del click en el boton agregar
        const btnAgregar = document.getElementById(`agregar${elProducto.id}`)
        //por cada click en un boton se agrega el producto
        btnAgregar.onclick = () =>{ agregarAlCarrito(elProducto.id) }
    }) 
}
pintarCrad()

//eventos que escucha los botones de las categorias
btnTodos.onclick = () => { pintarCrad() }
btnConjunto.onclick = () =>{ filtrarCategorias("Conjunto")/*console.log("1")*/}
btnTop.onclick = () =>{ filtrarCategorias("Top") /*console.log("2")*/}
btnBombis.onclick = () =>{ filtrarCategorias("Bombis") /*console.log("3")*/}

//funcion que filtra la categoria de productos 
const filtrarCategorias = (categoria) => {
    const filtrarCateg = productos.filter(prod => prod.categoria === categoria)
    //console.log(filtrarCateg)
    pintarCrad(filtrarCateg)
}

//por parametro le doy el id del prod
const agregarAlCarrito = (prodId) => {
    //para no repetir el producto
    const existe = carrito.some(prod => prod.id === prodId)
    if(existe){
        //encuentro el producto agregado y le sumo la cantidad
        const prod = carrito.map(prod => {
            if(prod.id === prodId){
                prod.cantidad ++              
            }
        })
    }else{
        //voy a comparar que el id del array coincida con el que recibe por parametro
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
        //console.log(carrito)
    }
    pintarProductosEnCarrito()
    //para que persistan los datos del carrito
    guardarLocal();
}
const pintarProductosEnCarrito = () =>{
    //cada vez que llamo a la funcio borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //recorre el array y lo llena con info actualizada
    carrito.forEach((arrayCarrito) => {
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carritoBody", "row")
        contItemsCarrito.innerHTML = `
            <img class="body__img col" src="${ arrayCarrito.img }">
            <p class="body__producto col">${arrayCarrito.titulo}</P>
            <p class="body__precio col">Precio: ${arrayCarrito.precio}</p>
            <p class="body__cant col">Cantidad: <span id="cantidad">${arrayCarrito.cantidad}</span></p>
            <p class="body__subtototal col">Sub-total: <span id="cantidad"> ${arrayCarrito.cantidad * arrayCarrito.precio}</span></p>
            
            <a id="eliminarDelCarrito${arrayCarrito.id}" class="body__btnElim col text-center "><i class="bi bi-trash3"></i></>
        `
        contenedorCarrito.appendChild(contItemsCarrito)

        //escucho el boton y elimino uno a uno los elementos del carrito
        const btnElim = document.getElementById(`eliminarDelCarrito${arrayCarrito.id}`)
        btnElim.onclick = () => {eliminarDelCarrito();/*console.log("elimino")*/}
        
    })
    //muestra el incremento del carrito
    contadorCarrito.innerText = carrito.length
    //por cada producto, el acumulador le sume precio al prod 
    totalProductos.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}
//elimina los productos del carrito NO del stock
const eliminarDelCarrito = (prodId) =>{
    //obtengo el elem del array por medio de su indice
    const itemCarrito = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(itemCarrito)
    carrito.splice(indice, 1)
    //para que actualice
    guardarLocal()
    pintarProductosEnCarrito()
}
//escucho el evento del boron vaciar carrito y borra todos los productos
btnVaciarCarrito.onclick = () => { 
    carrito.length = 0;
    //para que actualice
    guardarLocal() 
    pintarProductosEnCarrito();
}
//luego de cargar agregar al carrito pinto para que persistan los datos
pintarProductosEnCarrito()
/*------------- Storage (get Item)----------------------*/

const guardarLocal = () => { localStorage.setItem("carrito", JSON.stringify(carrito)) }

