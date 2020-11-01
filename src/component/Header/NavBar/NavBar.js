import React from 'react';
import style from './NavBar.module.css';

const NavBar = ()=>{
    return(
        <div className={style.NavBar}>
            
            <div className={style.NavBarContent}>
                <a href="#" className={[style.Seconnecter,style.NavItem].join(' ')}>Se Connecter</a>
                <a href="#" className={style.NavItem}>S'inscrir</a>
                <a href="#" className={style.NavItem}>Services</a>
            </div>

        </div>
    )
}
export default NavBar;