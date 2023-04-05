import React from 'react';
import { BuyTab } from './buy-tab';
import { SubscribeTab } from './subscribe-tab';
import { usePurchasedContext } from '../context';
import { BuyAlert } from './buy-alert';

const TABS = {
	buy: BuyTab,
	subscribe: SubscribeTab,
};

export function Tabs() {
	const { setSelectedProducts } = usePurchasedContext();
	const [tab, setTab] = React.useState<'buy' | 'subscribe'>('subscribe');
	const Tab = TABS[tab];

	function handleChange(event) {
		const selectedTab = event.target.id;
		setTab(selectedTab);
		setSelectedProducts([]);
	}

	return (
		<div className="tabs">
			{tab === 'buy' && <BuyAlert />}
			<div className="tabs-manager">
				<button className={`tab ${tab === 'buy' ? 'selected' : ''}`} onClick={handleChange} id="buy">
					Comprar
				</button>
				<button
					className={`tab ${tab === 'subscribe' ? 'selected' : ''}`}
					onClick={handleChange}
					id="subscribe">
					Subscribe
				</button>
			</div>

			<div className="tabs-content">
				<Tab />
			</div>
		</div>
	);
}
