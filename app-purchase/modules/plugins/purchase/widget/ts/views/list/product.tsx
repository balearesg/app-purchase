import React from "react";
import { usePurchasedContext } from "../context";

export function Product({ data }: { data: any }) {
	return (
		<li className={`selected-item`}>
			<h3>{data.title}</h3>
			<p>{data.description}</p>
			<p>{data.price}</p>
		</li>
	);
}
