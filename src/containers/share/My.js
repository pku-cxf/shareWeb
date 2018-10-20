import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Foot from '../../components/share/Foot';
import Nav from '../../components/share/Nav';
import UpdateUser from '../../components/share/UpdateUser'
import OrderList from '../../components/share/OrderList'

@observer
export default class My extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            current:0,
            menu:[{id:0,name:'我的订单'},{id:1,name:'修改密码'}]
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    setTab = (current ) =>{
        this.setState({current})
    }

    render(){
        let current = this.state.current;
        return(
            <div className="share-box">
                <Nav/>
                <div className="share-my share-car">
                    <div className="share-my-left">
                        <ul>
                            {this.state.menu.map((m,n)=>{
                                return (
                                    <li key={n} className={current==n ? "active":""} onClick={this.setTab.bind(this,m.id)}>{m.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="share-my-right">
                        <OrderList show={current==0 ? true : false }/>
                        <UpdateUser show={current==1 ? true : false }/>
                    </div>
                </div>

                <Foot/>

            </div>
        )

    }

}