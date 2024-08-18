import { DropdownOptionsTypes } from 'src/types/genericTypes';
import { Dropdown } from '../../components';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const redirectToHome = () => {
        // Navigate to a different route
        navigate('/');
    };
    const dropdownOptions: DropdownOptionsTypes[] = [
        { label: 'The News', onClick: () => navigate('/the-news') },
        { label: 'New York Times', onClick: () => navigate('/nyt-news') },
        { label: 'The Guardians', onClick: () => navigate('/guardian-news') },
    ];
    return (
        <nav className="fixed start-0 top-0 z-20 mx-auto flex w-full items-center justify-center border-b border-orange-400 bg-white">
            <div className="container flex flex-wrap items-center justify-between px-8 py-2">
                <a href="" onClick={redirectToHome} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.jpg" className="h-9 w-9" alt="news Logo" />
                    <span className="self-center whitespace-nowrap text-2xl font-semibold">
                        News<sub>Ag</sub>
                    </span>
                </a>

                <ul className="flex py-4 ps-2 font-medium">
                    <li>
                        <Dropdown label="Sources" options={dropdownOptions} />
                    </li>
                </ul>
            </div>
        </nav>
    );
};
