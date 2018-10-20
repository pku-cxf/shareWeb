import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import ShareStore  from '../../stores/share/shareStore';
import {Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DrivingList from "@/components/share/DrivingList";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import localforage from 'localforage';
const  store = new ShareStore();
@observer
export default class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            user:{},
            carInfo:{},
            storeInfo:{},
            startDate:"",
            endDate:"",
            startDateFormat:"",
            endDateFormat:"",
            orderTotal:0,
            carDay:0,
            insure:30,  //保险费用   0元/天
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.getCarInfo();
        this.getStoreInfo();
    }

    componentDidMount = () =>{

    }

    componentWillReceiveProps=(props)=>{
    }

    handleLogin = (callback) =>{
        localforage.getItem("u").then((user)=>{
            if(user){
                this.setState({user},()=>{
                    if(typeof callback == "function")
                        callback();
                })
            }else{
                this.setState({user:{}})
            }
        });
    }

    getCarInfo = () =>{
        let carId = this.props.routerParam.carId , id =  this.props.routerParam.id;;
        store.getCarInfo(carId,id,(data)=>{
            this.setState({
                carInfo:data
            })
        })
    }

    getStoreInfo = () =>{
        let storeId = this.props.routerParam.storeId;
        store.getStoreInfo(storeId,(data)=>{
            this.setState({
                storeInfo:data
            })
        })
    }

    handleChange =(index,date)=>{
        let foramtDate = date.format("YYYY-MM-DD HH:mm:ss")
        if(index==0)
            this.setState({
                startDate:date,
                startDateFormat:foramtDate
            })
        else{
            this.setState({
                endDate:date,
                endDateFormat:foramtDate
            })
        }

    }
    handleDate = () =>{
        let startDate = this.state.startDate ,endDate =  this.state.endDate ;
        if(endDate<startDate){
            this.setState({
                endDate:startDate
            })
        }
        let result  =  Math.ceil( (endDate - startDate)/1000/24/60/60);
        if(result>0){
            let orderTotal = (parseFloat( this.state.carInfo.def1 )+ this.state.insure ) * result ;
            this.setState({
                carDay:result,
                orderTotal
            })
        }
    }

    handleSubmit = () =>{
        let startDate = this.state.startDateFormat , endDate = this.state.endDateFormat ;
        let carInfo = this.state.carInfo, storeInfo  = this.state.storeInfo ;
        let carDay = this.state.carDay ;

        if(carDay == 0 || this.state.orderTotal == 0){
            globalStore.showTipsModal("请选择您的租赁日期","small")
            return ;
        }
        let user = {}
        this.handleLogin(()=>{
            user = this.state.user ;
            if(JSON.stringify(user) === '{}'){
                globalStore.showTipsModal("请您先登录","small")
                return ;
            }
            if(user.id ==""){
                globalStore.showTipsModal("请您先登录","small")
                return ;
            }

            let param  = {
                carId:carInfo.id,
                userId:user ? user.userId:'',
                storeId:storeInfo.storeId,
                startTime:startDate,
                endTime:endDate,
                orderMoney:this.state.orderTotal,
                orderTime:new Date().getTime(),
                day:this.state.carDay
            }
            store.saveOrder(param,()=>{
                globalStore.showTipsModal("恭喜您，预约成功!","small","",()=>{
                    //  hashHistory.push =  "#/home" ;
                    window.location.href = '#/home'
                })

            })
        });


    }

    render(){
        let carInfo = this.state.carInfo, storeInfo  = this.state.storeInfo ;
        return(
            <div className="share-detail w1180 mb30">
                <div className="share-detail-date">
                    <div className="fl mr10">请选择租期：</div>
                    <div className="fl mr10">
                        <DatePicker showTimeSelect
                                    selected={this.state.startDate}
                                    onChange={this.handleChange.bind(this,0)}
                                    timeFormat="HH:mm"
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    className={"share-date-style"}
                                    timeIntervals={15}
                                    dateFormat="YYYY-MM-DD HH:mm:ss"
                                    locale="zh_cn"
                                    isClearable={true}
                                    placeholderText ="请选择提车时间"
                                    timeCaption="时间" />

                    </div>
                    <div className="fl mr10">-</div>
                    <div  className="fl mr10">
                        <DatePicker showTimeSelect
                                    selected={this.state.endDate}
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChange.bind(this,1)}
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    className={"share-date-style"}
                                    dateFormat="YYYY-MM-DD HH:mm:ss"
                                    isClearable={true}
                                    locale="zh_cn"
                                    placeholderText ="请选择还车时间"
                                    timeCaption="时间" />
                    </div>
                    <div className="fl">
                        <Button onClick={this.handleDate}>确认</Button>
                    </div>

                </div>

                <div className="share-detail-left">
                    <div className="share-detail-order">
                        <div className="fl share-detail-left-img ">
                            <img src={carInfo.img}/>
                            <p>
                                {carInfo.def1}元/天
                            </p>
                        </div>
                        <div className="share-detail-left-info">
                            <h5>{carInfo.carName}</h5>
                            <div className="row">
                                <div className="col-md-6">
                                   <label>座位：</label>
                                    <span>{carInfo.carSeat}座</span>
                                </div>
                                <div className="col-md-6">
                                    <label>驱动类型：</label>
                                    <span>{carInfo.carDrive}驱</span>
                                </div>
                                <div className="col-md-6">
                                    <label>产地：</label>
                                    <span>{carInfo.carProduce}</span>
                                </div>
                                <div className="col-md-6">
                                    <label>档位类型：</label>
                                    <span>{carInfo.def0}</span>
                                </div>
                            </div>
                            <div className="">
                                <label>店铺地址：</label>
                                <span>{storeInfo.storeAddressProvince}{storeInfo.storeAddressCity}{storeInfo.storeAddressArea}{storeInfo.storeAddress}</span>
                            </div>
                            <div className="">
                                <label>店铺电话：</label>
                                <span>{storeInfo.storePhone}</span>
                            </div>
                            <div className="share-detail-other">
                                <p>订单说明：</p>
                                <span> 不限公里数，超时费按车辆租赁费及门店服务费均价÷6收取实际超期小时费 (部分0元活动订单，按照40元/小时进行收取)。</span>
                            </div>
                        </div>
                    </div>

                    <div className="share-detail-tip">
                        首次租车请使用本人信用卡，本人二代有效身份证，本人有效地方驾驶证正副本。
                        本订单仅为客户租车预约登记，提交该订单后，客户需要到门店办理具体租车手续，具体权利义务以签署的合同为准。
                    </div>

                </div>

                <div className="share-detail-right">
                    <h2>费用明细</h2>
                    <div className="share-detail-base">
                        <label>车辆租赁费及门店服务费:</label>
                        <span className="fr">￥ <span className="orange">{carInfo.def1}</span>元</span>
                    </div>
                    <div className="share-detail-base">
                        <label>基本保障服务费:</label>
                        <span className="fr">￥ <span className="orange"> {this.state.insure}</span>元</span>
                    </div>
                    <div className="share-detail-base">
                        <label>租赁天数:</label>
                        <span className="fr"><span className="orange"> {this.state.carDay}</span>天</span>
                    </div>
                    <div className="share-detail-base">
                        <label>车辆押金（可退）:</label>
                        <span className="fr"> ￥ <span className="orange"> 6000.00</span>元</span>
                    </div>
                    <div className="share-detail-base">
                        <label>违章押金（可退）</label>
                        <span className="fr"> ￥ <span className="orange"> 2000.00</span>元</span>
                    </div>
                    <div className="share-detail-total">
                        合计：<span className="orange">￥{this.state.orderTotal}元</span>
                    </div>
                    <div  className="share-detail-button">
                        <Button className="fr mr10"  bsStyle="warning" onClick={this.handleSubmit}>提交订单</Button>
                    </div>



                </div>

            </div>

        )

    }

}