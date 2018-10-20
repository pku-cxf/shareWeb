import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';
import Top from '../../components/share/Top';
import ShareStore  from '../../stores/share/shareStore';
const store = new ShareStore();
import tips  from '../../common/tips';

@observer
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            registerParam:{
                password:'',
                password1:''
            },
            tips:{
                name:"",
                password:"",
                phone:"",
            }
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    //判断用户名是否存在
    hasUser = () =>{
        let name = this.state.registerParam ?　this.state.registerParam.name :'';
        if(name){
            store.hasName( name ,(data)=>{
                let tip ="";
                if(data == -1 )
                    tip = tips.user.name1
                this.setState({
                    tips:{
                        name:tip
                    }

                })
            })
        }
    }
    setInput = (type , e )=>{
        let registerParam= this.state.registerParam;
        registerParam[type] = $(e.currentTarget).val();
        this.setState({
            registerParam:registerParam
        })
    }

    validate = () =>{
        let password= this.state.registerParam.password , password1 = this.state.registerParam.password1
        let tip = "";
        if(password != password1){
            tip= tips.user.password1;
        }
        this.setState({
            tips:{
                password:tip
            }
        })
    }

    validatePhone = ()=>{
        let phone= this.state.registerParam.phone ;
        let pattern =/^1(3|4|5|7|8)\d{9}$/;
        let tip="";
        if(!pattern.test(phone)){
            tip = tips.user.phone
        }
        this.setState({
            tips:{
                phone:tip
            }
        })
    }
    handleRegister =()=>{
        let registerParam = this.state.registerParam;
        if(!this.validateAll()){
            return;
        }
        let param ={
            name:registerParam.name ||'',
            password:registerParam.password||'',
            email:registerParam.email||'',
            phone:registerParam.phone||'',
            sendAddress0:registerParam.address||''
        }

        store.userReg(param,(data)=>{
            globalStore.showTipsModal("注册成功！","small",()=>{},()=>{
                let info = {
                    userId:data ,
                    name:registerParam.name
                }
                localforage.setItem("u",info,()=>{
                    window.location.href ="#/home";
                })

            })
        })
    }

    validateAll = () =>{
        let registerParam = this.state.registerParam , tip = this.state.tips ;
        let  bool = true  ;
        if(registerParam.name == '' || registerParam.password == "" || registerParam.password1 =="" || registerParam.phone=="" ){
           globalStore.showTipsModal("请填写注册信息！","small");
           bool = false ;
        }
        return bool;

        
    }

    render(){
        return(
            <div className="share-box">
                <Top/>
                <div className="row share-register w1180">
                    <div className="share-register-left form-horizontal col-md-8 mt50">
                        <div className="form-group">
                            <label className="col-sm-2 control-label"><span className="red">*</span>用户名：</label>
                            <div className="col-sm-6">
                                <input type="text" onChange={this.setInput.bind(this,"name")} onBlur={this.hasUser} className="form-control" placeholder="请输入用户名"/>
                            </div>
                            <div className="col-sm-2"> <span className="fl red">{this.state.tips.name}</span></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label"><span className="red">*</span>密码：</label>
                            <div className="col-sm-6">
                                <input type="password" onChange={this.setInput.bind(this,"password")} className="form-control" placeholder="请输入密码"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label"><span className="red">*</span>确认密码：</label>
                            <div className="col-sm-6">
                                 <input type="password" onChange={this.setInput.bind(this,"password1")} className="form-control" onBlur={this.validate} placeholder="请再次输入密码"/>
                            </div>
                            <div className="col-sm-2"> <span className="fl red">{this.state.tips.password}</span></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label"><span className="red">*</span>手机号：</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" onChange={this.setInput.bind(this,"phone")} onBlur={this.validatePhone} placeholder="请输入手机号"/>
                            </div>
                            <div className="col-sm-2"> <span className="fl red">{this.state.tips.phone}</span></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">联系地址：</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" onChange={this.setInput.bind(this,"address")} placeholder="请输入联系地址"/>
                            </div>
                        </div>
                        <div className="share-register-button">
                            <button className="btn btn-warning" onClick={this.handleRegister}>注 册</button>
                        </div>

                        <div className="share-register-go">
                            已有账号，<a href="javascript:;">直接登录</a>
                        </div>

                    </div>
                    <div className="share-register-right col-md-4 mt50">
                        <div className="share-register-msg">
                            <dl>
                                <dt>注册送豪礼</dt>
                                <dd>注册即可获得</dd>
                                <dd>
                                    <span className="glyphicon glyphicon-fire mr15 red"></span>
                                    <span>1000元代金券</span>
                                </dd>
                                <dd>
                                    <span className="glyphicon glyphicon-fire mr15 red"></span>
                                    <span>5倍积分</span>
                                </dd>
                                <dd>
                                    <span className="glyphicon glyphicon-fire mr15 red"></span>
                                    <span>1000元代金券</span>
                                </dd>

                            </dl>

                        </div>

                    </div>

                </div>

            </div>
        )

    }

}