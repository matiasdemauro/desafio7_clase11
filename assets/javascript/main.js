
const tituloo = document.getElementById('title');
tituloo.innerHTML = `
<h1 class='d-flex justify-content-center'>PRODUCTOS</h1>
`


//productos[0].nombre='hola'  //puedeo cambiar una propiedad del elemento
const contenedorProductos = document.getElementById('contenedorProductos');
//una vez capturado el div de id 'contenedorProductos' voy a modificar ese elemento a traves del DOM utilizando innerHTML:
contenedorProductos.innerHTML=`
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <a href="#" class="btn btn-primary botonCompra">Go somewhere</a>
            </div>
        </div>
`
//pinto mis cards con todos los elementos del array objeto.
function mostrarProducto(arrayProductos){
    contenedorProductos.innerHTML=''
    arrayProductos.forEach(element => {
    contenedorProductos.innerHTML+=`
    <div class="card" style="width: 18rem;">
    <img src="${element.img}" class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">$${element.precio}</p>
        <a href="#" class="btn btn-primary botonCompra">Agregar al carrito</a>
    </div>
</div>
`  
    });
};
mostrarProducto(productos);
////////////////////////////////////////////


//CARRITO//
let btn_compra = document.querySelectorAll('.botonCompra');
console.log(btn_compra);
//almaceno todos los botones en btn_compra

for (let boton of btn_compra){
    boton.addEventListener('click' , agregar_a_carrito);

}
//Necesito llevar un registro de lo que se va agregando al carrito, por ello creo un arreglo carrito = []
let carrito = [];

function agregar_a_carrito(e){
  //  console.log('El evento es:' , e.target); //e.target me indica en que nodo esta el boton, funciona como un 'id' pero es dinamico.
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
   // console.log(padre);
  //  console.log(abuelo);
    // 56,58 y 59 : Me indica quien es el padre&abuelo del boton seleccionado.

    let nombre_producto = padre.querySelector('h5').textContent;
    //console.log(nombre_producto);
    let precio_producto = padre.querySelector('p').textContent;
    //console.log(precio_producto);
    let imagen_producto = abuelo.querySelector('img').src;
    //console.log(imagen_producto);
    //una vez capturado los datos, creo el objeto de interes.
    let producto_carrito = {
        nombre : nombre_producto,
        img : imagen_producto,
        precio : precio_producto,
        cantidad : 1
    };
    //console.log(producto_carrito);
    carrito.push(producto_carrito); 
    console.log(carrito);
    //Lo convierto a un string
    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem('carrito' , arreglo_JSON);
    console.log(carrito);
    
    mostrar_carrito(producto_carrito);

    
    
    
}
function mostrar_carrito(producto_carrito){
    //creo una fila
    let fila = document.createElement('tr');
    fila.innerHTML = ` 
    <td><img src='${producto_carrito.img}' class='img'</td> 
    <td>${producto_carrito.nombre}</td>
    <td> ${producto_carrito.cantidad} </td>
    <td> ${producto_carrito.precio}</td>
    <td><button class='btn-danger borrar_elemento'>
    Borrar</button></td>
    `
    let table = document.getElementById('tbody');
    table.append(fila);
    let botones_delete = document.getElementById('borrar_elemento');
    botones_delete = document.querySelectorAll('.borrar_elemento');
    for(let boton of botones_delete) {
        boton.addEventListener('click' , borrar_produ);
    }

}
function borrar_produ(e){
    padre = e.target.parentNode.parentNode; //<tr>
    console.log(padre);
    padre.remove();
}
