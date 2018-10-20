import {observable, computed, action} from 'mobx';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class  adminManageStore{

    globalStore = GlobalStore;

    //用户注册
    @observable userRegResult = {};
    @action userReg (param , callback ){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.share.register,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    this.userRegResult = Object.assign({},data)
                    if (typeof callback == "function") {
                        callback(data.data);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //修改密码
    @action updatePassword (param , callback ){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.share.updateUser,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    this.userRegResult = Object.assign({},data)
                    if (typeof callback == "function") {
                        callback(data.data);
                    }
                } else {
                    that.globalStore.showError("修改失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }




    //用户登录
    @action userLogin(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.share.login,
            data:JSON.stringify(param) ,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 && data.data != -2 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal("登陆失败，账户或密码错误","small")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //验证用户是否存在
    hasName = (name,callback) =>{
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.hasUser　+ "?name=" + name ,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    // 获取汽车类型列表
    @action getCar(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getCar,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 获取汽车类型列表
    @action getStore(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getStore,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //获取首页展示数据

    @action getIndex(callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.adminManage.getIndex,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }




    //获取自驾租车车辆列表
    @action getDrivingList (param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getDrivingList,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    let result = data.data ;
                    result.map((m)=>{
                        m.gmtCreate  = Utils.formatDate(m.gmtCreate)
                        m.gmtModified  = Utils.formatDate(m.gmtModified)
                    })

                    this.ListMaterial = Object.assign([],data.data)
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //获取自驾租车车辆列表
    @action getCarInfo (param,id,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getCarInfo + "?carId="+ param + "&id=" + id,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取自驾租车车辆列表
    @action getStoreInfo (param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getStoreInfo + "?storeId=" + param ,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action saveOrder(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.share.saveOrder,
            dataType: "json",
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    // 获取订单列表
    @action getOrder(userId,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.share.getOrderList + "?userId=" + userId ,
            dataType: "json",
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }



}