import { ReactNode } from 'react';
import { Navbar, Footer } from './layoutComponents';
type Props = {
    children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="mb-20 mt-40 flex w-full items-center justify-center sm:mt-32">{children}</main>
            <Footer />
        </div>
    );
};
