import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ModalView from "@/components/adminManage/material/ModalView";
import shareAdminStore from '../../stores/share/shareAdminStore'
import Menu from "../../components/shareAdmin/adminMenu";
import HeadBox from '../../components/shareAdmin/adminHead';
const adminStore = new shareAdminStore();
@observer
export default class orderList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            rowsName: [
                {code:'userId',name:'userId',hidden:true},{code:'userName',name:'用户名',hidden:true },{code:'name',name:'用户名',add:true },
                {code:'password',name:'密码',add:false }, {code:'email',name:'邮箱',add:true },
                {code:'phone',name:'电话',add:true },{code:'locked',name:'锁定状态',add:true },{code:'registerTime',name:'注册时间' },
            ],
            tableData:[],
            active:0,
            user:{},
            menu:[{id:'-1',name:'全部'},{id:'0',name:'待确认'},{id:'1',name:'已确认'}]
        }

    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.hasLogin();
    }
    hasLogin = () =>{
        localforage.getItem("ua").then((data)=>{
            if(!data || JSON.stringify(data) === '{}'){
                globalStore.showTipsModal("请登录系统","small","",()=>{
                    window.location.href= '#/a/login'
                })
            }else{
                this.setState({user:data},()=>{
                    this.initTable()
                })
            }
        })

    }

    initTable = () =>{
        let user = this.state.user ;
        let param= {
            userId:user.data.id,
            userType:user.data.type,
            payStatu:this.state.active
        }
        adminStore.getOrderList(param,(res)=>{
            this.setState({
                tableData:res 
            })
        })
    }

    dataFormat = (type,rows,cell)=>{
        return (
            <span>{rows}</span>
        )
    }

    deleteRows =(rows)=>{
        globalStore.showTipsModal("是否删除","small",()=>{},()=>{
          /*  adminStore.delOrder(rows,()=>{
                this.initTable()
            });*/
        })

    }

    sureOrder =(id)=>{
        globalStore.showTipsModal("确认订单后，请联系客户按时取车","sm",()=>{},()=>{
            adminStore.sureOrder(id,()=>{
                this.initTable();
            })
        })
    }

    changeTab = (type) =>{
        this.setState({
            active:type
        },()=>{ this.initTable()})

    }

    render(){
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="share-admin-box">
                <HeadBox />
                <div className="share-admin-body">
                    <Menu menu={this.state.menu} />
                    <div className="share-admin-content">
                        <div className="share-order-ul">
                            <ul>
                                {this.state.menu.map((m,n)=>{
                                    return (
                                        <li key={n} className={this.state.active == n ? 'active':''} onClick={this.changeTab.bind(this,n)}>{m.name}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        {this.state.tableData.length>0 ? this.state.tableData.map( (m,n)=>{
                            return(
                                <div className="share-order-list" key={n}>
                                    <div className="share-order-list-left fl">
                                        <img src={m.carTypes[0].img}/>
                                    </div>
                                    <div className="share-order-list-right fl">
                                        <div className="row mt10 mb10">
                                            <div className="col-md-2"><label>车型：</label></div>
                                            <div className="col-md-4">{m.carTypes[0].carName}</div>
                                            <div className="col-md-2"><label>总价：</label></div>
                                            <div className="col-md-4">{m.orderMoney}元   </div>
                                        </div>
                                        <div className="row mb10">
                                            <div className="col-md-2"><label>起止日期：</label></div>
                                            <div className="col-md-4">{m.startTime}</div>
                                            <div className="col-md-2"><label>结束日期：</label></div>
                                            <div className="col-md-4">{m.endTime}</div>
                                        </div>
                                        <div className="row mb10">
                                            <div className="col-md-2"><label>店铺地址：</label></div>
                                            <div className="col-md-4">{m.storeInfos[0].storeAddressProvince}{m.storeInfos[0].storeAddressArea}{m.storeInfos[0].storeAddress}</div>
                                            <div className="col-md-2"><label>联系电话：</label></div>
                                            <div className="col-md-4">{m.storeInfos[0].phone}</div>
                                        </div>
                                    </div>
                                    <div className="fr mt15">
                                        {m.payStatu == 0 ?　(<button className="btn btn-danger" onClick={this.sureOrder.bind(this,m.id)}>确认订单</button>):""}

                                    </div>
                                </div>
                            )
                        }):"暂无数据"}

                    </div>
                </div>

            </div>
        )

    }

}