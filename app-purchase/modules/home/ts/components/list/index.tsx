
import React from 'react';
import { Item } from './item';

interface Props {
	items: Array<{ name: string; route: string }>;
	title: string;
}

export function Section({ items, title }: Props) {
	const output = items.map((item: { route: string; name: string }) => <Item key={item.route} {...item} />);

	return (
		<section className="home__section">
			<h3>{title}</h3>
			<ul className="list">{output}</ul>
		</section>
	);
}
