const items = document.getElementById("items")
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment ()
let carrito = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
items.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async() => {
    try {
        const res = await fetch ('../base.json')
        const data = await res.json()
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
}

const pintarCards = data => {
    console.group(data)
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src",producto.url);
        templateCard.querySelector('.btn-primary').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-primary')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

carrito[producto.id] = {...producto}

    console.log(producto)
}