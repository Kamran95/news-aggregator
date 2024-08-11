import { ReactNode } from 'react';
import { Navbar, Footer } from './layoutComponents';
type Props = {
    children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="mt-20 flex-grow">{children}</main>
            <Footer />
        </div>
    );
};
