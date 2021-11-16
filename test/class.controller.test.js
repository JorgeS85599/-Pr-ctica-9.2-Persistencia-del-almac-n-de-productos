const Controller = require('../src/controller/controller.class');
const Product = require('../src/model/product.class');

describe('Constructor', () => {
	test('Existe la clase Controller', () => {
		expect(Controller).toBeDefined();
	});

	test('Controller tiene las propiedades requeridas', () => {
		const myController = new Controller();
		expect(myController.store.id).toBe(1);
		expect(myController.view).toBeDefined();
	});
})

describe('Testing addProductToStore', () => {
	let myController;

	beforeEach(() => {
		myController  = new Controller();
		myController.view = {
			renderNewProduct: jest.fn(),
			renderStoreImport: jest.fn(),
			renderErrorMessage: jest.fn(),
		}	
		return myController;
	})

	test('llama a la vista si recibe un producto válido', () => {
		const data = {
			name: 'Nombre',
			price: 100
		}
		const newProd = new Product(1, 'Nombre', 100);
		myController.addProductToStore(data);
	
		expect(myController.view.renderNewProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderNewProduct.mock.calls[0][0]).toEqual(newProd);
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(1);
		expect(myController.view.renderStoreImport.mock.calls[0][0]).toBe(0);
	})

	test('NO llama a la vista si recibe un producto NO válido', () => {
		const data = {
			name: 'Nombre',
			units: 100
		}
		const newProd = new Product(1, 'Nombre', 100);
		myController.addProductToStore(data);
	
		expect(myController.view.renderNewProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})
})

describe('Testing deleteProductFromStore', () => {
	let myController;

	beforeEach(() => {
		myController  = new Controller();
		myController.view = {
			renderNewProduct: jest.fn(),
			renderDelProduct: jest.fn(),
			renderStoreImport: jest.fn(),
			renderErrorMessage: jest.fn(),
		}	
		confirm = jest.fn();
		confirm.mockReturnValue(true);
	
		return myController;
	})

	test('llama a la vista con una ID válida sin uds', () => {
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		myController.addProductToStore(data);

		myController.deleteProductFromStore(dataId);
	
		expect(confirm.mock.calls.length).toBe(1);
		expect(myController.view.renderDelProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderDelProduct.mock.calls[0][0]).toBe(dataId);
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(2);
		expect(myController.view.renderStoreImport.mock.calls[0][0]).toBe(0);
	})
	
	test('llama a la vista con una ID pero el usuario cancela', () => {
		confirm.mockReturnValue(false);
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		myController.addProductToStore(data);

		myController.deleteProductFromStore(dataId);
	
		expect(confirm.mock.calls.length).toBe(1);
		expect(myController.view.renderDelProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(1);
	})
	
	test('llama a la vista con una ID válida con uds', () => {
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
			units: 5
		}
		myController.addProductToStore(data);

		myController.deleteProductFromStore(dataId);
	
		expect(confirm.mock.calls.length).toBe(2);
		expect(myController.view.renderDelProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderDelProduct.mock.calls[0][0]).toBe(dataId);
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(2);
		expect(myController.view.renderStoreImport.mock.calls[1][0]).toBe(0);
	})

	test('llama a la vista con una ID NO válida', () => {
		myController.store.delProduct = jest.fn();

		const dataId = 1;

		myController.deleteProductFromStore(dataId);
	
		expect(confirm.mock.calls.length).toBe(0);
		expect(myController.store.delProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderDelProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})	
})

describe('Testing changeProductStock', () => {
	let myController;

	beforeEach(() => {
		myController  = new Controller();
		myController.view = {
			renderNewProduct: jest.fn(),
			renderEditProduct: jest.fn(),
			renderStoreImport: jest.fn(),
			renderErrorMessage: jest.fn(),
		}	
		return myController;
	})

	test('llama a la vista con una ID válida y con suficientes uds', () => {
		const dataId = 1;
		const units = 5;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		const newProd = new Product(dataId, 'Nombre', 100, units);

		myController.addProductToStore(data);

		myController.changeProductStock({ id: dataId, units });
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderEditProduct.mock.calls[0][0]).toEqual(newProd);
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(2);
		expect(myController.view.renderStoreImport.mock.calls[1][0]).toBe(data.price * units);
	})
	
	test('llama a la vista con una ID válida sin suficientes uds', () => {
		const dataId = 1;
		const units = -5;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		myController.addProductToStore(data);

		myController.changeProductStock({ id: dataId, units });
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})

	test('llama a la vista con una ID NO válida', () => {
		const dataId = 1;

		myController.changeProductStock({ id: dataId });
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})
})

describe('Testing changeProductInStore', () => {
	let myController;

	beforeEach(() => {
		myController  = new Controller();
		myController.view = {
			renderNewProduct: jest.fn(),
			renderEditProduct: jest.fn(),
			renderStoreImport: jest.fn(),
			renderErrorMessage: jest.fn(),
		}	
		return myController;
	})

	test('llama a la vista con una ID válida', () => {
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		const newData = {
			id: dataId,
			name: 'Nuevo nombre',
			units: 5,
		}

		myController.addProductToStore(data);

		myController.changeProductInStore(newData);
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderEditProduct.mock.calls[0][0]).toEqual({
			id: dataId,
			name: newData.name,
			price: data.price,
			units: newData.units,
		});
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(2);
		expect(myController.view.renderStoreImport.mock.calls[1][0]).toBe(data.price * newData.units);
	})
	
	test('cambia el precio del producto a 0', () => {
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		const newData = {
			id: dataId,
			price: 0,
			units: 3,
		}

		const newProd = new Product(dataId, data.name, newData.price, newData.units);

		myController.addProductToStore(data);

		myController.changeProductInStore(newData);
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(1);
		expect(myController.view.renderEditProduct.mock.calls[0][0]).toEqual(newProd);
	
		expect(myController.view.renderStoreImport.mock.calls.length).toBe(2);
		expect(myController.view.renderStoreImport.mock.calls[1][0]).toBe(newData.price * newData.units);
	})
	
	test('llama a la vista con una ID válida pero con datos no válidos', () => {
		const dataId = 1;
		const data = {
			name: 'Nombre',
			price: 100,
		}
		const newData = {
			id: dataId,
			name: 'Nuevo nombre',
			units: -5,
		}

		myController.addProductToStore(data);

		myController.changeProductInStore(newData);
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})

	test('llama a la vista con una ID NO válida', () => {
		const dataId = 1;

		myController.changeProductInStore(dataId);
	
		expect(myController.view.renderEditProduct.mock.calls.length).toBe(0);
		expect(myController.view.renderErrorMessage.mock.calls.length).toBe(1);
		expect(myController.view.renderErrorMessage.mock.calls[0][0]).toBeTruthy();
	})	
})
