import React from 'react';
import NavBar from './NavBar/NavBar';
import style from './Header.module.css';
const Header = (props)=>{
    return (
        <div className={style.Header}>

            <NavBar/>
            <div className={style.HeaderContent}>

                <div className={style.HeaderIcon}>

                    <div className={style.HeaderRendB}>
                        <div className={style.HeaderRendR}></div>
                    </div>

                </div>

                <div className={style.HeaderText}>

                    <h1 className={style.HeaderTitle}>Musi<span>Search</span></h1>
                    <p className={style.HeaderDescription}>Lorem ipsum dolor, sit cessitatibus praesentium ratione dolore porro quos culpa quia.</p>

                </div>

                <div className={style.HeaderButton}>
                    <a href="#" className={style.Sinscrir}> S'inscrir</a>
                </div>
            </div>

        </div>
    )
}
export default Header;