import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';
import Menu from '../../components/shareAdmin/adminMenu';
import CarType from '../../containers/shareAdmin/carType';
import UserList from '../../containers/shareAdmin/userList';
import StoreList from '../../containers/shareAdmin/storeList';
import StoreAndCar from '../../containers/shareAdmin/storeAndCar';

@observer
export default class adminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            menu:0,
            name:'用户管理'
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
    }
    componentDidMount = () =>{
        window.onresize = function(){
            $(".share-admin-menu").css("height",$(window).height()-50+"px")
        }
        $(".share-admin-menu").css("height",$(window).height()-50+"px")
    }

    changeMenu = (menu,name) =>{
        this.setState({
           // menu,name
        })
    }

    render(){
        return(
            <div className="share-admin-box">
                <div className="share-admin-head">
                    后台管理系统
                </div>
                <div className="share-admin-body">
                    <Menu menu={this.state.menu} changeMenu = {this.changeMenu}/>
                    <div className="share-admin-content">

                    </div>
                </div>

            </div>
        )

    }

}