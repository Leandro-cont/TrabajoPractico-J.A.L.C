
let imgProductos = ['../imagenes/panCasero.png', '../imagenes/Aceite_Natura.png', '../imagenes/Arroz_Gallo.png', '../imagenes/Arroz_Molto.png', '../imagenes/Azucar .png', '../imagenes/Cafe.png', '../imagenes/carnes.png', '../imagenes/Fideos_Canale.png', '../imagenes/Galletitas_Chocolinas.png', '../imagenes/Harina.png', '../imagenes/huevos.png', '../imagenes/Leche_La Serenisima.png', '../imagenes/lecheAlpura.png', '../imagenes/Manteca.png', '../imagenes/Mermelada_Frutilla.png', '../imagenes/Picadillo_carne.png', '../imagenes/Pure_Tomates.png', '../imagenes/Shampoo_Dove.png', '../imagenes/Shampoo_Elvive.png', '../imagenes/carroDeCompras.png']
let arrProductos = [        'Pan Casero x Kg',        `Aceite Natura x 1LTs`,            'Arroz Gallo x kg',           'Arroz Molto x kg',             'Azucar x kg',            'cafe x 170 grs',        'Paleta x kg',            'Fideos x 1Kg',                   'Galletitas x 250grs',                   'Harina x 1kg',          'huevos x 12unid',         'leche x 1lts',                     'Leche x 1 lts',                 'Manteca x 250 grs',                'Mermelada ',                    'Picadillo carne',                'Pure tomates ',            'shampoo 750cc',                      'shampoo 250cc',            'Hace tu compra..ya!']
let arrPrecios = [1500, 1800, 1600, 1500, 1050, 3500, 7000, 1300, 1200, 1000, 4500, 1500, 1600, 2000, 1800, 1000, 1500, 2500, 2600, 0];
let arrStockProductos = [50, 30, 20, 15, 15, 30, 20, 10, 5, 55, 20, 25, 50, 30, 54, 50, 45, 45, 15, 0];
let pagProd = 1;
let valorAcumuladoCarrito = 0;

cargaCard(pagProd);
// botones siguiente atras para recorrer productos a comprar
let btnSiguiente = document.getElementById("btnSiguiente");
let btnAtras = document.getElementById("btnAtras");
//click en boton pagina adelante
btnSiguiente.addEventListener('click', () => {

    /*console.log(pagProd);*/
    let numeroPagina = pagProd;
    let At_sig = "siguiente"
    pagProd = cambiarPagina(numeroPagina, At_sig);
    cargaCard(pagProd);
})
// click en boton pagina atras
btnAtras.addEventListener('click', () => {

    /* console.log(pagProd);*/
    let numeroPagina = pagProd;
    let At_sig = "atras"
    pagProd = cambiarPagina(numeroPagina, At_sig);
    cargaCard(pagProd);
})

//control de numero de paginas a cargar
function cambiarPagina(numeroPagina, At_sig) {

    if ((numeroPagina > 0) & (numeroPagina < ((arrProductos.length) / 8)) & (At_sig === "siguiente")) {
        numeroPagina++   // subir pagina
        cargaCard(pagProd);
    } else if ((numeroPagina > 1) & (At_sig === "atras")) {
        numeroPagina--// bajar pagina
        cargaCard(pagProd);
    }
    return numeroPagina; // retorno numero pagina para actualizar
}

//cargar los 8 productos a mostrar desde el arreglo
function cargaCard(pagProd) {
    let numPaginaActual = pagProd;

    for (i = 0; i < (8); i++) {
        let indiceRelativo = i + 8 * (numPaginaActual - 1);
        if (indiceRelativo > (arrProductos.length - 1)) { indiceRelativo = arrProductos.length - 1; }
        document.getElementById("primero").innerHTML = "Pagina..." + pagProd
        let cambioImg = document.querySelector(".tarjeta");
        let imagen = cambioImg.querySelector(".prod_" + (i + 1));// dentro del grupo de las tarjetas busco el producto i
        imagen.src = imgProductos[indiceRelativo];// cambiar foto de producto desde arreglo
        document.getElementById(`nombreProducto${i + 1}`).innerHTML = arrProductos[indiceRelativo];//cambio nombre
        document.getElementById(`precioProducto${i + 1}`).innerHTML = arrPrecios[indiceRelativo];//cambio Precio
    }
}


// Funcion que se ejecuta al hacer clic en cualquier botón para cargar en carrito
function clickComprar(datoCantidad, tarjetaNum, numPagina) {
    let cantComprada = datoCantidad;
    let numeroTarjeta = tarjetaNum;
    let paginaActual = numPagina;
    let numProductoComprado = (8 * (paginaActual - 1) + numeroTarjeta) - 1
    let precioProdComprado = arrPrecios[numProductoComprado];

    if ((arrStockProductos[numProductoComprado] < cantComprada) || (numProductoComprado == (arrProductos.length - 1))) {

        document.getElementById(`precioProducto${numeroTarjeta}`).innerHTML = "Quedan en stock : " + arrStockProductos[numProductoComprado] + "Productos "

    } else if ((cantComprada !== 0) & (numProductoComprado < (arrProductos.length - 1))) {

        let stockAnterior = arrStockProductos[numProductoComprado]
        arrStockProductos[numProductoComprado] = stockAnterior - cantComprada;
        agregarAlCarrito(cantComprada, precioProdComprado);
        alert("Producto agregado al carrito..!");
        cargaCard(paginaActual);

    }

}


