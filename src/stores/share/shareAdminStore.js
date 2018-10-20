import {observable, computed, action} from 'mobx';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class  shareAdminStore{

    globalStore = GlobalStore;


    //用户登录
    @action userLogin(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url:Config.shareAdmin.login,
            data:JSON.stringify(param) ,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.msg ? data.msg : "登陆失败，账户或密码错误")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('登陆失败，账户或密码错误' + err.toString());
            }
        })
    }



    //获取车辆类型
    @action getUserInfo(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getUserInfo,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //
    @action delUser(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.delUserInfo+ '?id='+param.userId,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //修改用户信息
    @action updateUserInfo(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.updateUserInfo,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("修改成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })

    }





    //获取车辆类型
    @action getCarType(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getCarType+ '?pageNo='+param.pageNo + '&pageSize=' + param.pageSize,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //保存车型
    @action saveCarType(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.saveCarType,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    //删除车辆类型
    @action delCarType(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.delCarType+ '?id='+param.id,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action updateCarType(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.updateCarType,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("修改成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    //获取店铺信息列表
    @action getStore(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getStore+ '?pageNo='+param.pageNo + '&pageSize=' + param.pageSize,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 新增店铺信息
    @action saveStore(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.saveStore,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    //删除店铺
    @action delStore(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.delStore+ '?id='+param.storeId,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //获取店铺车辆信息列表
    @action getCarAndStore(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getCarAndStore+ '?pageNo='+param.pageNo + '&pageSize=' + param.pageSize,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 新增店铺车辆信息
    @action saveCarAndStore(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.saveCarAndStore,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })

    }


    //获取店铺车辆信息列表
    @action getCarList(callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getCarList,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取店铺信息列表
    @action getStoreList(callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getStoreList,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //保存店铺车辆信息
    @action saveStoreAndCar(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.shareAdmin.saveCarAndStore,
            data:JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    @action delStoreAndCar(param , callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.delCarAndStore+ '?id='+param.id,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取订单列表
    @action getOrderList(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.getOrderList + '?userId='+ param.userId + "&userType="+param.userType + "&payStatu=" +param.payStatu,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //商家确认订单
    @action sureOrder (id,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.sureOrder + '?id='+ id,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //    订单按状态分类
    @action queryAllOrderByPaystatu (id,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url:Config.shareAdmin.queryAllOrderByPaystatu + '?payStatu='+ id,
            contentType: "application/json",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                } else {
                    that.globalStore.showTipsModal(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showTipsModal('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


}