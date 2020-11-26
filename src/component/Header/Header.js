import React from 'react';
import NavBar from './NavBar/NavBar';
import style from './Header.module.css';
const Header = (props)=>{
    return (
        <div className={style.Header}>

            <NavBar/>
            <div className={style.HeaderBackground}>
                
                <div className={style.HeaderContent}>

                    <div className={style.HeaderIcon}>

                        <div className={style.HeaderRendB}>
                            <div className={style.HeaderRendR}></div>
                        </div>

                    </div>

                    <div className={style.HeaderTextParent}>
                        <div className={style.HeaderText}>

                            <h1 className={style.HeaderTitle}>Musi<span>Search</span></h1>
                            <p className={style.HeaderDescription}>Lorem ipsum dolor, sit cessitatibus praesentium ratione dolore porro quos culpa quia.</p>
                            <div className={style.HeaderButton}>
                                <a href="#" className={style.Sinscrir}> S'inscrire</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Header;