interface Props {
    title: string;
    pillarName: string;
    url: string;
}

export const GuardianNewsCard = ({ title, pillarName, url }: Props) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex h-[80%] min-w-[380px] cursor-pointer flex-col items-start justify-between p-4 shadow-md hover:bg-orange-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>

            <p className="mb-3 text-sm font-normal text-gray-700">
                Category: <span className="rounded-lg bg-orange-200 p-2">{pillarName ?? 'Category not found'}</span>
            </p>
        </a>
    );
};
