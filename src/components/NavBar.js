import {useEffect, useState} from 'react';

function NavBar(props) {

    const [stickyClass, setStickyClass] = useState('');

    useEffect(()=> {
        window.addEventListener('scroll',stickNavbar);
        return () => window.removeEventListener('scroll',stickNavbar);
    },[]);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
        }
    };
    
    return(
        <div className={`navbar ${stickyClass}`}>
            <div className='walletText'>Wallet Adress: {props.defaultAccount}</div>
        </div>
    );
}
export default NavBar;