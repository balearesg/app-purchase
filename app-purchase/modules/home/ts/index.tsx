import React from 'react';
import config from '@bg/app-purchase/config';
import { Header } from './components/header';
import { Section } from './components/list';

interface ISection {
	origin: string;
	items: Array<{ route: string; name: string }>;
}

export /*bundle*/
function Page() {
	const { plugins } = config.params;
	const sections = plugins.map((section: ISection, index: number) => (
		<Section key={index} title={section.origin} items={section.items} />
	));

	return (
		<div className="home">
			<Header />
			{sections}
		</div>
	);
}
