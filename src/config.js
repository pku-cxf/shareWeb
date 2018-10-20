//调用java api的url

var serverUrl = process.env.SERVER;
if(window.SERVICESURL!=''){
  serverUrl = window.SERVICESURL
}
var Config = {
    share:{
        register:serverUrl + 'user/register',
        updateUser:serverUrl+'user/update',
        login:serverUrl + 'user/login',
        hasUser:serverUrl + 'user/hasUser',
        getCar:serverUrl+'car/getCarList',
        getStore:serverUrl + 'store/getStoreList',
        getDrivingList:serverUrl +'driving/getList',
        getCarInfo:serverUrl +'driving/getCarInfo',
        getStoreInfo:serverUrl +'driving/getStoreInfo',
        saveOrder:serverUrl + 'order/addOrder',
        getOrderList:serverUrl + 'order/queryOrderByUserId'
    },
    shareAdmin:{
        login:serverUrl+'admin/userLogin',
        getUserInfo:serverUrl +'admin/getUserInfo',
        delUserInfo:serverUrl +'admin/delUser',
        updateUserInfo:serverUrl+'admin/updateUser',
        getCarType:serverUrl+'admin/getCarType',
        saveCarType:serverUrl + 'admin/addCarType',
        delCarType:serverUrl + 'admin/delCarType',
        updateCarType:serverUrl + 'admin/updateCarType',
        getStore:serverUrl + 'admin/getStore',
        saveStore:serverUrl+'admin/addStore',
        delStore:serverUrl +'admin/delStore',
        getCarAndStore:serverUrl + 'admin/getCarAndStore',
        saveCarAndStore:serverUrl+ 'admin/addCarAndStore',
        getCarList:serverUrl + 'admin/getCarList',
        getStoreList:serverUrl + 'admin/getStoreList',
        delCarAndStore:serverUrl + 'admin/delCarAndStore',
        getOrderList:serverUrl+'admin/getOrderList',
        sureOrder:serverUrl + 'admin/sureOrder',
        queryAllOrderByPaystatu:serverUrl + 'admin/queryAllOrderByPaystatu'

    },
    common:{
        upload:serverUrl + 'common/upload', //单文件上传
    }





};

export default Config;
