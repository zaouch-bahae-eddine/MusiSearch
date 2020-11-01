import React, { Component } from 'react';
import style from './Services.module.css';
import Service from './Service/Service';
class Services extends Component {
    state={
        dataServices: [
            {icon:'', name:'radio', description:'tata tata'},
            {icon:'', name:'lest to music', description:'tata tata'},
            {icon:'', name:'upload your own', description:'tata tata'},
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
