//traigo al contenedor padre
const contenedorProductos = document.getElementById("cardProductos")
const contenedorCarrito = document.getElementById("carritoContenedor")
let contadorCarrito = document.getElementById("contadorCarrito")
const totalProductos = document.getElementById("precioTotal")
//botones
const btnVaciarCarrito = document.getElementById("vaciarCarrito")
const btnTodos = document.getElementById("todos")
const btnConjunto = document.getElementById("conjuntos")
const btnTop = document.getElementById("top")
const btnBombis = document.getElementById("bombis")
const btnMjeCarritoVacio = document.getElementById("btnCarrito")


/*---------- storage (set Item) ----------------------*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//recorro elarray
const pintarCrad = (categoria) => {
    //actualizo al html para pintar segun la categoria que elija
    contenedorProductos.innerHTML = "";
    
    let prodAMostrar;
    //pregunto si existe la categoria
    if(categoria){
        //guardo una copia el array original
        prodAMostrar = categoria
    }else{
        //sino existe la categoria que muestre el array original
        prodAMostrar = productos
    }
    // recrroro la copia 
    prodAMostrar.forEach(elProducto => {
        //creo el elem contenedor hijo - su clase - y el bloque de elementos del del dom
        const contenedorCard =  document.createElement("div")
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
        //escucho el evento del click en el boton agregar y por c/click agrego un prod
        const btnAgregar = document.getElementById(`agregar${elProducto.id}`)
        btnAgregar.onclick = () =>{ 
            agregarAlCarrito(elProducto.id)
            contadorProdEncarrito ++; 
            contadorCarrito.innerText = contadorProdEncarrito 
         }
    }) 
}
pintarCrad()


//eventos que escucha los botones de las categorias
btnTodos.onclick = () => { pintarCrad() }
btnConjunto.onclick = () =>{ filtrarCategorias("Conjunto")}
btnTop.onclick = () =>{ filtrarCategorias("Top")}
btnBombis.onclick = () =>{ filtrarCategorias("Bombis")}


//funcion que filtra la categoria de productos 
const filtrarCategorias = (categoria) => {
    
    const filtrarCateg = productos.filter(prod => prod.categoria === categoria)
    pintarCrad(filtrarCateg)
}

let contadorProdEncarrito = carrito.length;
//funcion que pinta el carrito
const pintarProductosEnCarrito = () =>{
    //cada vez que llamo a la funcio borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //muestra el incremento del carrito
    contadorCarrito.innerText = contadorProdEncarrito;
    //recorre el array y lo llena con info actualizada
    carrito.forEach((arrayCarrito) => {
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carritoBody", "row", "py-2")
        contItemsCarrito.innerHTML = `
            <img class="body__img col-lg img-fluid " src="${ arrayCarrito.img }">
            <p class="body__producto col-lg pt-lg-5 fs-5">${arrayCarrito.titulo}</P>
            <p class="body__precio col-lg pt-lg-5 fs-5">Precio: <span class="fw-semibold">$${arrayCarrito.precio}</span></p>
            <div class="body__cant col-lg pt-lg-5">
                <span class="signos " id="restar${arrayCarrito.id}"><i class="bi bi-dash-square"></i></span>
                <span  class="num px-2 fs-3" id="cantidad">${arrayCarrito.cantidad}</span> 
                <span class="signos " id="sumar${arrayCarrito.id}"><i class="bi bi-plus-square"></i></span>
            </div>

            <p class="body__subtototal col-lg pt-lg-5 fs-5">Sub-total: <span class="fw-semibold " id="cantidad"> $${arrayCarrito.cantidad * arrayCarrito.precio}</span></p>
            
            <a id="eliminarDelCarrito${arrayCarrito.id}" class="body__btnElim col-lg pt-lg-5"><i class="bi bi-trash3"></i></>
        `
        contenedorCarrito.appendChild(contItemsCarrito)

        //escucho los botones de suma y resta
        const btnRestar = document.getElementById(`restar${arrayCarrito.id}`)
        btnRestar.onclick = () => {
            if(arrayCarrito.id && arrayCarrito.cantidad > 0){  
                arrayCarrito.cantidad --;
                contadorProdEncarrito --; 
                contadorCarrito.innerText = contadorProdEncarrito;
        } 
        guardarLocal(); 
        pintarProductosEnCarrito() }


        const btnSumar = document.getElementById(`sumar${arrayCarrito.id}`)
        btnSumar.onclick = () => { 
            arrayCarrito.cantidad ++; 
            contadorProdEncarrito ++; 
            contadorCarrito.innerText = contadorProdEncarrito; 
            guardarLocal(); 
            pintarProductosEnCarrito() }

        //escucho el boton y elimino uno a uno los elementos del carrito
        const btnTachitoElim = document.getElementById(`eliminarDelCarrito${arrayCarrito.id}`)
        btnTachitoElim.onclick = () => { eliminarDelCarrito(arrayCarrito.id) }
        
    })

    //por cada producto, el acumulador le sume precio al prod 
    totalProductos.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}
//funcion que agrga productos al carrito - por parametro le doy el id del prod
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

//funcion que elimina los productos del carrito NO del stock
const eliminarDelCarrito = (prodId, cantidad) =>{
    //obtengo el elem del array por medio de su indice
    const itemCarrito = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(itemCarrito)
    carrito.splice(indice, 1)

    // contadorProdEncarrito = contadorProdEncarrito - cantidad; 
    // contadorCarrito.innerText = contadorProdEncarrito 
    //para que actualice
    guardarLocal()
    pintarProductosEnCarrito()
}
//escucho el evento del boton vaciar carrito y borra todos los productos
btnVaciarCarrito.onclick = () => { 
    carrito.length = 0;
    //para que actualice y luego pinte
    guardarLocal() 
    pintarProductosEnCarrito();
}
//luego de cargar agregar al carrito pinto para que persistan los datos
pintarProductosEnCarrito()


/*------------- Storage (get Item)----------------------*/

const guardarLocal = () => { localStorage.setItem("carrito", JSON.stringify(carrito)) }
