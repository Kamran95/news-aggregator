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
            className="hover:bg-orange-50 flex h-[80%] min-w-[400px] cursor-pointer flex-col items-start justify-between p-4 shadow-md">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>

            <p className="mb-3 text-sm font-normal text-gray-700">
                Category: <span className="bg-orange-200 rounded-lg p-2">{pillarName ?? 'Category not found'}</span>
            </p>
        </a>
    );
};
