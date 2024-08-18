import React, { FC } from 'react';
import { LoadingIcon } from 'src/Icons';

interface Props {
    isLoading?: boolean;
}
export const BackdropLoader: FC<Props> = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className="!fixed !bottom-0 !left-0 !right-0 !top-0 !z-50 flex !h-full items-center justify-center bg-black bg-opacity-75 text-5xl text-orange-400">
            <LoadingIcon />
        </div>
    );
};
