import { ReactiveModel } from '@bg/app-purchase/reactive-model';
declare global {
	interface Window {
		inAppPurchase?: {
			getProducts: (productIds: string[]) => Promise<any>;
			buy: (productId: string) => Promise<any>;
			subscribe: (productId: string) => Promise<any>;
			restorePurchases: () => Promise<any>;
			consume: (productId: string) => Promise<any>;
		};
	}
}

export /*bundle*/ interface IProduct {
	id: number;
	title: string;
	description: string;
	price: string;
	productId: number;
	currency: string;
}

export class InAppPurchase extends ReactiveModel {
	#fetching: boolean = false;
	get fetching() {
		return this.#fetching;
	}

	#products: Array<IProduct | undefined> = [];
	get products() {
		return this.#products;
	}

	#selectedProducts: Array<IProduct | undefined> = [];
	get selectedProducts() {
		return this.#selectedProducts;
	}

	set selectedProducts(value: Array<IProduct | undefined>) {
		this.#selectedProducts = value;
		this.triggerEvent('selected.products.changed');
	}

	// Get a list of products
	getProducts = async (productIds: Array<string | undefined>) => {
		try {
			if (!productIds.length) return [];
			this.#fetching = true;
			this.triggerEvent();

			const products = await globalThis.inAppPurchase.getProducts(productIds);
			this.#products = products;
			this.triggerEvent();
			return { status: true, data: this.#products };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.#fetching = false;
			this.triggerEvent();
		}
	};

	// Se estan usando suscripciones no renovables por ahora por un bug con el metodo de compra
	buy = async (productId: string = '') => {
		try {
			if (!productId) throw new Error('productsId is empty');
			this.#fetching = true;
			this.triggerEvent();

			// TODO: Agregar tambien #buyOne cuando se encuentre solucion para el bug en las compras
			const response = await this.#subscribeOne(productId);
			if (response?.errorCode) throw response.message;

			return { status: true, data: response };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.#fetching = false;
			this.triggerEvent('fetched');
		}
	};

	#subscribeOne = async (productId: string) => {
		try {
			const response = await globalThis.inAppPurchase.subscribe(productId);
			if (response?.errorCode) throw response.message;
			const consumed = globalThis.inAppPurchase.acknowledge(
				response.productType,
				response.receipt,
				response.signature
			);

			return consumed;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};
}
