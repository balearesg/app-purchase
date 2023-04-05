import React from 'react';
import { routing } from '@beyond-js/kernel/routing';

interface Props {
	route: string;
	name: string;
}

export function Item({ route, name }: Props) {
	function navigate() {
		routing.pushState(route);
	}

	return (
		<li onClick={navigate} className="item">
			<button>{name}</button>
		</li>
	);
}
