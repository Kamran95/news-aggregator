import { Link } from 'react-router-dom';

interface Props {
    route?: string;
    heading?: string;
    className?: string;
}

export const NoRecordsFoundCard = ({ route, heading = 'News not found!', className = '' }: Props) => {
    return (
        <div
            className={`z-50 my-6 flex h-[460px] w-full items-center justify-center border border-dotted border-gray-400 bg-gray-50 ${className}`}>
            <div className="flex flex-col items-center justify-between">
                <p>{heading}</p>
                {route ? (
                    <p className="flex items-center">
                        <Link className="text-orange-500" to={route}>
                            Click here
                        </Link>
                        &nbsp; to view more
                    </p>
                ) : (
                    <p>Try clearing out the filters</p>
                )}
            </div>
        </div>
    );
};