function agregarAlCarrito(cantidadComprada, valorProducto) {
    let costoProdComprado = valorProducto;
    let cantidadProductosComprados = cantidadComprada;
    let valorCompra = cantidadProductosComprados * costoProdComprado;
    valorAcumuladoCarrito = valorAcumuladoCarrito + valorCompra;
    document.getElementById("TotalCompra").innerHTML = "Total Compra       $   " + valorAcumuladoCarrito;

}

let btncancelarCompra = document.getElementById('cancelarCompra');
let btncomprarCarrito = document.getElementById('ComprarCarrito');
btncancelarCompra.addEventListener('click', () => { cancelarCompra(); });
btncomprarCarrito.addEventListener('click', () => { confirmarCompra(); });

function cancelarCompra() {
    alert("Cancelar compra ");
    window.location.href = './index.html';
}

let arrStockCorriente = [];
function confirmarCompra() {

    guardarProductos();

}



// guardar array stock en un string

function guardarProductos() {

    document.getElementById("TotalCompra").innerHTML = "Tconf compra..dentro   "
    let stringStockActual = "";
    const nombreArchivo = 'StockActual.txt';
    for (let i = 0; i < arrStockProductos.length; i++) {


        stringStockActual = stringStockActual + `${arrStockProductos[i]} `;
        document.getElementById("TotalCompra").innerHTML = ".dentro   " + stringStockActual

    }

    /*fs.writeFileSync(nombreArchivo,stringStockActual);*/
}


// Adir el evento click a cada boton


let tarjeta1 = document.getElementById('comprarProducto1');
tarjeta1.addEventListener('click', () => { clickComprar(parseInt(tarjeta1.previousElementSibling.value), 1, pagProd); });

let tarjeta2 = document.getElementById('comprarProducto2');
tarjeta2.addEventListener('click', () => { clickComprar(parseInt(tarjeta2.previousElementSibling.value), 2, pagProd); });

let tarjeta3 = document.getElementById('comprarProducto3');
tarjeta3.addEventListener('click', () => { clickComprar(parseInt(tarjeta3.previousElementSibling.value), 3, pagProd); });

let tarjeta4 = document.getElementById('comprarProducto4');
tarjeta4.addEventListener('click', () => { clickComprar(parseInt(tarjeta4.previousElementSibling.value), 4, pagProd); });

let tarjeta5 = document.getElementById('comprarProducto5');
tarjeta5.addEventListener('click', () => { clickComprar(parseInt(tarjeta5.previousElementSibling.value), 5, pagProd); });

let tarjeta6 = document.getElementById('comprarProducto6');
tarjeta6.addEventListener('click', () => { clickComprar(parseInt(tarjeta6.previousElementSibling.value), 6, pagProd); });

let tarjeta7 = document.getElementById('comprarProducto7');
tarjeta7.addEventListener('click', () => { clickComprar(parseInt(tarjeta7.previousElementSibling.value), 7, pagProd); });

let tarjeta8 = document.getElementById('comprarProducto8');
tarjeta8.addEventListener('click', () => { clickComprar(parseInt(tarjeta8.previousElementSibling.value), 8, pagProd); });



/*

//********************************************************

console.log("Comienzo de programa ,tema persistencia con archivo .txt");
let preciosProductos: string="";
let descripcionDeProductos:string="";
//carga de vectores 
const precios: number[] = [525, 3500, 400, 1999];
const productos: string[] = ["Leche", "Galletitas", "Harina","Queso"];


 
// guardar los datos string en archivo .txt
  fs.writeFileSync('./productos.txt',descripcionDeProductos);
  



    console.log(preciosProductos);
    console.log(descripcionDeProductos);

    //*******************funcion stock actual */
function leerArrStockActual() {

    let datoPrecios = fs.readFileSync('./precios.txt', "utf8");
    let datostockSinEspacio = datoPrecios.trim();

    let nuevoArregloPrecios = [];
    nuevoArregloPrecios = datoStockSinEspacio.split(" ");// recupera datos sin espacios en arreglo
}

/*
let datoProductos:string =fs.readFileSync('./productos.txt', "utf8");
let datoProductoSinEspacio=datoProductos.trim();// Quitar espacios en blanco
  
// recuperar los datos sin espacio en una matriz(Todos datos tipo string incluido numeros)
  
  let nuevoArregloproductos:string[]=datoProductoSinEspacio.split(" ");
  console.log(nuevoArregloPrecios);
  console.log(nuevoArregloproductos);*/