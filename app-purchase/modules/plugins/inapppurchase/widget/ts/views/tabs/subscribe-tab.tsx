import React from 'react';
import { List } from '../list';
import { usePurchasedContext } from '../context';
import { SelectedProductsList } from '../selected-product';

const SUSCRIPTABLE_PRODUCTS = ['bg4', 'bg7', 'bg8'];

export function SubscribeTab() {
	const { inAppPurchase, products, setError, error, loading, selectedProducts } = usePurchasedContext();
	const isButtonDisabled = loading || selectedProducts.length === 0;

	React.useEffect(() => {
		inAppPurchase.getProducts(SUSCRIPTABLE_PRODUCTS);
	}, []);

	async function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			const response: any = await inAppPurchase.buy(selectedProducts, { isSubscribe: true });
			if (!response?.status) throw response.error;
		} catch (error) {
			console.error(error);
			setError('Algo salio mal mientras se consultaba el producto');
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<h3>Productos:</h3>
			<List items={products} loading={loading} />
			<h3>Productos Seleccionados:</h3>
			<SelectedProductsList />
			<div className="error">{error}</div>
			<button disabled={isButtonDisabled} type="submit">
				{loading ? 'Cargando...' : 'Suscribirse'}
			</button>
		</form>
	);
}
