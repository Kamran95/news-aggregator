import { SearchInputField } from 'src/components';
import RadioDropdown from '../RadioDropdown/RadioDropdown';
import { NewCategoryArray } from 'src/constants';
import { useDebounce } from 'src/hooks/useDebounce';
import { useEffect, useState } from 'react';

interface Props {
    searchValue: string;
    setSearchValue: (val: string) => void;
    setSectionValue: (val: string) => void;
    sectionValue: string;
}

export const NewsPageHeader = ({ setSearchValue, setSectionValue, sectionValue }: Props) => {
    const [search, setSearch] = useState<string>('');
    const debounceSearchValue = useDebounce(search);
    useEffect(() => {
        setSearchValue(debounceSearchValue);
    }, [debounceSearchValue]);
    return (
        <div className="mb-6 grid w-full grid-cols-1 items-center justify-between gap-x-3 p-4 text-gray-700 shadow md:grid-cols-4">
            <h1 className="m-0 whitespace-nowrap text-xl text-gray-700">The News</h1>
            <div className="col-span-4 flex w-full flex-wrap items-center justify-start md:col-span-3 md:justify-end">
                <div className="mr-2 md:mx-2">
                    <RadioDropdown
                        value={sectionValue}
                        label="Select Category"
                        setOptionValue={setSectionValue}
                        options={NewCategoryArray}
                    />
                </div>

                <div className="ml-2 w-40">
                    <SearchInputField value={search} setValue={setSearch} />
                </div>
            </div>
        </div>
    );
};
