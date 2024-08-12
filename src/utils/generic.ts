export const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Subtract one day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
