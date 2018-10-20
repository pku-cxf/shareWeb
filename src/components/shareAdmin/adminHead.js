import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import localforage from 'localforage';

@observer
export default class adminHead extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            menu:0,
            name:'用户管理',
            user:{}
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.hasLogin();
    }
    componentDidMount = () =>{
        window.onresize = function(){
            $(".share-admin-menu").css("height",$(window).height()-50+"px")
        }
        $(".share-admin-menu").css("height",$(window).height()-50+"px")
    }

    hasLogin = () =>{
        localforage.getItem("ua").then((data)=>{
            if(!data || JSON.stringify(data) === "{}"){
                globalStore.showTipsModal("请先登录系统","small","",()=>{
                    window.location.href = "#/a/login";
                })
                return ;
            }
            this.setState({user:data})
        })
    }
    logOut =()=>{
        localforage.setItem("ua",{},()=>{
            window.location.href = "#/a/login";
        });
    }

    render(){
        return(
            <div className="share-admin-box">
                <div className="share-admin-head">
                    <div className="fl">后台管理系统</div>
                    <div className="share-admin-head-right fr">
                        <span className="mr20">欢迎您 {","+this.state.user.name}</span>
                        <span className="fr" title="退出" onClick={this.logOut}>退出</span>
                    </div>
                </div>

            </div>
        )

    }

}