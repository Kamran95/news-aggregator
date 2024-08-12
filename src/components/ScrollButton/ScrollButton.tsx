type Props = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
};

export const ScrollButton = ({ children, onClick, className = '', disabled }: Props) => {
    return (
        <button
            disabled={disabled}
            className={'bg-orange-100 absolute top-1/2 z-50 flex -translate-y-1/2 transform items-center justify-center rounded-full p-4 text-black opacity-40 hover:opacity-100'.concat(
                className,
            )}
            onClick={onClick}>
            {children}
        </button>
    );
};
