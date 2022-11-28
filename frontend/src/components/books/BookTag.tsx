import React, { FC } from 'react';

const BookTag: FC<{ name: string; onClick?: (name: string) => void; color: 'white' | 'green' }> = ({
	name,
	onClick,
	color,
}) => {
	return (
		<button
			onClick={() => onClick && onClick(name)}
			className={`px-4 py-1 rounded-lg ${color === 'white' ? 'bg-white/30' : 'bg-emerald-500 text-white'}`}
		>
			{name}
		</button>
	);
};

export default BookTag;
