import React, { Dispatch, SetStateAction } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRange } from 'src/types/genericTypes';
import { SearchInputField } from 'src/components';
import RadioDropdown from '../RadioDropdown/RadioDropdown';
import { SectionTypes } from 'src/types';

interface Props {
    value?: DateRange;
    handleValueChange: (newValue: DateRange) => void;
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    setSectionValue: Dispatch<SetStateAction<string>>;
    guardianSections: SectionTypes[];
    sectionValue: string;
}

export const GuardianPageHeader = ({
    handleValueChange,
    value,
    searchValue,
    setSearchValue,
    guardianSections,
    setSectionValue,
    sectionValue,
}: Props) => {
    return (
        <div className="mb-6 grid w-full grid-cols-1 items-center justify-between gap-x-3 p-4 text-gray-700 shadow md:grid-cols-4">
            <h1 className="m-0 whitespace-nowrap text-xl text-gray-700">The Guardian News</h1>
            <div className="col-span-4 flex w-full flex-wrap items-center justify-end md:col-span-3">
                <div className="mx-2">
                    <RadioDropdown
                        value={sectionValue}
                        label="Select Section"
                        setOptionValue={setSectionValue}
                        options={guardianSections.map((section) => ({ id: section.id, label: section.webTitle }))}
                    />
                </div>

                <div className="mr-2 w-40">
                    <SearchInputField value={searchValue} setValue={setSearchValue} />
                </div>
                <div className="w-72">
                    <Datepicker
                        inputClassName={
                            'border border-gray-300 relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 focus-visible:outline-none  rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-orange-500 focus:ring-orange-500/20'
                        }
                        primaryColor={'orange'}
                        value={value as any}
                        onChange={(date: any) => handleValueChange(date as DateRange)}
                    />
                </div>
            </div>
        </div>
    );
};
