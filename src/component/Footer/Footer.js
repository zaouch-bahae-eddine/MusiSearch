import React from 'react'
import style from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter  } from '@fortawesome/free-brands-svg-icons' 
function Footer() {
    return (
        <div className={style.FooterContainer}>
            <div className={style.FooterLogo}></div>

            <div className={style.FooterBottom}>

                <div className={style.FooterSocialNetwork}>
                    <a href="#" className={style.icon}><FontAwesomeIcon icon={faFacebookF} size="1.1x" /></a> 
                    <a href="#" className={style.icon}><FontAwesomeIcon icon={faInstagram} size="1.1x" /></a>
                    <a href="#" className={style.icon}><FontAwesomeIcon icon={faTwitter} size="1.1x" /></a>
                </div>
                <div className={style.FooterCopyRight}>CopyRight@2021</div>

            </div>

        </div>

                      
    )
}

export default Footer;
