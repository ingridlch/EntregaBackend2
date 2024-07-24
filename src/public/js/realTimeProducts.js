const socket = io()

socket.emit('message', "MENSAJE DESDE JS")

// crea un producto en la vista al recibir el mensaje del servidor mediante websocket
socket.on('crea', (product)=> {
  const parent = document.getElementById("listProducts");
  var newCard = document.createElement("div")
  newCard.id="p"+product.id;
  newCard.className="col-md-4";
  newCard.innerHTML=`<div class="card mb-2 mt-2" >
      <div class="card-body p-2">
        <h5 class="card-title">${product.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Categoría: ${product.category} - Código: ${product.code}</h6>
        <p class="card-text">${product.description}</p>
        <h6>$ ${product.price}</h6>
        <p class="text-body-secondary">Stock: ${product.stock}<p>
        <button class="btn btn-sm btn-outline-secondary" title="Eliminar producto" onClick="eliminar(${this.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>
      </div>
    </div>`
  parent.appendChild(newCard)
});

// elimina un producto de la vista al recibir el mensaje del servidor mediante websocket
socket.on('elimina', (id)=> {
  const parent = document.getElementById("listProducts");
  const child = document.getElementById("p"+id);
  parent.removeChild(child);
});


// elimina producto usando api/products/
const eliminar = (id)=>{
  fetch('http://localhost:8080/api/products/'+id, {method: "DELETE"})
  .then(response => response.json()) 
  .then(json => console.log(json))
  .catch(err => console.log(err));
}

// crea nuevo producto usando api/products/
const crear = (event)=>{
  event.preventDefault();
  if (document.fcrear.title.value.trim()===""){
    document.getElementById('msg').innerHTML="Debe ingresar un nombre"
    document.fcrear.title.focus()
    return 0;
  }
  if (document.fcrear.description.value.trim()===""){
    document.getElementById('msg').innerHTML="Debe ingresar una descripción"
    document.fcrear.description.focus()
    return 0;
  }
  if (document.fcrear.code.value.trim()===""){
    document.getElementById('msg').innerHTML="Debe ingresar un código"
    document.fcrear.code.focus()
    return 0;
  }
  if (isNaN(parseInt(document.fcrear.price.value))){
    document.fcrear.price.value=''
    document.getElementById('msg').innerHTML="Debe ingresar un precio válido"
    document.fcrear.price.focus()
    return 0;
  }
  if (isNaN(parseInt(document.fcrear.stock.value))){
    document.fcrear.stock.value=''
    document.getElementById('msg').innerHTML="Debe ingresar un stock válido"
    document.fcrear.stock.focus()
    return 0;
  }
  document.getElementById('msg').innerHTML=""
  
  data = {
    'title': document.fcrear.title.value, 
    'description':document.fcrear.description.value, 
    'code': document.fcrear.code.value, 
    'price':document.fcrear.price.value,
    'stock': document.fcrear.stock.value, 
    'category':document.fcrear.category.value,
    'thumbnails':[]
  }
  fetch('http://localhost:8080/api/products/', {method: 'POST', body: JSON.stringify(data), headers: {"Content-type": "application/json"}})
  .then(response => response.json()) 
  .then(json => console.log(json))
  .catch(err => console.log(err))
  .finally(()=>{
    document.fcrear.title.value='' 
    document.fcrear.description.value=''
    document.fcrear.code.value=''
    document.fcrear.price.value=''
    document.fcrear.stock.value=''
  });

}
