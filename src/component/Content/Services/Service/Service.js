import React from 'react';
import style from './Service.module.css';
function Service(props) {
    return (
        <div className={style.Service}>
            <img className={style.ServiceIcon} src={require("../../../../img/servicesIcons/"+ props.srcIcon).default } alt="icon-service"/>
            <h3 className={style.ServiceName}>{props.name}</h3>
            <p className={style.ServiceDescription}>{props.description}</p>
        </div>
    )
}

export default Service;
