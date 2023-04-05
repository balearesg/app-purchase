import React from 'react';
import { usePurchasedContext } from '../context';
import { IProduct } from '../../inapppurchase';

export function Product(product: IProduct) {
	const { inAppPurchase, selectedProducts } = usePurchasedContext();
	const isSelected = selectedProducts.some((item) => item.id === product.id);
	const cls = isSelected ? 'selected' : '';

	function select() {
		inAppPurchase.selectedProducts = [...inAppPurchase.selectedProducts, product];
	}

	function unSelect() {
		inAppPurchase.selectedProducts = inAppPurchase.selectedProducts.filter((item) => item.id !== product.id);
	}

	const onClick = isSelected ? unSelect : select;

	return (
		<li onClick={select} className={`selected-item ${cls}`}>
			<div className="product">{product.title}</div>
			<button type="reset" onClick={onClick}>
				{isSelected ? 'Remover' : 'Agregar'}
			</button>
		</li>
	);
}
