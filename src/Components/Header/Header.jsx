import React, { useContext, useRef, useState } from 'react';
import './Header.css';
import LogoMovie from '../../img/maxresdefault.jpg';
import { Link, useLocation } from 'react-router-dom';
import { TrailersContext } from '../../Context/TrailersContext';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const { searchContent, resetIndex } = useContext(TrailersContext);
    const searchInputRef = useRef(null);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const searchMovies = (e) => {
        e.preventDefault();
        const searchValue = searchInputRef.current.value;
        const currentSection = location.pathname.split('/')[1];
        let type = "multi";
        if (currentSection === "movies") {
            type = "movie";
        } else if (currentSection === "series") {
            type = "tv";
        }
        searchContent(searchValue, type);
        searchInputRef.current.value = '';
    };

    const handleLinkClick = (e) => {
        e.preventDefault();
        resetIndex();
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
        const targetPath = e.currentTarget.getAttribute('href');
        window.location.href = targetPath;
    };

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className='container-header'>
                <div className='container-header-row row'>
                    <div className='items-header-columnimg col-3'>
                        <a href="/" className="link-to-opts" onClick={handleLinkClick}>
                            <img src={LogoMovie}  className='img-header' alt="Logo" />
                        </a>
                    </div>
                    {/* <div className='items-header-columnspace col-1'></div> */}
                    <div className='items-header-columnItems col-6'>
                        <a href="/" className="link-to-opts" onClick={handleLinkClick}>
                            <h1>Home</h1>
                        </a>
                        <a href="/movies" className="link-to-opts" onClick={handleLinkClick}>
                            <h1>Movies</h1>
                        </a>
                        <a href="/series" className="link-to-opts" onClick={handleLinkClick}>
                            <h1>Series</h1>
                        </a>
                    </div>
                    {/* <div className='items-header-columnspace col-1'></div> */}
                    <div className='items-header-columnSearch col-3'>
                        <form className='items-columnSearch' onSubmit={searchMovies}>
                            <input
                                name="searchInput"
                                type='text'
                                placeholder='Search'
                                className='input-header'
                                ref={searchInputRef}
                            />
                            <button type='submit' className='btn btn-primary'>Search</button>
                        </form>
                        <div className="hamburger-menu" onClick={handleHamburgerClick}>
                            <MenuIcon sx={{ color: '#fff' }} fontSize='large' />
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="dropdown-responsive-menu">
                        <a href="/" className='link-to-opts' onClick={handleLinkClick}>
                            Home
                        </a>
                        <a href="/movies" className='link-to-opts' onClick={handleLinkClick}>
                            Movies
                        </a>
                        <a href="/series" className='link-to-opts' onClick={handleLinkClick}>
                            Series
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;

