export const scroller = (scrollOffset: number, contentRef: React.RefObject<any>) => {
    const currentScrollLeft = contentRef.current.scrollLeft;
    const newScrollLeft = currentScrollLeft + scrollOffset;

    contentRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
    });
    const maxScroll = contentRef.current.scrollWidth - contentRef.current.clientWidth;
    // Check if scroll has reached the start
    if (contentRef.current.scrollLeft === 0) {
        console.log('Reached start of scroll');
    }

    // Check if scroll has reached the end
    if (Math.floor(contentRef.current.scrollLeft) === Math.floor(maxScroll)) {
        console.log('Reached end of scroll');
    }
};
