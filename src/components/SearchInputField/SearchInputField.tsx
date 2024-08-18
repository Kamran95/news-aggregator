type Props = {
    value: string;
    setValue: (val: string) => void;
    placeholder?: string;
};

export const SearchInputField = ({ value, setValue, placeholder = 'Search' }: Props) => {
    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 ps-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 focus-visible:outline-none"
                placeholder={placeholder}
                required
            />
        </div>
    );
};
