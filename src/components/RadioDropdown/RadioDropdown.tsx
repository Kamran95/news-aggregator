import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

interface Props {
    label: string;
    options: { id: string | number; label: string }[];
    setOptionValue: Dispatch<SetStateAction<string>> | ((val: string) => void);
    value: string;
}

const RadioDropdown: FC<Props> = ({ label, options, setOptionValue, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                id="dropdownRadioButton"
                className="dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center whitespace-nowrap rounded-lg border border-gray-300 px-5 py-2 text-center text-sm text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300"
                type="button">
                {value && value !== 'us' ? value : label}
                <svg
                    className="ms-3 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdownDefaultRadio"
                    className="dark:divide-gray-600 dark:bg-gray-700 absolute z-10 mt-2 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 focus-visible:outline-none"
                    />
                    <ul
                        className="dark:text-gray-200 max-h-40 space-y-3 overflow-y-scroll p-3 text-sm text-gray-700"
                        aria-labelledby="dropdownRadioButton">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option.id}>
                                    <div className="flex items-center">
                                        <input
                                            id="orange-radio"
                                            type="radio"
                                            checked={value === option.id}
                                            value={option.id}
                                            name="colored-radio"
                                            onChange={(e) => setOptionValue(e.target.value)}
                                            className="dark:focus:ring-orange-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 h-4 w-4 border-gray-300 bg-gray-100 text-orange-500 focus:ring-2 focus:ring-orange-500"
                                        />
                                        <label
                                            htmlFor={`radio-${option.id}`}
                                            className="dark:text-gray-300 ms-2 text-sm font-medium text-gray-900">
                                            {option.label}
                                        </label>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="dark:text-gray-400 text-gray-500">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RadioDropdown;
