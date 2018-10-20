import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import localforage from 'localforage';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ModalView from "@/components/adminManage/material/ModalViewTable";
import shareAdminStore from '../../stores/share/shareAdminStore'
import HeadBox from "../../components/shareAdmin/adminHead";
import Menu from "../../components/shareAdmin/adminMenu";
const adminStore = new shareAdminStore();
@observer
export default class storeAndCar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            rowsName: [{code:'id',name:'id',hidden:true},{code:'storeId',name:'',hidden:true },{code:'storeName',name:'店铺名称',add:true,type:'select',selectData:[] },
                {code:'carName',name:'车辆名称',add:true,type:'select',selectData:[] }, {code:'carNum',name:'车辆数量',add:true},{code:'def0',name:'元/辆/天',add:true}
            ],
            tableData:[],
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.initTable();
        this.getCar();
        this.getStore();
    }

    initTable = () =>{
        let param= {
            pageNo:0,
            pageSize:10
        }
        adminStore.getCarAndStore(param,(res)=>{
            this.setState({
                tableData:res
            })
        })
    }

    getCar =()=>{
        let rowsName = this.state.rowsName ;
        adminStore.getCarList((res)=>{
            rowsName[3].selectData = res || [];
            this.setState({
                rowsName
            })
        })
    }

    getStore =()=>{
        let rowsName = this.state.rowsName ;
        adminStore.getStoreList((res)=>{
            rowsName[2].selectData = res ||[] ;
            this.setState({
                rowsName
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
            adminStore.delStoreAndCar(rows,()=>{
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
            adminStore.saveStoreAndCar(data,()=>{
                this.closeModal();
                this.initTable();
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