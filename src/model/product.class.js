class Product {
    constructor (id, name, price, units = 0) {
        this.id = id
        this.name = name
        this.price = price
        this.units = units
    }

    changeUnits(units) {
        if (this.units + units < 0) {
	        throw new Error(`Quedan ${this.units} y quieres sumarle ${units}`)
        }
        this.units += units
        return this
    }

    productImport() {
        return this.price * this.units
    }

    toString() {
        return `${this.name}: ${this.units} uds. x ${this.price.toFixed(2)} €/u = ${this.productImport().toFixed(2)} €` 
    }

}

module.exports = Product
