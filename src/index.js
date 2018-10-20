import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import * as className from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as reactBootstrap from 'react-bootstrap';
import * as reactDatepicker from 'react-datepicker';
import $ from 'jquery';
import Config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import './less/share.less';
import GlobalStore from './stores/GlobalStore';
import App from './containers/App';
import Bundle from './bundle.js';

import LoginContainer from 'bundle-loader?lazy&name=app-[name]!./containers/adminManage/Login';
import HomeContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Home';
import RegisterContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Register';
import CarContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Car';
import OrderContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Order';
import OrderListContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/OrderList';
import StoreContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Store';
import ActiveContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Active';
import RelayContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Relay';
import DrivingContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/Driving';
import MyContainer from 'bundle-loader?lazy&name=app-[name]!./containers/share/My';


const Login  = (props) => (<Bundle load={LoginContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Home  = (props) => (<Bundle load={HomeContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Register  = (props) => (<Bundle load={RegisterContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Car  = (props) => (<Bundle load={CarContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Order  = (props) => (<Bundle load={OrderContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const OrderList  = (props) => (<Bundle load={OrderListContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Store  = (props) => (<Bundle load={StoreContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Active  = (props) => (<Bundle load={ActiveContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Relay  = (props) => (<Bundle load={RelayContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Driving  = (props) => (<Bundle load={DrivingContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const My  = (props) => (<Bundle load={MyContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)


/*admin*/
import adminLogin from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/adminLogin';
import aHomeContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/adminHome';
import aCarContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/carType';
import aStoreListContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/storeList';
import aUserListContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/userList';
import aStoreAndCarContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/storeAndCar';
import aOrderListContainer from 'bundle-loader?lazy&name=app-[name]!./containers/shareAdmin/orderList';

const aLogin =  (props) => (<Bundle load={adminLogin} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aHome =  (props) => (<Bundle load={aHomeContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aCar =  (props) => (<Bundle load={aCarContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aStoreList =  (props) => (<Bundle load={aStoreListContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aUserList =  (props) => (<Bundle load={aUserListContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aStoreAndCar =  (props) => (<Bundle load={aStoreAndCarContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const aOrderList =  (props) => (<Bundle load={aOrderListContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)

const requireAuth = (nextState, replace, next) => {
  //切换路由时初始化环境
  GlobalStore.hideAlert();
  // 本地调试环境不进行auth
  if (process.env.NODE_ENV === 'development' || process.env.PROD_SERVER === "1.1.1.1:8888") {
    next();
    return;
  }
  //验证权限
/*  $.ajax({
    type: "GET",
    url: "",
    success: data => {
      if (data.success) {
        next();
      } else {
        window.location = Config.base.index;
      }
    }
  });*/
}
// <Route path="/home" component={Home}/>
ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/car' component={Car}/>
        <Route path='/store' component={Store}/>
        <Route path='/order/:storeId/:carId/:id' component={Order}/>
        <Route path='/orderList' component={OrderList}/>
        <Route path='/relay' component={Relay}/>
        <Route path='/active' component={Active}/>
        <Route path='/driving' component={Driving}/>
        <Route path='/my' component={My}/>

        <Route path='/a/' >
            <Route path='login' component={aLogin}/>
            <Route path ='home' component={aHome} />
            <Route path ='carType' component={aCar} />
            <Route path ='userList' component={aUserList} />
            <Route path ='storeList' component={aStoreList} />
            <Route path ='storeAndCar' component={aStoreAndCar} />
            <Route path ='order' component={aOrderList} />
            <Route />
        </Route>





    </Route>
  </Router>,
  document.getElementById('root')
);
