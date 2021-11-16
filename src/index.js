'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')
const myController = new Controller()


// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', async () => {

  await myController.init()

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', async (event) => {
    event.preventDefault()

    if (document.getElementById('newprod-id-input').classList.contains('hide')) {
      const name = document.getElementById('newprod-name').value
      const price = document.getElementById('newprod-price').value

      await myController.addProductToStore({ name, price }) 

    } else {
      const id = document.getElementById('newprod-id-input').value
      const name = document.getElementById('newprod-name').value
      const price = document.getElementById('newprod-price').value
      const units = document.getElementById('newprod-units-input').value

      await myController.changeProductInStore({id,name,price,units})

      document.getElementById('new-prod').getElementsByTagName('legend')[0].textContent = "Añadir Producto"
      document.getElementById('newprod-id-label').classList.add('hide')
      document.getElementById('newprod-id-input').classList.add('hide')
      document.getElementById('newprod-units-label').classList.add('hide')
      document.getElementById('newprod-units-input').classList.add('hide')
      document.getElementById('new-prod').querySelector('.btn-primary').textContent = "Añadir"
      document.getElementById('newprod-name').value = ""
      document.getElementById('newprod-price').value = ""
    
    }

    document.getElementById('almacen').classList.remove('hide')
    document.getElementById('form').classList.add('hide')


  })

  document.getElementById('showProd').addEventListener('click' ,(event) => {
    event.preventDefault()

    document.getElementById('almacen').classList.remove('hide')
    document.getElementById('form').classList.add('hide')
  })

  document.getElementById('addProd').addEventListener('click', (event) => {
    event.preventDefault()

    document.getElementById('almacen').classList.add('hide')
    document.getElementById('form').classList.remove('hide')
  })






})

