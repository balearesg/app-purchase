import React from 'react';
import { IProduct } from '../../inapppurchase';

export function SelectedProduct(product: IProduct) {
	return (
		<div data-key="product-basic-app">
			<h4>{product.title}</h4>
			<p>{product.description}</p>
			<small>
				Precio: {product.price}$ {product.currency}
			</small>
		</div>
	);
}
