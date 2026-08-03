import { type ChangeEvent, type FocusEvent } from "react";

type SearchbarProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (e: FocusEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
};

export default function Searchbar({ handleChange, handleFocus, handleBlur }: SearchbarProps) {
    return (
        <form className="fixed top-35 left-5 z-50" onSubmit={e => e.preventDefault()}>
            <div className="relative z-50">
                <div className="absolute z-50 m-3">
                    <span className="material-symbols-rounded text-black dark:text-white">
                        search
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="Enter a city..."
                    className="rounded-3xl bg-neutral-400/20 p-3 pl-11 text-black outline-0 backdrop-blur-3xl md:min-w-sm dark:bg-neutral-800/40 dark:text-white"
                    id="search"
                    autoComplete="off"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </form>
    );
}