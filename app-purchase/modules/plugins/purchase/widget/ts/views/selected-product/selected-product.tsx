import React from "react";
import { usePurchasedContext } from "../context";

export function SelectedProduct(product: any) {
	const { model, setSelectedProduct } = usePurchasedContext();

	async function handleClick() {
		const response = await model.buy(product.productId);
		alert("Producto comprado!! " + JSON.stringify(response));
		setSelectedProduct(null);
	}

	async function subscribe() {
		const response = await model.buy(product.productId, true);
		alert("Producto suscrito!! " + JSON.stringify(response));
		setSelectedProduct(null);
	}

	return (
		<div data-key="product-basic-app">
			<h4>{product.title}</h4>
			<p>{product.description}</p>
			<small>
				Precio: {product.price}$ {product.currency}
			</small>
			<button onClick={handleClick}>Comprar</button>
			<button onClick={subscribe}>Suscribirse</button>
		</div>
	);
}
