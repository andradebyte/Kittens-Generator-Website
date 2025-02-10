import React from 'react';
import './Header.css';
import { FaCat } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { GrGithub } from "react-icons/gr";

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className='logo'>
                    <div className='logoIcon'>
                        <FaCat size={32} />
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="#home"><IoMdPhotos size={24} /></a></li>
                        <li><a href="https://github.com/andradebyte/Kittens-Generator-Website" target='_blank' rel='noreferrer'><GrGithub size={24} /></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
