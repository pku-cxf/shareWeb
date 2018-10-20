import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '@/stores/GlobalStore';
import _ from  'lodash';
import Util from '@/common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';

@observer
export default class carType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            menu:[
                {id:0,name:'用户管理',href:'userList'},
                {id:1,name:'车辆类型管理',href:'carType'},
                {id:2,name:'店铺管理',href:'storeList'},
                {id:3,name:'店铺车辆管理',href:'storeAndCar'},
                {id:4,name:'订单管理',href:'order'},
            ],
            sign:true ,
        }
    }

    componentWillMount =()=>{
        this.getLimit();
        globalStore.hideAlert();

    }
    getLimit = () =>{
        localforage.getItem("ua").then((data)=>{
            if(!data || JSON.stringify(data) === '{}'){
                globalStore.showTipsModal("请重新登录","","",()=>{
                    window.location.href = "#/a/login";
                })
                return ;
            }
            if(data.data.type == 0){
                this.setState({
                    sign:false
                })
            }
        })
    }

    render(){
        let sign = this.state.sign ;
        return(
            <div className="share-admin-menu">
                <ul>
                    {this.state.menu.map((m,n)=>{
                        if(!sign){
                            if(m.id == 4){
                                return (
                                    <li key={n} title={m.name} className={this.props.menu == m.id ? "active":""}  ><a href ={"#/a/"+m.href}><i className="glyphicon glyphicon-tasks mr10"></i>{m.name}</a></li>
                                )
                            }
                        }else{
                            return (
                                <li key={n} title={m.name} className={this.props.menu == m.id ? "active":""} ><a href ={"#/a/"+m.href}><i className="glyphicon glyphicon-tasks mr10"></i>{m.name}</a></li>
                            )
                        }

                    })}

                </ul>

            </div>
        )

    }

}