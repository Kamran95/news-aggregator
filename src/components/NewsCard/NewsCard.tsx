import { truncateText } from 'src/utils';

interface Props {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
}

export const NewsCard = ({ title, imageUrl, description, url }: Props) => {
    return (
        <>
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="my-2 flex h-[520px] min-w-[360px] cursor-pointer flex-col items-start border border-gray-100 shadow-md hover:bg-orange-50">
                <div className="flex w-full">
                    <img
                        className="h-80 max-h-80 min-h-80 w-full rounded-t-lg object-cover"
                        src={imageUrl ?? '/no-image.png'}
                        alt=""
                    />
                </div>

                <div className="mt-4 flex w-full flex-col justify-between px-2 leading-normal">
                    <h5 className="my-2 text-lg font-bold tracking-tight text-gray-900">{truncateText(title, 80)}</h5>
                    <p className="mb-3 text-sm font-normal text-gray-700">{truncateText(description)}</p>
                </div>
            </a>
        </>
    );
};
