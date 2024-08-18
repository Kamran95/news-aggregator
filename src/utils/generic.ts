export const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Subtract one day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const truncateText = (text: string, maxLength = 140) => {
    if (!text) return text;
    if (text?.length <= maxLength) {
        return text;
    }

    const truncated = text.slice(0, maxLength + 1);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > 0) {
        return truncated.slice(0, lastSpace) + '...';
    }

    return truncated.slice(0, maxLength) + '...';
};
