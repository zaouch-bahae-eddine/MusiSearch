import React, { Component } from 'react';
import style from './Services.module.css';
import Service from './Service/Service';
class Services extends Component {
    state={
        dataServices: [
            {icon:'radio.png', name:'radio', description:'tata tatatata tata tata tatatata tata'},
            {icon:'caskbaf.png', name:'lest to music', description:'tata tata tata tata tata tata tatatata'},
            {icon:'guitare.png', name:'upload your own', description:'tata tata tatatata tata tata tatatata tata tata'},
            {icon:'cd.png', name:'upload your own', description:'tata tatatata tatatata tata tata tatatata tata'},
        ]
    }
    render() {
        return (
            <div className={style.ServicesContainer}>
                <h2 className={style.ServiceTitle}>Services</h2>
                <div className={style.Services}>
                    {this.state.dataServices.map((service, index)=>{
                        return <Service key ={'service'+index}
                            srcIcon={service.icon}
                            name={service.name}
                            description={service.description}/>;
                    })}
                </div>
            </div>
        )
    }
}

export default Services;
