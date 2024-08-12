import React from 'react';

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full bg-gray-100 shadow">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024{' '}
                    <a href="https://www.innoscripta.com/de/en" target="_blank" rel="noreferrer" className="hover:underline">
                        Innoscripta
                    </a>
                    . All Rights Reserved.
                </span>
                <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
                    <li>
                        <a
                            href="https://www.innoscripta.com/de/en/about-us"
                            target="_blank"
                            rel="noreferrer"
                            className="me-4 hover:underline md:me-6">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.cnet.com/news/"
                            target="_blank"
                            rel="noreferrer"
                            className="me-4 hover:underline md:me-6">
                            The News
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.theguardian.com/international"
                            target="_blank"
                            rel="noreferrer"
                            className="me-4 hover:underline md:me-6">
                            The Guardian News
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.nytimes.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="me-4 hover:underline md:me-6">
                            New York Times
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
