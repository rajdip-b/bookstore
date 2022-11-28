import React, { FC } from 'react';

const GreenButton: FC<{
	filled?: boolean;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}> = ({ filled, children, className, onClick, disabled }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`rounded-lg px-4 py-2 ${
				filled ? 'bg-emerald-500' : 'text-emerald-500'
			} text-white border-2 border-emerald-500 ${className}`}
		>
			{children}
		</button>
	);
};

export default GreenButton;
