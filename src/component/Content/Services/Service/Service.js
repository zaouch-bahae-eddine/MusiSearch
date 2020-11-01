import React from 'react';
import style from './Service.module.css';

function Service(props) {
    return (
        <div className={style.Service}>
            <img clasName={style.ServiceIcon} src={"../../../../img/servicesIcons/"+props.srcIcon} alt="icon-service"/>
            <h3 className={style.ServiceName}>{props.name}</h3>
            <p className={style.ServiceDescription}>{props.description}</p>
        </div>
    )
}

export default Service;
