import React, { FC } from 'react';
import { LoadingIcon } from 'src/Icons';

interface Props {
    className?: string;
}
export const SectionLoader: FC<Props> = ({ className = '' }) => {
    return (
        <div
            className={`absolute flex h-[460px] w-full items-center justify-center bg-white text-5xl text-orange-400 ${className}`}>
            <LoadingIcon />
        </div>
    );
};
