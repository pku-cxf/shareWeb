import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';

import ShareStore  from '../../stores/share/shareStore';
const store = new ShareStore();

@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            loginParam:{}
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    componentWillReceiveProps(props){
        this.setState({
            show:props.show
        })
    }
    setInput = (type , e )=>{
        let loginParam= this.state.loginParam;
        loginParam[type] = $(e.currentTarget).val();
        this.setState({
            loginParam:loginParam
        })

    }
    handleLogin =()=>{
        let loginParam = this.state.loginParam;
        let param ={
            name:loginParam.name ||'',
            password:loginParam.password||''
        }

        store.userLogin(param,(data)=>{
            let user  = {
                name:loginParam.name ,
                userId:data
            }
            localforage.setItem("u",user,()=>{
                this.props.loginFn();
                this.handleClose();
            })
        })

    }

    handleClose =()=> {
        this.setState({ show: false });
    }

    render(){
        return(
            <div className="share-login">
                <div className="static-modal">
                    <Modal show={this.state.show}  onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="row form-horizontal share-login-box">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">用户名：</label>
                                    <div className="col-sm-6">
                                        <input type="text" onKeyUp={this.setInput.bind(this,"name")} className="form-control" placeholder="请输入用户名"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">密码：</label>
                                    <div className="col-sm-6">
                                        <input type="password" onKeyUp={this.setInput.bind(this,"password")} className="form-control" placeholder="请输入密码"/>
                                    </div>
                                </div>
                                <div className="share-login-button">
                                    <button className="btn btn-warning" onClick={this.handleLogin}>登 陆</button>
                                </div>
                            </div>

                        </Modal.Body>


                    </Modal>
                </div>;



            </div>
        )

    }

}