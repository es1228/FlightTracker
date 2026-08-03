import { useState, type ChangeEvent, type FocusEvent } from "react";

type SearchbarProps = {
    placeholder: string;
	handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	handleFocus: (e: FocusEvent<HTMLInputElement>) => void;
	handleBlur: () => void;
	handleSubmit?: (data: string) => void;
};

export default function Searchbar({
    placeholder,
	handleChange,
	handleFocus,
	handleBlur,
	handleSubmit,
}: SearchbarProps) {
	const [textInput, setTextInput] = useState<string>("");
	return (
		<form
			className="fixed left-5 z-50"
			onSubmit={(e) => {
				e.preventDefault();
				if (handleSubmit) handleSubmit(textInput);
			}}
		>
			<div className="relative z-50">
				<div className="absolute z-50 m-3">
					<span className="material-symbols-rounded text-black dark:text-white">
						search
					</span>
				</div>
				<input
					type="text"
					placeholder={placeholder}
					className="rounded-3xl bg-neutral-400/20 p-3 pl-11 text-black outline-0 backdrop-blur-3xl md:min-w-sm dark:bg-neutral-800/40 dark:text-white"
					id="search"
					autoComplete="off"
					onChange={(e) => {
						handleChange?.(e);
						setTextInput(e.target.value);
					}}
                    value={textInput}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>
		</form>
	);
}
