import React, { Dispatch, SetStateAction } from 'react';
import RadioDropdown from '../RadioDropdown/RadioDropdown';
import { NYTSectionOptions } from 'src/constants';
import { SearchInputField } from '../SearchInputField';

interface Props {
    setSectionValue: Dispatch<SetStateAction<string>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
    sectionValue: string;
    searchValue: string;
}

export const NYTPageHeader = ({ setSectionValue, sectionValue, searchValue, setSearchValue }: Props) => {
    return (
        <div className="mb-6 grid w-full grid-cols-1 items-center justify-between gap-x-3 p-4 text-gray-700 shadow md:grid-cols-4">
            <h1 className="m-0 whitespace-nowrap text-xl text-gray-700">New York Times</h1>
            <div className="col-span-4 flex w-full flex-wrap items-center justify-start md:col-span-3 md:justify-end">
                <div className="mr-2 mt-1 md:mx-2 md:mt-0">
                    <RadioDropdown
                        value={sectionValue}
                        label="Select Section"
                        setOptionValue={setSectionValue}
                        options={NYTSectionOptions}
                    />
                </div>
                <div className="mt-1 w-40 md:mt-0">
                    <SearchInputField value={searchValue} setValue={setSearchValue} />
                </div>
            </div>
        </div>
    );
};
