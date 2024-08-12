import { ScrollButton } from '../ScrollButton';
import { GreaterThanIcon, LessThanIcon } from '../../Icons';
import { scroller } from '../../utils';
import { MutableRefObject } from 'react';

type Props = {
    contentRef: MutableRefObject<any>;
    classLeftButton?: string;
    classRightButton?: string;
};

export const LeftRightScrollController = ({ contentRef, classLeftButton = '', classRightButton = '' }: Props) => {
    return (
        <div className="hidden sm:block">
            <ScrollButton onClick={() => scroller(-1000, contentRef)} className={classLeftButton}>
                <LessThanIcon />
            </ScrollButton>
            <ScrollButton onClick={() => scroller(1000, contentRef)} className={classRightButton}>
                <GreaterThanIcon />
            </ScrollButton>
        </div>
    );
};
