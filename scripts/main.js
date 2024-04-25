


// ---------
const listaCarrito = [];//productos guardados--
// agarro elementos del Dom-----------------------------
const box = document.getElementById('contenedor');//id main
const busquedaUsuario = document.getElementById('entraProd');//id del campo input
const buscarProducto = document.getElementById('buscoProd');
const mensajes = document.getElementById('mensaje');
const misProd = document.getElementById('carro');
const btnSave = document.getElementById('guardoProd');
const borrarProd = document.getElementById('clear')


// ------------eventos del boton buscar--------
buscarProducto.addEventListener('click',buscandoProducto);

// event btn clear------------
borrarProd.addEventListener('click',()=>{
    localStorage.clear();
    misProd.innerHTML=''
    for(let p of listaCarrito){
        p.precio=0;
    }
})


// ------------en este event es para comprar l producto--------------- 
btnSave.addEventListener('click',()=>{
    // saco el total para pagar--------  
    const sumaPago = listaCarrito.reduce((acc,p)=>acc+=p.precio,0);
    // console.log(typeof(listaCarrito));
    // le digo cuanto es $
    Swal.fire(`total a pagar ${sumaPago}`);
    
    
});



//cargo los productos en la pagina----------------
function cargoProd(lista){
   
    lista.forEach(e => {

        box.innerHTML += `<div class="card" style="width: 18rem;">
        <img src=${e.img} class="card-img-top" alt="foto de ${e.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title">${e.nombre}</h5>
          <p class="card-text ">$ ${e.precio}</p>
          <a  href="#" class="btn btn-primary compra" id=${e.id}>agregar</a>
        </div>
      </div>`
    });
    // para los botones de los productos
    const btnComprar = document.getElementsByClassName('compra');
    for(let b of btnComprar){
        b.addEventListener('click',()=>{
            // console.log('click en' +b.id)
            const buscoId = productos.find((e)=>e.id==b.id);
            if(buscarProducto){
                
                // voy guardando en local 
                localStorage.setItem('productos',JSON.stringify(buscoId));
                
                const listaProductosEnStorage = JSON.parse(localStorage.getItem('productos'));
                // traigo el obj parse y lo push a la lista
                listaCarrito.push(listaProductosEnStorage);
                // llamo a la funcion para que valla mostrando el carrito
                miCarrito(listaProductosEnStorage)
                
                
            }
            
        })
    }
}

// llamo a esta funcion para cargar prod en la pagina--

cargoProd(productos)

// muestra los productos que se busco si estan en productos.tipo-----
function buscandoProducto(){
    mensajes.innerText =`No se encontro ${busquedaUsuario.value}`;
    box.innerHTML=``;
    let listPoductos = productos.filter((e)=>e.nombre);
    
    for(let prod of listPoductos){
        
        if(prod.tipo.toLowerCase()==busquedaUsuario.value.toLowerCase()){
            mensajes.innerText='...'
            box.innerHTML += `<div class="card" style="width: 18rem;">
            <img src=${prod.img} class="card-img-top"  alt="foto de ${prod.nombre}">
            <div class="card-body text-center">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text ">$ ${prod.precio}</p>
            <a  href="#" class="btn btn-primary compra" id=${prod.id}>comprar</a>
            </div>
            </div>`
            
        }
        
    }
    // para los botones de los productos
    const btnCompra = document.getElementsByClassName('compra');
    for(let b of btnCompra){

        b.addEventListener('click',()=>{
            
            const buscoId = productos.find((e)=>e.id==b.id);
            if(buscarProducto){
                
                localStorage.setItem('productos',JSON.stringify(buscoId));
                const listaProductosEnStorage = JSON.parse(localStorage.getItem('productos'));
                listaCarrito.push(listaProductosEnStorage);
                miCarrito(listaProductosEnStorage);
                
                
            }
        });
    };
    
    
    
};

//  cargar el carrito visual --------

function miCarrito(prod){
    
   //va agregando a la tabla los productos cuando hace click
    misProd.innerHTML += `<tr>
    <td> ${prod.tipo}</td>
    <td> ${prod.nombre}</td>
    <td>$ ${prod.precio}</td>
    </tr>`  
};



