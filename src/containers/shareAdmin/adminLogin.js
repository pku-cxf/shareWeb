import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import shareAdminStore from '../../stores/share/shareAdminStore';
import localforage from 'localforage';
const store = new shareAdminStore();
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            loginError:false,
            userName:"",
            password:"",
            userNameError:false,
            passwordError:false
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        let that = this;
        document.onkeydown=function(event){
            var e = event || window.event ;
            if(e.keyCode == 13){
                that.loginSys();
            }
        }
    }

    render(){
        return(
            <div className="b-login">
                <div className="b-login-box">
                    <h1>欢迎登陆系统</h1>
                    <div className="row mt30">
                        <span>用户名：</span>
                        <input type="text"  value={this.state.userName} className={this.state.userNameError ?"input-error b-input":"b-input" } placeholder="请输入用户名" onChange={this.setInput.bind(this,0)}/>
                    </div>
                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password"  value={this.state.password} className={this.state.passwordError ?"input-error b-input":"b-input" } onChange={this.setInput.bind(this,1)}/>

                    </div>
                    <div className="row" >
                        <div className="b-login-box-btn">
                            <Button onClick={this.loginSys}>登陆</Button>
                        </div>
                        {this.state.loginError == true ? (<p className="mt10 mb30 error text-center">用户名或密码错误</p>):""}
                    </div>

                </div>

            </div>
        )

    }

    setInput =(param,e)=>{
        let val = $.trim(e.target.value) ;
        if(param == 0){
            this.setState({
                userName:val,
                userNameError:false
            })
        }else{
            this.setState({
                password:val,
                passwordError:false
            })
        }
    }


    loginSys =()=>{
        let userName = this.state.userName , password = this.state.password ;
        if(!userName){
            this.setState({
                userNameError:true
            })
            return;
        }
        if(!password){
            this.setState({
                passwordError:true
            })
            return;
        }
        let param = {
            "userName":userName,
            "password":password
        }
        store.userLogin(param,(data)=>{
            data.name = userName;
            localforage.setItem("ua",data);
            $("#root").removeClass("b-login");
            if(data.userType == 1){
                window.location.hash='#/a/userList';
            }else{
                window.location.hash='#/a/order';
            }
        });

    }
}