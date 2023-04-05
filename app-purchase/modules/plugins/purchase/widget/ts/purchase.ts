import { ReactiveModel } from '@bg/app-purchase/reactive-model';

export /*bundle*/ interface IProduct {
	id: number;
	title: string;
	description: string;
	price: string;
	productId: number;
	currency: string;
}

export class InAppPurchase extends ReactiveModel {
	get productTypes() {
		return this.#productTypes;
	}

	get products() {
		return this.#store?.products ?? [];
	}

	_fetching: boolean = false;

	#selectedProducts: Array<IProduct | undefined> = [];
	get selectedProducts() {
		return this.#selectedProducts;
	}

	set selectedProducts(value: Array<IProduct | undefined>) {
		this.#selectedProducts = value;
		this.triggerEvent('selected.products.changed');
	}

	#store: any;
	get store() {
		return this.#store;
	}
	#platform: string;
	#productTypes;
	constructor() {
		super();
		const { store, Platform, ProductType } = globalThis.CdvPurchase;
		alert('contructor executed 1');
		this.#store = store;
		this.#productTypes = ProductType;
		this.#platform = this.#getOperatingSystem() === 'Android' ? Platform.GOOGLE_PLAY : Platform.APPLE_APPSTORE;
	}

	initialize = async () => {
		alert(`initialize executed 2 ${this.#platform}`);
		try {
			await this.#store.initialize([this.#platform]);
			this.#store.when().productUpdated(() => {
				alert('Productos cargados');
				this.triggerEvent();
			});
			this.#listen();
			this.register({ id: 'bg1', type: this.#store.NON_CONSUMABLE });
			this.#store.refresh();
			await this.#store.get('bg1', this.#platform);
			await this.#store.update();
			alert('actualizo la lista');
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	#listen = () => {
		alert('listener executed 4');

		this.#store.when().approved((product) => {
			alert(`product approved 5, ${JSON.stringify(product)}`);
			product.finish();
		});
	};

	#getOperatingSystem = () => {
		const userAgent = navigator.userAgent;
		const isAndroid = /android|windows phone|blackberry|bb|playbook/i.test(userAgent);
		const isIOS = /ipad simulator|iphone simulator|ipod simulator|ipad|iphone|ipod/i.test(userAgent);
		return isAndroid ? 'Android' : isIOS ? 'iOS' : 'Unknown';
	};

	register(products) {
		if (!Array.isArray(products)) {
			products = [products];
		}

		products.forEach(({ id, type }) => {
			alert(`registering ${id}`);
			this.#store.when(id).approved((product) => {
				alert('product approved: ' + JSON.stringify(product));
				product.finish();
			});
			this.#store.refresh();
			this.#store.register({
				id,
				type,
				platform: this.#platform,
			});
		});
	}

	buy = async (productId: string, isSubscribe: boolean = false) => {
		try {
			this._fetching = true;
			this.triggerEvent('fetching');

			alert('=====>' + JSON.stringify(productId) + JSON.stringify(this.#store.registeredProducts));

			const result = await this.#store.order('bg1');
			this.#store.refresh();
			alert('getting result');
			alert(JSON.stringify(result));
			return { status: true, data: result };
		} catch (error) {
			alert('in buy with order');
			alert(error);
			alert(error?.message);
			alert('buy error' + error?.message ?? error);
			return { status: false, error };
		} finally {
			alert('error finali no se');
			this._fetching = false;
			this.triggerEvent('fetched');
		}
	};
}
