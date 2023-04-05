import React from "react";
import { usePurchasedContext } from "../context";
import { List } from "../list";

export function SelectedProductsSection() {
	const { model, selectedProducts } = usePurchasedContext();
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	async function buy(event) {
		try {
			event.preventDefault();
			setLoading(true);
			//alert("productsSelected" + JSON.stringify(selectedProducts));
			const response = await model.buy(selectedProducts);
			alert("response buy" + JSON.stringify(response));
			if (!response.status) throw response.error;
		} catch (error) {
			setError("Algo salio mal en el proceso de compra");
			alert(error);
		} finally {
			setLoading(false);
		}
	}
	async function subscribe(event: React.ChangeEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			setLoading(true);
			//alert("productsSelected" + JSON.stringify(selectedProducts));
			const response = await model.buy(selectedProducts, true);
			alert("response subscribe" + JSON.stringify(response));
			if (!response.status) throw response.error;
		} catch (error) {
			setError("Algo salio mal en el proceso de compra");
			alert(error);
		} finally {
			setLoading(false);
		}
	}

	const isButtonDisabled = loading || selectedProducts.length === 0;

	return (
		<div className="products-list">
			<form onSubmit={subscribe}>
				<h3>Productos Seleccionados:</h3>
				<div className="error">{error}</div>
				{selectedProducts.length === 0 && "No hay productos seleccionados"}
				{selectedProducts.length > 0 && <List items={selectedProducts} />}
				<button disabled={isButtonDisabled} type="submit">
					{loading ? "Cargando..." : "Suscribirse"}
				</button>
				<button disabled={isButtonDisabled} onClick={buy}>
					{loading ? "Cargando..." : "Comprar"}
				</button>
			</form>
		</div>
	);
}
