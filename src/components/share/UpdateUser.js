import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import ShareStore  from '../../stores/share/shareStore';
const  store = new ShareStore();
import  tips from '../../common/tips';
import localforage from 'localforage';
@observer
export default class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            tips0:'',
            tips:'',
            param:{
                password:'',
                newPassword:'',
                newPassword1:''
            }

        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
    }

    componentDidMount = () =>{

    }
    hasLogin = (callback) =>{
        localforage.getItem("u").then((user)=>{
            if(user){
                this.setState({user},()=>{
                    if(typeof  callback == "function"){
                        callback();
                    }
                })
            }else{
                this.setState({user:{}})
            }
        });
    }


    setInput = (type,e) =>{
        let param = this.state.param , val = e.target.value ;
        param[type]= val ;
        if(type=='password'){
            let t = "";
            if(val ==''){
                t= tips.user.password1
            }
            this.setState({
                tips0:t
            })
        }
        if(type == "newPassword1"){
            if( param.newPassword != param.newPassword1 ){
                this.setState({
                    tips:tips.user.password1
                })
                return ;
            }else{
                this.setState({
                    tips:""
                })
            }
        }
        if(type == "newPassword"){
            if( param.newPassword != param.newPassword1 ){
                this.setState({
                    tips:tips.user.password1
                })
                return ;
            }else{
                this.setState({
                    tips:""
                })
            }
        }
        this.setState({param})
    }

    logout = () =>{
        localforage.setItem("u","",()=>{
            window.location.href = '#/home';
            window.location.reload();
        })
    }

    handlerSubmit = () =>{
            this.hasLogin(
            ()=>{
                this.validation();
                let param  = this.state.param;
                let json = {
                    userId:this.state.user.userId,
                    password:param.password,
                    newPassword:param.newPassword
                };
                store.updatePassword(json,(data)=>{
                    if(data == 0){
                        globalStore.showTipsModal("密码修改成功，请重新登录",'small',"",()=>{
                            this.logout();
                        });
                    }
                })
            }
        );

    }
    validation =() =>{
        let param  = this.state.param;
        if(!param.password){
            this.setState({
                tips0:tips.user.password2
            })
            return ;
        }
        if(this.state.tips || !param.newPassword || !param.newPassword1){
            this.setState({
                tips:tips.user.password
            })
            return ;
        }
        if( this.state.user.id ==""){
            globalStore.showTipsModal("请先登录","small")
            return ;
        }
    }

    render(){
        return(
            <div className={this.props.show ? "share-user":"hide"}>
                <div className="form-group">
                    <label  className="col-sm-2 control-label">原密码：</label>
                    <div className="col-sm-6">
                        <input type="password" className="form-control" placeholder="请输入原密码" onChange={this.setInput.bind(this,"password")}/>
                    </div>
                    <div className="col-sm-3 red">{this.state.tips0}</div>
                </div>
                <div className="form-group mt15">
                    <label  className="col-sm-2 control-label">新密码：</label>
                    <div className="col-sm-6">
                        <input type="password" className="form-control" placeholder="请输入新密码" onChange={this.setInput.bind(this,"newPassword")}/>
                    </div>
                    <div className="col-sm-3 red">{this.state.tips}</div>
                </div>
                <div className="form-group mt15">
                    <label  className="col-sm-2 control-label">确认密码：</label>
                    <div className="col-sm-6">
                        <input type="password" className="form-control" placeholder="请确认新密码" onChange={this.setInput.bind(this,"newPassword1")}/>
                    </div>
                </div>
                <div className="share-user-button mt15">
                    <button type="button" className="btn btn-warning" onClick={this.handlerSubmit}>确认</button>
                </div>
            </div>
        )

    }

}