import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Top from '../../components/share/Top';
@observer
export default class HomeHotCar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    componentDidMount = () =>{

    }



    render(){

        return(
            <div className="share-hot w1180 mb30">
                <div className="share-hot-top">
                    <div className="share-hot-title fl">
                        热租车型
                        <span>
                            <i className="red">百余款</i>
                            车型任您选，劲爆优惠天天推荐
                        </span>
                    </div>
                </div>

                <div className="share-hot-content">
                    <div className="fl share-hot-left">
                        <img src="http://www.1hai.cn/Content/Index/images/hotcar_banner.jpg"></img>
                    </div>
                    <div className="fl share-hot-right">
                        <div className="fl share-hot-list">
                            <div className="share-hot-head">
                                <span className="fl share-icon-hot"> </span>
                                <div className="share-hot-detail fl">
                                    <h4>北京奔驰S400</h4>
                                    <h6> 时尚、奢侈、豪华</h6>
                                </div>
                                <div className="share-hot-price fr">
                                    <span>￥500.00</span>/天
                                </div>
                            </div>
                            <div className="share-hot-car">
                                <img src="https://files.1hai.cn/group72/M00/03/8A/rBQFIFsOXVGADB8mAABZtbHmmx0760.jpg?visitType=ext&sign=MDlhNTEyY2E0M2NiMTNhMGQwYWZjNmQ5N2RlNmI0NGU="></img>
                            </div>
                        </div>

                        <div className="fl share-hot-list">
                            <div className="share-hot-head">
                                <span className="fl share-icon-hot"> </span>
                                <div className="share-hot-detail fl">
                                    <h4>北京奔驰S400</h4>
                                    <h6> 时尚、奢侈、豪华</h6>
                                </div>
                                <div className="share-hot-price fr">
                                    <span>￥500.00</span>/天
                                </div>
                            </div>
                            <div className="share-hot-car">
                                <img src="https://files.1hai.cn/group72/M00/03/8A/rBQFIFsOXVGADB8mAABZtbHmmx0760.jpg?visitType=ext&sign=MDlhNTEyY2E0M2NiMTNhMGQwYWZjNmQ5N2RlNmI0NGU="></img>
                            </div>
                        </div>


                        <div className="fl share-hot-list">
                            <div className="share-hot-head">
                                <span className="fl share-icon-hot"> </span>
                                <div className="share-hot-detail fl">
                                    <h4>北京奔驰S400</h4>
                                    <h6> 时尚、奢侈、豪华</h6>
                                </div>
                                <div className="share-hot-price fr">
                                    <span>￥500.00</span>/天
                                </div>
                            </div>
                            <div className="share-hot-car">
                                <img src="https://files.1hai.cn/group72/M00/03/8A/rBQFIFsOXVGADB8mAABZtbHmmx0760.jpg?visitType=ext&sign=MDlhNTEyY2E0M2NiMTNhMGQwYWZjNmQ5N2RlNmI0NGU="></img>
                            </div>
                        </div>


                        <div className="fl share-hot-list">
                            <div className="share-hot-head">
                                <span className="fl share-icon-hot"> </span>
                                <div className="share-hot-detail fl">
                                    <h4>北京奔驰S400</h4>
                                    <h6> 时尚、奢侈、豪华</h6>
                                </div>
                                <div className="share-hot-price fr">
                                    <span>￥500.00</span>/天
                                </div>
                            </div>
                            <div className="share-hot-car">
                                <img src="https://files.1hai.cn/group72/M00/03/8A/rBQFIFsOXVGADB8mAABZtbHmmx0760.jpg?visitType=ext&sign=MDlhNTEyY2E0M2NiMTNhMGQwYWZjNmQ5N2RlNmI0NGU="></img>
                            </div>
                        </div>




                    </div>
                </div>


            </div>

        )

    }

}