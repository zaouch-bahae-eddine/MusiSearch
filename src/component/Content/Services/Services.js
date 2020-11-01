import React, { Component } from 'react';
import style from './Services.module.css';
import Service from './Service/Service';
class Services extends Component {
    state={
        dataServices: [
            {icon:'radio.png', name:'radio', description:'tata tata'},
            {icon:'caskbaf.png', name:'lest to music', description:'tata tata'},
            {icon:'guitare.png', name:'upload your own', description:'tata tata'},
            {icon:'cd.png', name:'upload your own', description:'tata tata'},
        ]
    }
    render() {
        return (
            <div className={style.Services}>
                {this.state.dataServices.map((service, index)=>{
                    return <Service srcIcon={service.icon}
                        name={service.name}
                        description={service.description}/>;
                })}
            </div>
        )
    }
}

export default Services;
