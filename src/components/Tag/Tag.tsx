import React, { FC } from 'react';
import { CrossIcon } from 'src/Icons';

interface Props {
    label: string;
    onClose?: () => void;
}

export const Tag: FC<Props> = ({ label, onClose }) => {
    if (!label) return null;
    return (
        <button className="my-4 flex items-center justify-between rounded-lg bg-orange-100 px-2 py-1 text-sm text-gray-500">
            <p className="mr-2">{label}</p>
            <CrossIcon onClick={onClose} />
        </button>
    );
};
