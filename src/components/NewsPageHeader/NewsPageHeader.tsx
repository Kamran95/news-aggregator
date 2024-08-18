import { SearchInputField } from 'src/components';
import RadioDropdown from '../RadioDropdown/RadioDropdown';
import { NewCategoryArray } from 'src/constants';
import { useDebounce } from 'src/hooks/useDebounce';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DropdownOptions } from 'src/types/genericTypes';

interface Props {
    searchValue: string;
    setSearchValue: (val: string) => void;
    setSectionValue: (val: string) => void;
    handleSetSourceValue: (val: string) => void;
    sectionValue: string;
    sourceValue: string;
    sources: DropdownOptions[];
}

export const NewsPageHeader = forwardRef(
    ({ setSearchValue, setSectionValue, sectionValue, sources, handleSetSourceValue, sourceValue }: Props, ref) => {
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
                    {!sourceValue ? (
                        <div className="mr-2 md:mx-2">
                            <RadioDropdown
                                value={sectionValue}
                                label="Select Category"
                                setOptionValue={setSectionValue}
                                options={NewCategoryArray}
                            />
                        </div>
                    ) : null}
                    {!sectionValue ? (
                        <div className="mr-2 mt-1 md:mx-2 md:mt-0">
                            <RadioDropdown
                                value={sourceValue}
                                label="Select Source"
                                setOptionValue={handleSetSourceValue}
                                options={sources}
                            />
                        </div>
                    ) : null}

                    <div className="mt-1 w-40 md:ml-2 lg:mt-0">
                        <SearchInputField value={search} setValue={setSearch} />
                    </div>
                </div>
            </div>
        );
    },
);
NewsPageHeader.displayName = 'NewsPageHeader';
