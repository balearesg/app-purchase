import * as React from 'react';
import { Header } from '@bg/app-purchase/common-components/header';
import { Description } from '@bg/app-purchase/common-components/description';
import { InAppPurchase, IProduct } from '../purchase';
import { useBinder } from '@bg/app-purchase/hooks';
import { List } from './list';
import { PurchasedContext } from './context';

const controller = new InAppPurchase();
globalThis._appPurchase = controller;

export /*bundle*/
function View() {
	const [selectedProducts, setSelectedProducts] = React.useState<Array<IProduct | undefined>>([]);

	const [products, setProducts] = React.useState<IProduct[]>(controller.products);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(controller._fetching);

	React.useEffect(() => {
		controller.initialize();
	}, []);

	useBinder([controller], () => setSelectedProducts(controller.selectedProducts), 'selected.products.changed');
	useBinder([controller], () => setLoading(controller._fetching), ['fetching', 'fetched']);
	useBinder([controller], () => setProducts(controller.products));

	async function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			const response: any = await controller.buy('bg1');
			alert('response onSubmit: ' + JSON.stringify(response));
			if (!response?.status) throw response.error;
		} catch (error) {
			setError('Algo salio mal mientras se intentaba procesar la compra');
			alert(error);
			alert(error?.message);
			alert('ERROR ONSUBMIT: ' + error?.message ?? error);
		}
	}

	return (
		<PurchasedContext.Provider value={{ controller, selectedProducts, setSelectedProducts }}>
			<div className="plugin-page">
				<Header title="Cordova | App Purchase" />
				<Description>
					cordova-plugin-inapppurchase es un plugin de Apache Cordova que permite a los desarrolladores de
					aplicaciones ofrecer compras dentro de su aplicación en plataformas móviles como iOS y Android. Este
					plugin permite que los usuarios compren productos virtuales, como artículos en un juego o
					suscripciones premium, sin tener que abandonar la aplicación.
				</Description>

				<div className="content">
					<form onSubmit={onSubmit}>
						<h4>Compra de Productos</h4>
						<List items={controller.products} />
						<div className="error">{error}</div>

						<button type="submit">{loading ? 'Cargando...' : 'Comprar'}</button>
					</form>
				</div>
			</div>
		</PurchasedContext.Provider>
	);
}
