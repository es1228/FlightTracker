type ButtonProps = {
	handleClick: () => void;
	icon: string;
	text: string;
};

export default function Button({ handleClick, icon, text }: ButtonProps) {
	return (
		<>
			<button
				className="flex flex-row gap-2 rounded-3xl bg-blue-500/20 p-3 text-nowrap outline-0 backdrop-blur hover:cursor-pointer"
				onClick={handleClick}
			>
				<span className="material-symbols-rounded text-black dark:text-white">
					{icon}
				</span>
				<p className="hidden text-black md:block dark:text-white">
					{text}
				</p>
			</button>
		</>
	);
}
