import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    route: string;
    heading: string;
}

export const HomeSectionHeader = ({ route, heading }: Props) => {
    return (
        <div className="mb-4 flex w-full items-center justify-between border-b border-gray-500 pb-2 text-gray-700">
            <h1 className="text-xl text-gray-700">{heading}</h1>
            <Link to={route} className="hover:text-orange-500 hover:underline">
                View more
            </Link>
        </div>
    );
};
