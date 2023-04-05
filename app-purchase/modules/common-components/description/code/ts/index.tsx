import React from 'react';

interface Props {
	children: string;
}

export /*bundle*/ function Description({ children }: Props) {
	return <p className="description">{children}</p>;
}
