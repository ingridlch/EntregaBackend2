const agregar = (idproducto) =>{
  fetch('http://localhost:8080/api/carts/66bb94084b9db89b660ccfb8/product/'+idproducto, {method: "POST"})
  .then(response => response.json()) 
  .then(json => {console.log(json)
    if(json.result==='success'){alert('Se agregó producto al carrito')}
  })
  .catch(err => console.log(err));
}

