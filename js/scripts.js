const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito=[]


Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem (e){
  const button =e.target
  const item= button.closest('.card')
  const itemTitle =item.querySelector('.card-title').textContent;
  const itemPrice =item.querySelector('.precio').textContent;
  const itemImg =item.querySelector('.card-img-top').src;
  
  const newItem = {
    title:itemTitle,
    precio:itemPrice,
    img:itemImg,
    cantidad:1
  }
   addItemCarrito(newItem)
}

function addItemCarrito(newItem){
const alert = document.querySelector('.alert')

setTimeout( function(){
  alert.classList.add('hide')
}, 2000)
alert.classList.remove('hide')
  const inputElemento = tbody.getElementsByClassName('input__elemento')
   for(let i=0; i< carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = inputElemento[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
   }

  carrito.push(newItem)
  
  renderCarrito()

}
function renderCarrito(){
  tbody.innerHTML=''
  carrito.map(item=>{
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    <th scope="row">1</th>
    <td class="table__productos">
      <img src=${item.img} alt="">
      <h6 class="title">${item.title}</h6>
    </td>
    <td class="table__price"><p>${item.precio} </p></td>
    <td class="table__cantidad">
      <input type="number"min="1" value=${item.cantidad} class="input__elemento">
      <button class="delete btn" btn-danger > x </button>
    </td>
    `
    tr.innerHTML=Content;
    tbody.append(tr)
    tr.querySelector(".delete").addEventListener('click',removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change',sumaCantidad)
  })
   CarritoTotal()
}
function CarritoTotal(){
  let Total=0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$",''))
    Total = Total + precio*item.cantidad
 })
 
  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}
function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){
    if(carrito[i].title.trim()=== title.trim()){
      carrito.splice(i,1)
      
    }
  }


const alert = document.querySelector('.remove')

setTimeout( function(){
  alert.classList.add('remove')
}, 2000)
  alert.classList.remove('remove')
  tr.remove()
 CarritoTotal()
}

function sumaCantidad(e){
  const suma = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item=> {
    if(item.titel.trim()===title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}
const btnMostrarAlert=document.getElementById("btn-mostrar-alert")
btnMostrarAlert.onclick= mostarAlert
 function mostarAlert(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra exitosa',
        showConfirmButton: false,
        timer: 1500
      })
 }
 const $form = document.querySelector('#form')

 $form.addEventListener('submit',handleSubmit)
 
 
 async function handleSubmit(event){
   event.preventDefault()
   const form =new FormData(this)
   const response =await fetch (this.action, {
    method: this.method,
    body:form,
    headers:{
     'Accept':'application/json'
    }
   })
   if(response.ok){
     this.reset()
     alert('Gracias por contactarnos,le escribiremos pronto')
   }
 }
 function registrarProducto(producto) {
  fetch("https://62fae15c3c4f110faaa03c5f.mockapi.io/Productos",{
    method:"POST",
    body:JSON.stringify(producto),
    headers:{
      "Content-Type":"application/json",
    },
})
  .then((response)=> response.json())
  .then((data)=>console.log(data));
}
const productoARegistrar = {
  "nombre": "Coffe Town",
  "cantidad": 10,
  "precioVenta": "1500.00",
}
registrarProducto(productoARegistrar)

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

