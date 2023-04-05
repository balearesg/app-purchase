import React from 'react';
import { usePurchasedContext } from '../context';
import { SelectedProduct } from './selected-product';

export function SelectedProductsList() {
	const { selectedProducts } = usePurchasedContext();

	if (selectedProducts.length === 0) return <p>"No hay productos seleccionados"</p>;

	const selectedElements = selectedProducts.map((product) => <SelectedProduct key={product.title} {...product} />);
	return (
		<div className="products-list">
			<h3>Productos Seleccionados:</h3>
			<ul>{selectedElements}</ul>
		</div>
	);
}
