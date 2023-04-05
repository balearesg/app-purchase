import * as React from 'react';
import { InAppPurchase, IProduct } from '../inapppurchase';
import { useBinder } from '@bg/app-purchase/hooks';
import { PurchasedContext } from './context';
import { Presentation } from './presentation';
import { Tabs } from './tabs';

const inAppPurchase = new InAppPurchase();
window._inAppPurchase = inAppPurchase;

export /*bundle*/
function View() {
	const [selectedProducts, setSelectedProducts] = React.useState<Array<IProduct | undefined>>([]);
	const [products, setProducts] = React.useState<Array<IProduct | undefined>>([]);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(inAppPurchase.fetching);

	useBinder([inAppPurchase], () => setSelectedProducts(inAppPurchase.selectedProducts), 'selected.products.changed');
	useBinder([inAppPurchase], () => {
		setProducts(inAppPurchase.products);
		setLoading(inAppPurchase.fetching);
	});

	return (
		<PurchasedContext.Provider
			value={{
				inAppPurchase,
				error,
				selectedProducts,
				setSelectedProducts,
				products,
				setProducts,
				setError,
				loading,
			}}>
			<div className="plugin-page in-app-purchase-view">
				<Presentation />
				<div className="content">
					<Tabs />
				</div>
			</div>
		</PurchasedContext.Provider>
	);
}
