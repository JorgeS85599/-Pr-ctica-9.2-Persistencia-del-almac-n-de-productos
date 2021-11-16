const Product = require('../src/model/product.class');

describe('constructor', () => {
	test('Existe la clase Product', () => {
		expect(Product).toBeDefined();
	});
	
	test('crea un producto con unidades', () => {
		let prod1=new Product(2,"prod1",12, 3);
		expect(prod1.units).toBe(3);
	});
	
	test('crea un producto sin unidades', () => {
		let prod1=new Product(2,"prod1",12);
		expect(prod1.units).toBe(0);
	});
})

describe('función changeUnits', () => {
	test('Aumenta las unidades', () => {
		let prod=new Product(1,"prod1",12.23, 3);
		let hecho=prod.changeUnits(5);
		expect(hecho).toBeTruthy();
		expect(prod.units).toBe(8);
	});
	
	test('Disminuye las unidades', () => {
		let prod=new Product(1,"prod1",12.23);
		let hecho=prod.changeUnits(5);
		hecho=prod.changeUnits(-3);
		expect(hecho).toBeTruthy();
		expect(prod.units).toBe(2);
	});
	
	test('No disminuye las unidades si no hay suficientes', () => {
		let prod=new Product(1,"prod1",12.23);
		let hecho=prod.changeUnits(2);
		expect(() => prod.changeUnits(-3)).toThrow()
		expect(prod.units).toBe(2);
	});
})

test('Calcula el importe de un producto', () => {
	let prod=new Product(1,"prod1",12.23);
	let hecho=prod.changeUnits(2);
	expect(prod.productImport()).toBe(24.46);
});

test('Imprime el producto', () => {
	let prod=new Product(1,"prod1",12.23);
	let hecho=prod.changeUnits(2);
	expect(prod.toString()).toBe('prod1: 2 uds. x 12.23 €/u = 24.46 €');
});
