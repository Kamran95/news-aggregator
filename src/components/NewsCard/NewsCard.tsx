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
                className="hover:bg-orange-50 min-w-[400px] cursor-pointer shadow-md">
                <div className="flex w-full">
                    <img
                        className="h-80 max-h-80 min-h-80 w-full rounded-t-lg object-cover md:rounded-none md:rounded-s-lg"
                        src={imageUrl ?? '/no-image.png'}
                        alt=""
                    />
                </div>

                <div className="flex w-full flex-col justify-between p-4 leading-normal">
                    <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>
                    <p className="mb-3 text-sm font-normal text-gray-700">{description}</p>
                </div>
            </a>
        </>
    );
};
