import React from 'react';
import { routing } from '@beyond-js/kernel/routing';

interface Props {
	title: string;
}

export /*bundle*/ function Header({ title }: Props) {
	function goHome() {
		routing.pushState('/');
	}

	return (
		<header className="page__header">
			<button onClick={goHome}>
				<span>◀</span>
			</button>
			<h1>{title}</h1>
		</header>
	);
}
