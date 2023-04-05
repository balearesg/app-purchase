import React from 'react';
import { Product } from './product';

export function List({ items, emptyMessage = 'No hay productos disponibles', loading }) {
	if (!items.length) return <p>{loading ? 'loading' : emptyMessage}</p>;
	const output = items.map((item) => <Product key={item.productId} {...item} />);
	return <ul>{output}</ul>;
}
