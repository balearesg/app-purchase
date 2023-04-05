import React from 'react';
import { Header } from '@bg/app-purchase/common-components/header';
import { Description } from '@bg/app-purchase/common-components/description';

export function Presentation() {
	return (
		<>
			<Header title="Cordova | App Purchase" />
			<Description>
				cordova-plugin-inapppurchase es un plugin de Apache Cordova que permite a los desarrolladores de
				aplicaciones ofrecer compras dentro de su aplicación en plataformas móviles como iOS y Android. Este
				plugin permite que los usuarios compren productos virtuales, como artículos en un juego o suscripciones
				premium, sin tener que abandonar la aplicación.
			</Description>
		</>
	);
}
