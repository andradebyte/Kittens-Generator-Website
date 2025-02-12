import React, { useState } from 'react';
import './Header.css';
import './Sidebar.css';
import { FaCat } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { GrGithub } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const likedKittens = localStorage.getItem('likedKittens');
    const likedKittensArray = likedKittens ? JSON.parse(likedKittens) : [];

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <div className="logoIcon">
                            <FaCat size={32} />
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                {/* Use a button for proper accessibility and to avoid default link behavior */}
                                <div className="sidebar-toggle item" onClick={toggleSidebar}>
                                    <IoMdPhotos size={24} />
                                </div>
                            </li>
                            <li>
                                <a className='sidebar-toggle item'
                                    href="https://github.com/andradebyte/Kittens-Generator-Website"
                                    target="_blank"
                                    rel="noreferrer">
                                    <GrGithub size={24} />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Sidebar as a sibling, so it overlays the rest of the page */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <header className='sidebar-header'>
                    <h3>Your 'Meow'llery!</h3>
                    <IoCloseSharp onClick={toggleSidebar} size={28} />
                </header>
                <main>
                    <ul className='liked-kittens'>
                        {likedKittensArray.map((kittenUrl: string) => (
                            <li key={kittenUrl}>
                                <img src={kittenUrl} className='liked-kittens-items' alt="Liked kitten" />
                            </li>
                        ))}
                    </ul>
                </main>
            </aside>
        </>
    );
}
