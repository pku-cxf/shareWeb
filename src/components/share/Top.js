import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Login from '../../components/share/Login';
import localforage from 'localforage';
import {Link,hashHistory} from 'react-router';
@observer
export default class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            show:false,
            user:{}
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();


    }

    componentDidMount = () =>{
        this.hasLogin();
    }
    showLogin = ()=>{
        this.setState({
            show:true
        })
    }
    hasLogin = () =>{
        localforage.getItem("u").then((user)=>{
            if(user){
                this.setState({user,show:false})
            }else{
                this.setState({user:{}})
            }
        });
    }

    logout = () =>{
        localforage.setItem("u","",()=>{
            this.hasLogin();
            globalStore.showTipsModal("您已退出本系统","small");
            window.location.href ="#/home";
        })
    }

    loginFn = () =>{
        this.hasLogin();
    }

    render(){
        let user = this.state.user ;
        return(
            <div className="share-head">
                <div className="share-head-box">
                    <div className="share-head-top">
                        {JSON.stringify(user)=="{}" ? (
                            <div className="share-top-left fl">
                                <a href="javascript:;" onClick={this.showLogin}>登录</a>
                                <a href="#/register">注册</a>
                            </div>
                        ):(
                            <div className="share-top-left fl">
                                <a href="javascript:">欢迎您，{user.name}</a>
                            </div>
                        )}


                        <div className="share-top-right fr">
                            {JSON.stringify(user)!="{}" ? (
                                <Link to="/my">个人中心</Link>
                            ):""}
                            <a href="javascript:;">帮助中心</a>
                            <a href="javascript:;">400-0000-8888</a>
                            {JSON.stringify(user)!="{}" ? (
                                <a href="javascript:;" onClick={this.logout}>退出</a>
                            ):""}
                        </div>
                    </div>
                </div>
                <div className="w1180 h50">
                    <a href="javascript:;" className="logo"></a>
                </div>
                <Login show={this.state.show} loginFn = {this.loginFn}/>
            </div>

        )

    }

}