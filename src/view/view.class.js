const divMessagesUI = document.getElementById('messages');
const tbodyTableProducts = document.getElementById('almacen').getElementsByTagName('tbody')[0]


class View{
    renderNewProduct(product) {
        const newProdTr = document.createElement('tr')
        newProdTr.innerHTML = `
            <th> ${product.id} </th>
            <th> ${product.name} </th>
            <th> ${product.units} </th>
            <th> ${product.price.toFixed(2)} €</th>
            <th  ${product.productImport().toFixed(2)} €</th>
            <th> <button class="unitsup btn btn-secondary">
                    <span class="material-icons">arrow_drop_up</span>
                 </button>

                 <button class="unitsdown btn btn-secondary" disabled>
                    <span class="material-icons">arrow_drop_down</span>
                 </button>

                 <button class="edit btn btn-secondary">
                    <span class="material-icons">edit</span>
                 </button>

                 <button class="delete btn btn-secondary">
                    <span class="material-icons">delete</span>
                 </button>
                 
                 </th>`
        newProdTr.setAttribute('id',product.id)
        tbodyTableProducts.appendChild(newProdTr)

    }

    renderEditProduct(product) {
        const filas = document.getElementById(product.id).children
        filas[0].innerHTML = product.id
        filas[1].innerHTML = product.name
        filas[2].innerHTML = product.units
        filas[3].innerHTML = `${product.price.toFixed(2)} €`
        filas[4].innerHTML = `${product.productImport().toFixed(2)} €`
    }

    renderDelProduct(id) {
        const deleteProduct = document.getElementById(id)
        tbodyTableProducts.removeChild(deleteProduct)
    }

    renderStoreImport(total) {
        document.getElementById('total').innerHTML = `${total} €`
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
