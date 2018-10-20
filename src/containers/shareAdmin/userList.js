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
export default class userList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            rowsName: [
                {code:'userId',name:'userId',hidden:true},{code:'userName',name:'用户名',hidden:true },{code:'name',name:'用户名',add:true },
                {code:'password',name:'密码',add:false }, {code:'email',name:'邮箱',add:true },
                {code:'phone',name:'电话',add:true },{code:'locked',name:'锁定状态',add:true },{code:'registerTime',name:'注册时间' },
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
        adminStore.getUserInfo(param,(res)=>{
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
            adminStore.delUser(rows,()=>{
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

        }else{
            var param = {
                userId:data.userId,
                name:data.name,
                email:data.email,
                locked:data.locked,
                phone:data.phone
            }
            adminStore.updateUserInfo(param,()=>{
                this.closeModal();
            })
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