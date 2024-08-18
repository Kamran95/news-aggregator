import { FC, ReactNode } from 'react';

interface Props {
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
    activeTabIndex: number;
    children: ReactNode;
    tabHeaders: string[];
}
export const Tabs: FC<Props> = ({ activeTabIndex, setActiveTabIndex, children, tabHeaders }) => {
    return (
        <div>
            <div className="flex space-x-3 border-b">
                {/* Loop through tab data and render button for each. */}
                {tabHeaders.map((tab, idx) => {
                    return (
                        <button
                            key={idx}
                            className={`mr-4 border-b-4 py-2 transition-colors duration-300 ${
                                idx === activeTabIndex ? 'border-orange-500' : 'border-transparent hover:border-gray-200'
                            }`}
                            // Change the active tab on click.
                            onClick={() => setActiveTabIndex(idx)}>
                            {tab}
                        </button>
                    );
                })}
            </div>
            {/* Show active tab content. */}
            <div className="py-4">{children}</div>
        </div>
    );
};
