
const ClickButton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody')
let carrito = []


// RECORREMOS EL ARRAY CON EL FOREACH
ClickButton.forEach(btn => {
    // Y LE DECIMOS QUE CADA VEZ QUE SE CLICKEE UNO DE LOS BOTONES PERTENECIENTES AL ARRAY SUCEDA ALGO
    btn.addEventListener('click',addToCarritoItem)
})

// LA FUNCION OBTIENE EL BOTON Y REALIZA UNA FUNCION
function addToCarritoItem(e){
    const button = e.target;
    //EL COLSEST OBTIENE EL CONTENEDOR MAS CERCANO QUE TENGA LA CLASE CARD
    const item = button.closest('.card')
    // AL YA TENER LA CARDA SELECCIONADA OBTENEMOS EL CARD-TITLE QUE ESTA ADENTRO, EL CONTENIDO 
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    // CREAMOS EL CARRITO CON TODOS LOS VALORES
    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

// ESTA FUNCION TOMA EL NUEVO CARRIT
function addItemCarrito(newItem){

    const alert = document.querySelector('.alert')
    setTimeout( function(){
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    // OBTENEMOS EL INPUT DE LA TABLA
    const inputElement = tbody.getElementsByClassName('input__element')

    for(let i=0; i < carrito.length; i++){
        // EL TRIM QUITA LOS ESPACIOS QUE ESTEN A LOS LADOS ASI NOS GARANTIZAMOS QUE ESTEN IGUALES
        if(carrito[i].title.trim() === newItem.title.trim()){
            // LE SUMAMOS 1 A LA CANTIDAD
            carrito[i].cantidad++;
            // LUEGO OBTENEMOS EL VALOR DEL INPUT Y LE SUMAMOS 1
            const inputValue = inputElement[i];
            inputValue.value++;
            carritoTotal()
            return null;
            // TODO ESTO SUCEDE SI MARCAMOS DE VUELTA EL MISMO ELEMENTO
        }
    }

    // LO AÑADE AL CARRITO GENERAL
    carrito.push(newItem)

    renderCarrito()
}

function renderCarrito(){
    
    // CADA VEZ QUE SE EJECUTE ESTA ACCION VA A ESTAR VACIO EL TBODY
    tbody.innerHTML = ''

    carrito.map( item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        // ALT 96 PARA LAS COMILLAS
        // CON ESTAS COMILLAS PODEMOS CREAR CODIGO HTML COMPLETO
        const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__price">${item.price}</td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class='input__element'>
            <button class="delete btn btn-danger">x</button>
        </td>
        `
        // DESPUES LE AGREGAMOS EL CONTENIDO DE ESTA FORMA
        tr.innerHTML = Content;
        // LUEGO LO AGREGAMOS AL TBODY
        tbody.appendChild(tr)

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector('.input__element').addEventListener('change', sumaCantidad)

    })
    carritoTotal()
}



function carritoTotal(){
    let total = 0
    // SELECCIONAMOS EL TEXTO QUE TIENE EL TOTAL DEL CARRITO
    const itemCartTotal = document.querySelector('.itemCartTotal')
    console.log(itemCartTotal)
    // RECORREMOS EL CARRITO Y OBTENEMOS LOS DISTINTOS PRECIOS
    carrito.forEach((item) => {
        // OBTENEMOS EL PRECIO DE CADA ITEM DEL CARRITO
        // PERO LE SACAMOS EL SIMBOLO $ Y LO TRANSFORMAMOS EN NUMERO
        const precio = Number(item.price.replace("$", ''));
        total = total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    // CON EL TARGET OBTENEMOS EL ELEMENTO QUE LLAMOS A EVENTLISTENING
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.itemCarrito')
    // OBTENEMOS EL TITULO DE ESTE ITEM PARA DESPUES COMPARARLO
    const title = tr.querySelector('.title').textContent;
    // RECORREMOS EL CARRITO
    for(let i = 0; i < carrito.length; i++){
        // Y LE DECIMOS QUE SI EL TITULO DE LA CARTA MAS CERCANO AL BOTON DELETE QUE SELECCIONAMOS ES IGUAL AL DEL CARRITO
        if(carrito[i].title.trim() === title.trim()){
            // LO VAMOS A SACAR DEL ARRAY
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')
    setTimeout( function(){
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    carritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target;
    // OBTENEMOS EL ITEM MAS CERCANO AL BOTON QUE EJECUTA LA FUNCION
    const tr = sumaInput.closest('.itemCarrito')
    const title = tr.querySelector('.title').textContent;
    carrito.forEach((item) =>{
        // RECORREMOS EL CARRITO PARA ENCONTRAR EL VALOR DEL ITEM
        if(item.title.trim() === title){
            sumaInput < 1 ? (sumaInput.value = 1) : sumaInput.value;
            // LE CAMBIAMOS LA CANTIDAD
            item.cantidad = sumaInput.value;
            // ACTUALIZAMOS EL PRECIO
            carritoTotal()
        }
    })
    console.log(carrito)
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}