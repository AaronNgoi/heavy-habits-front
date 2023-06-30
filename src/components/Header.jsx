import React from 'react';


const Header = ({ text }) => {
    return (
        <header className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl text-center font-bold text-biege-form-colour font-fuzzy-bubbles pt-2 z-10 whitespace-nowrap">{text}</h1>
        </header>
    );
};


export default Header;