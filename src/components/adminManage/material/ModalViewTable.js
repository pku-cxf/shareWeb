import React from 'react';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '@/config';
import globalStore from '@/stores/GlobalStore';
import FileUpload from '../material/Upload';
import Select from 'react-select';
import Banner from "@/components/share/Banner";

export default class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modalObj:{},
            inputvalue:"",
            inputvalue1:"",
            selectvalue0:"",
            selectvalue1:"",
            carList:[],
        }
    }


    componentWillReceiveProps(props){
        if(props.type == 'add'){
            this.setState({
                inputvalue:"",
                inputvalue1:"",
                selectvalue0:"",
                selectvalue1:"",
                carList:[],
            })
        }

        this.setState({
            modalObj:props.data
        })
    }

    close =()=>{
        this.props.closeModal();
    }

    saveModal =()=>{
        let param = {
            storeName:this.state.selectvalue0?this.state.selectvalue0.label:"",
            storeId:this.state.selectvalue0?this.state.selectvalue0.value:"",
            carList:this.state.carList
        };
        this.props.saveModal(param)
    }

    setInput = (e)=>{
        let val = e.target.value ;
        this.setState({
            inputvalue:val
        })
    }
    setInput1 = (e)=>{
        let val = e.target.value ;
        this.setState({
            inputvalue1:val
        })
    }

    handleChange0 = (data) =>{
        this.setState({
            selectvalue0:data
        })
    }
    handleChange1 = (data) =>{
        this.setState({
            selectvalue1:data
        })
    }

    addTable = () =>{
        let carList = this.state.carList ;
        let selectvalue1 = this.state.selectvalue1 , inputvalue = this.state.inputvalue , inputvalue1 = this.state.inputvalue1;
        carList.push({id:""+new Date().getTime()+"",carName:selectvalue1.label,carId:selectvalue1.value,carNum:inputvalue,carPrice:inputvalue1});
        this.setState({carList})
    }

    delTableRow = (id) =>{
        let carList = this.state.carList
        _.remove(carList,(n)=>{
            return n.id == id ;
        })
        this.setState({
            carList
        })
    }

    render(){
        const {data} = this.props ;
        const {rowsName} = this.props ;

        return(
            <Modal show={this.props.show} bsSize="large" onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.type == "add"?"新增":(this.props.type =="edit"?"编辑":"查看")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">
                        <div className="col-md-2 tr lh40">店铺名称：</div>
                        <div className="col-md-3">
                            <Select options={rowsName[2].selectData} isMulti={false}    className="basic-multi-select"
                                    classNamePrefix="select" onChange={this.handleChange0}
                            />
                        </div>
                    </div>
                    <div className="row mt10">
                        <div className="col-md-2 tr lh40">车辆：</div>
                        <div className="col-md-3">
                            <Select options={rowsName[3].selectData} isMulti={false}    className="basic-multi-select"
                                    classNamePrefix="select" onChange={this.handleChange1}
                            />
                        </div>
                        <div className="col-md-1 tr lh40">数量：</div>
                        <div className="col-md-2">
                            <input type="text" className={"form-control"} value={this.state.inputvalue} onChange={this.setInput}/>
                        </div>
                        <div className="col-md-2 tr lh40">价格（元/天）：</div>
                        <div className="col-md-2">
                            <input type="text" className={"form-control"} value={this.state.inputvalue1} onChange={this.setInput1}/>
                        </div>
                        <div className="col-md-1 mt10">
                            <Button  className ="fr" onClick={this.addTable}>新增</Button>
                        </div>

                    </div>
                    <div className={"row mt10"}>

                    </div>

                    <table className="modal-table">
                        <tr>
                            <th>序号</th>
                            <th>车辆名称</th>
                            <th>数量</th>
                            <th>价格（元/天）</th>
                            <th>操作</th>
                        </tr>
                        {this.state.carList.map((m,n)=>{
                            return(
                                <tr key={n}>
                                    <td>{n+1}</td>
                                    <td>{m.carName}</td>
                                    <td>{m.carNum}</td>
                                    <td>{m.carPrice}</td>
                                    <td><span className={"glyphicon glyphicon-trash"} onClick={this.delTableRow.bind(this,m.id)}></span></td>
                                </tr>
                            )
                        })}

                    </table>

                    <div>

                        {/*{this.props.rowsName.map((m,n)=>{
                            if(m.add){
                                m.type == 'select' ? (
                                    <div>
                                        <Select options={m.selectData} isMulti={false}    className="basic-multi-select"
                                                classNamePrefix="select" onChange={this.handleChange.bind(this,m.code)}
                                        />
                                 </div>
                                ):(<input/>)

                            }
                            }
                            )
                        }*/}
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>取消</Button>
                    {this.props.type == "preview"?"":(
                        <Button bsStyle="primary" onClick={this.saveModal}>保存</Button>
                    )}
                </Modal.Footer>

            </Modal>
        )
    }
}