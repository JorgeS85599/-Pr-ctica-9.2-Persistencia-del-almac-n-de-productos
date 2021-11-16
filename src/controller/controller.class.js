const View = require('../view/view.class')
const Store = require('../model/store.class')
const Api = require('../model/api')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    async init() {
        const productos = await this.store.addProductInit()
        productos.forEach(element => {
            this.view.renderNewProduct(element)
            this.calculateTotalImport()
            this.renderListenersProduct(element)
        });
      }

    async addProductToStore(formData) {
        // Cambiamos los datos en el modelo
        try {
            const product = await this.store.addProduct(formData)  
            this.view.renderNewProduct(product)
            this.calculateTotalImport()
            this.renderListenersProduct(product)
        } catch (error) {
            this.view.renderErrorMessage(error)
        }
        
        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
    }

    renderListenersProduct(product) {
        document.getElementById(product.id).querySelector('.unitsup').addEventListener('click' , async (event) => {
            event.preventDefault()
            await this.changeProductStock({
                id: product.id
                ,units: 1})

        }
        )

        document.getElementById(product.id).querySelector('.unitsdown').addEventListener('click' , async (event) => {
            event.preventDefault()
            await this.changeProductStock({
                id: product.id
                ,units: -1})

        }
        )

        document.getElementById(product.id).querySelector('.delete').addEventListener('click', (event) => {
            event.preventDefault()
            this.deleteProductFromStore(product.id)

        })

        document.getElementById(product.id).querySelector('.edit').addEventListener('click', () => {
            document.getElementById('new-prod').getElementsByTagName('legend')[0].textContent = "Cambiar Producto"
            document.getElementById('newprod-id-label').classList.remove('hide')
            document.getElementById('newprod-id-input').classList.remove('hide')
            document.getElementById('newprod-units-label').classList.remove('hide')
            document.getElementById('newprod-units-input').classList.remove('hide')
            document.getElementById('new-prod').querySelector('.btn-primary').textContent = "Cambiar"
            document.getElementById('newprod-id-input').value = product.id
            document.getElementById('newprod-name').value = product.name
            document.getElementById('newprod-price').value = product.price
            document.getElementById('newprod-units-input').value = product.units
            document.getElementById('almacen').classList.add('hide')
            document.getElementById('form').classList.remove('hide')
        })

        document.getElementById('new-prod').addEventListener('reset', (event) => {
            event.preventDefault()
        
            if (document.getElementById('newprod-id-input').classList.contains('hide')) {
              document.getElementById('newprod-name').value = ""
              document.getElementById('newprod-price').value = ""
        
            } else {
                document.getElementById('newprod-id-input').value = product.id
                document.getElementById('newprod-name').value = product.name
                document.getElementById('newprod-price').value = product.price
                document.getElementById('newprod-units-input').value = product.units
            }
          })

    }

    async deleteProductFromStore(prodId) {
        const findedProduct = this.store.findProduct(Number(prodId))
        if (findedProduct) {
            if(confirm(`Vas a eliminar el producto con id: ${findedProduct.id} y nombre: ${findedProduct.name}`)) {
                if (findedProduct.units > 0) {
                    if (confirm(`El producto con id: ${findedProduct.id} y nombre: ${findedProduct.name} tiene ${findedProduct.units} unidades en stock, si aceptas desaparecerán`)) {
                        try {
                            let deletedProduct = await this.store.delProduct(prodId)
                            this.view.renderDelProduct(deletedProduct.id)
                            this.calculateTotalImport()
                        } catch (error) {
                            this.view.renderErrorMessage(error)
                        }
                    }
                } else {
                    try {
                        let deletedProduct = await this.store.delProduct(prodId)
                        this.view.renderDelProduct(deletedProduct.id)
                        this.calculateTotalImport()
                    } catch (error) {
                        this.view.renderErrorMessage(error)
                    }
                }
            }
        } else {
            this.view.renderErrorMessage("No se ha encontrado el producto con id: " + prodId)
        }

        // No olvides pedir confirmación y, si el producto
        // tiene unidades pedir una segunda confirmación
    }

    async changeProductInStore(formData) {
        try {
            const changedProduct = await this.store.changeProduct(formData)
            this.view.renderEditProduct(changedProduct)
            this.calculateTotalImport()
        } catch (error) {
            this.view.renderErrorMessage(error)
        }
    }

    async changeProductStock(formData) {
        try {
            let prodChanged = await this.store.changeProductUnits(formData)
            this.view.renderEditProduct(prodChanged)
            this.calculateTotalImport()
            if (prodChanged.units == 0) {
                document.getElementById(prodChanged.id).querySelector('.unitsdown').setAttribute('disabled','')
            } else {
                document.getElementById(prodChanged.id).querySelector('.unitsdown').removeAttribute('disabled')
            }


        } catch (error) {
            this.view.renderErrorMessage(error)
        }
    }

    calculateTotalImport() {
        let total = this.store.totalImport().toFixed(2)
        this.view.renderStoreImport(total)
    }

}


module.exports = Controller
