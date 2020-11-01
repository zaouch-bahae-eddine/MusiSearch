import React from 'react';
import style from './Content.module.css';
import Services from './Services/Services';
function Content() {
    return (
        <div className={style.Content}>
            <Services/>
        </div>
    )
}

export default Content;
