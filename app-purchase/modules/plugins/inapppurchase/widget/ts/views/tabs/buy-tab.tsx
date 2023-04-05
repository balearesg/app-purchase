import React from 'react';
import { List } from '../list';
import { usePurchasedContext } from '../context';
import { SelectedProductsList } from '../selected-product';

const BUYABLE_PRODUCTS = ['bg1', 'bg2', 'bg3'];

// PARA LA FUTURA IMPLEMENTACION DEL PLUGIN DE COMPRA, ACTUALMENTE NO SE USA
export function BuyTab() {
	const { inAppPurchase, products, setError, error, loading, selectedProducts } = usePurchasedContext();
	const isButtonDisabled = loading || selectedProducts.length === 0;

	React.useEffect(() => {
		inAppPurchase.getProducts(BUYABLE_PRODUCTS);
	}, []);

	async function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			const response: any = await inAppPurchase.buy(selectedProducts, { isSubscribe: false });
			if (!response?.status) throw response.error;
		} catch (error) {
			setError('Algo salio mal mientras se consultaba el producto');
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<h3>Productos:</h3>
			<List items={[]} loading={loading} />
			<h3>Productos Seleccionados:</h3>
			<SelectedProductsList />
			<div className="error">{error}</div>
			<button disabled={true} type="submit">
				{loading ? 'Cargando...' : 'Comprar'}
			</button>
		</form>
	);
}
