import React from "react";
import { Product } from "./product";

export function List({ items }) {
	const output = items.map(item => {
		if (!item || item.canPurchase) return false;
		return <Product key={item.id} data={item} />;
	});
	return <ul>{output}</ul>;
}
