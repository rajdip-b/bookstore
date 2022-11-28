import React from 'react';

const Input: React.FC<{
	className?: string;
	name?: string;
	placeholder?: string;
	onChange?: (e: HTMLTextAreaElement | HTMLInputElement) => void;
	type?: 'text' | 'password' | 'textarea' | 'email';
	title?: string;
	disabled?: boolean;
	value?: string;
}> = (props) => {
	const [focus, setFocus] = React.useState(false);

	return (
		<div
			className={`flex flex-col group gap-1 bg-transparent border border-2 text-gray-600 outline-none ${
				focus ? 'border-emerald-600' : 'border-gray-300'
			} ${
				props.disabled ? 'bg-gray-100' : 'hover:bg-gray-100'
			} focus:border-emerald-600 transition-all ease-out duration-300 rounded-lg py-2 px-4 ${props.className}`}
		>
			{props.title && <label className={'font-bold text-gray-600 text-sm'}>{props.title}</label>}
			{props.type === 'textarea' ? (
				<textarea
					rows={5}
					value={props.value}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					disabled={props.disabled}
					className={`outline-none bg-transparent`}
					placeholder={props.placeholder}
					name={props.name}
					onChange={(e) => props.onChange && props.onChange(e.target)}
				/>
			) : (
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					disabled={props.disabled}
					value={props.value}
					className={`outline-none bg-transparent`}
					placeholder={props.placeholder}
					name={props.name}
					onChange={(e) => props.onChange && props.onChange(e.target)}
					type={props.type}
				/>
			)}
		</div>
	);
};

export default Input;
