
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

    for(let i=0; i < carrito.length; i++){
        // EL TRIM QUITA LOS ESPACIOS QUE ESTEN A LOS LADOS ASI NOS GARANTIZAMOS QUE ESTEN IGUALES
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad++;
            return null;
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
            <input type="number" min="1" value=${item.cantidad}>
            <button class="delete btn btn-danger">x</button>
        </td>
        `
        // DESPUES LE AGREGAMOS EL CONTENIDO DE ESTA FORMA
        tr.innerHTML = Content;
        // LUEGO LO AGREGAMOS AL TBODY
        tbody.appendChild(tr)

    })
}