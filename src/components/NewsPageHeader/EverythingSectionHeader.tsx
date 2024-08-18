import { SearchInputField } from 'src/components';
import RadioDropdown from '../RadioDropdown/RadioDropdown';
import { useDebounce } from 'src/hooks/useDebounce';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DateRange, DropdownOptions } from 'src/types/genericTypes';
import Datepicker from 'react-tailwindcss-datepicker';

interface Props {
    searchValue: string;
    setSearchValue: (val: string) => void;
    handleSetSourceValue: (val: string) => void;
    sourceValue: string;
    sources: DropdownOptions[];
    handleChangeDatePicker: (val: DateRange) => void;
    dateRange: DateRange;
}

export const EverythingSectionHeader = forwardRef(
    ({ setSearchValue, sourceValue, sources, handleSetSourceValue, handleChangeDatePicker, dateRange }: Props, ref) => {
        const [search, setSearch] = useState<string>('');
        const debounceSearchValue = useDebounce(search);
        useEffect(() => {
            setSearchValue(debounceSearchValue);
        }, [debounceSearchValue]);

        useImperativeHandle(ref, () => ({
            clearSearchQuery() {
                setSearch('');
            },
        }));

        return (
            <div className="mb-6 grid w-full grid-cols-1 items-center justify-between gap-x-3 p-4 text-gray-700 shadow md:grid-cols-4">
                <h1 className="m-0 whitespace-nowrap text-xl text-gray-700">The News</h1>
                <div className="col-span-4 flex w-full flex-wrap items-center justify-start md:col-span-3 md:justify-end">
                    <div className="mr-2">
                        <RadioDropdown
                            value={sourceValue}
                            label="Select Source"
                            setOptionValue={handleSetSourceValue}
                            options={sources}
                        />
                    </div>

                    <div className="ml-0 w-40 md:ml-2">
                        <SearchInputField value={search} setValue={setSearch} />
                    </div>
                    <div className="ml-0 mt-2 w-72 md:ml-4 lg:mt-0">
                        <Datepicker
                            inputClassName={
                                'border border-gray-300 relative transition-all duration-300 py-2 pl-4 pr-14 w-full border-gray-300 focus-visible:outline-none  rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-orange-500 focus:ring-orange-500/20'
                            }
                            primaryColor={'orange'}
                            value={dateRange as any}
                            onChange={(date) => handleChangeDatePicker(date as DateRange)}
                        />
                    </div>
                </div>
            </div>
        );
    },
);

EverythingSectionHeader.displayName = 'EverythingSectionHeader';
