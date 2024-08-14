import React, { FC, useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'src/Icons';
import { DropdownOptionsTypes } from 'src/types/genericTypes';

interface Props {
    label: string;
    options: DropdownOptionsTypes[];
}

export const Dropdown: FC<Props> = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
                id="dropdownNavbarLink"
                onClick={toggleDropdown}
                className={`flex items-center justify-between rounded px-3 py-2 ${isOpen ? 'text-orange-700' : 'text-orange-600'}`}>
                {label}
                <ChevronDown />
            </button>
            {isOpen && (
                <div
                    id="dropdownNavbar"
                    className="absolute -right-[40px] z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownNavbarLink">
                        {options.map((option) => (
                            <li key={option.label} className="cursor-pointer">
                                <a onClick={option.onClick} className="hover:bg-orange-100 block px-4 py-2">
                                    {option.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
