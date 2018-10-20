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
import HeadBox from "../../components/shareAdmin/adminHead";
import Menu from "../../components/shareAdmin/adminMenu";
const adminStore = new shareAdminStore();
@observer
export default class storeList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            rowsName: [
                {code:'storeId',name:'storeId',hidden:true},{code:'storeName',name:'店铺名',add:true },{code:'storeStar',name:'店铺星级',add:true },
                {code:'storePhone',name:'联系方式',add:true },{code:'storePhone',name:'登录用户名' },  {code:'storeAddressProvince',name:'所在省',add:true },
                {code:'storeAddressCity',name:'所在市',add:true },{code:'storeAddressArea',name:'所在区',add:true },{code:'storeAddress',name:'详细地址' ,add:true },
            ],
            tableData:[]
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.initTable();

    }

    initTable = () =>{
        let param= {
            pageNo:0,
            pageSize:10
        }
        adminStore.getStore(param,(res)=>{
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
    addRows =()=>{
        this.setState({
            show:true,
            operationType:'add',
            operationData:{}
        })

    }
    previewRows = (rows)=>{
        this.setState({
            show:true ,
            operationData:rows,
            operationType:'preview'
        })

    }
    editRows = (rows)=>{
        this.setState({
            show:true ,
            operationData:rows,
            operationType:'edit'
        })
    }
    deleteRows =(rows)=>{
        globalStore.showTipsModal("是否删除","small",()=>{},()=>{
            adminStore.delStore(rows,()=>{
                this.initTable()
            });
        })

    }
    closeModal = ()=>{
        this.setState({
            show:false
        })
    }



    saveModal = (data)=>{
        if(this.state.operationType =="add"){
            data.storeStar = parseInt( data.storeStar);
            data.storePhone = parseInt( data.storePhone);
            data.storeId = new Date().getTime();
            adminStore.saveStore(data,()=>{
                this.initTable();
                this.closeModal();
            })

        }else{

        }
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
                        <h2 className="share-admin-title">{this.props.name}</h2>
                        <div className="fr mb10">
                           <Button bsStyle="info" onClick={this.addRows}>新增</Button>
                        </div>
                        <BootstrapTable data={this.state.tableData} striped hover options={options}>
                            <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                            {this.state.rowsName.map((m,n)=>{
                                if(!m.hidden ){
                                    return (
                                        <TableHeaderColumn dataField={m.code} dataFormat={this.dataFormat.bind(this,m.code)}>{m.name}</TableHeaderColumn>
                                    )
                                }
                            })}

                            <TableHeaderColumn dataFormat = {
                                (cell,row)=>{
                                    return(
                                        <div className="a-operation-box">
                                            <span className="mr10 glyphicon glyphicon-eye-open" onClick={this.previewRows.bind(this,row)} title="查看"></span>
                                            <span className="mr10 glyphicon glyphicon-edit" onClick={this.editRows.bind(this,row)} title="编辑"></span>
                                            <span onClick={this.deleteRows.bind(this,row)} className="glyphicon glyphicon-trash" title="删除"></span>
                                        </div>
                                    )
                                }
                            }>操作</TableHeaderColumn>
                        </BootstrapTable>
                        <ModalView show= {this.state.show} saveModal = {this.saveModal} closeModal={this.closeModal} rowsName ={this.state.rowsName} data={this.state.operationData} type={this.state.operationType}/>
                    </div>
                </div>
            </div>
        )

    }

}