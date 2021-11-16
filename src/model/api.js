async function insertaDatos(formData) {
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    const myData = await response.json()
    return myData
}

async function pideDatos() {
    const response = await fetch('http://localhost:3000/products')
    const myData = await response.json()
    return myData
}

async function eliminaDatos(id) {
    const response = await fetch('http://localhost:3000/products/' + id, {
        method: 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    const myData = await response.json()
    return myData
}

async function modificaDatos(formData,id) {
    const response = await fetch('http://localhost:3000/products/' + id, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    const myData = await response.json()
    return myData

}

async function isProduct(id) {
    const response = await fetch('http://localhost:3000/products/' + id)
    if (response.status == "200") {
        return true
    }
    return false
}

async function getProduct(id) {
    const response = await fetch('http://localhost:3000/products/' + id)
    const myData = await response.json()
    return myData
}

module.exports = {
    insertaDatos,
    pideDatos,
    eliminaDatos,
    modificaDatos,
    isProduct,
    getProduct
}