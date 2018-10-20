import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import ShareStore  from '../../stores/share/shareStore';
import {Button} from 'react-bootstrap';
import {Link,hashHistory} from 'react-router';
const  store = new ShareStore();
@observer
export default class DrivingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.getDrivingList();
    }

    componentDidMount = () =>{

    }

    getDrivingList = () =>{
        store.getDrivingList({},(data)=>{
            this.setState({
                data
            })
        })
    }

    render(){
        let data = this.state.data ;
        return(
            <div className="share-car">
                <div className="share-driving">
                    <ul>
                        {data.map((m,n)=>{
                            return(
                                <li key={n}>
                                    <div className="fl share-driving-img">
                                        <img src={m.carImg}/>
                                    </div>
                                    <div className="fl share-driving-car">
                                        <div className="fl share-driving-name">
                                            <h5>{m.carName}</h5>
                                            <p>【随机分配{m.carName}或类似车型】</p>
                                            <span></span>
                                        </div>
                                        <div className="fr share-driving-price">
                                            <label>￥{m.def0}</label>
                                            <span>元/天/辆</span>
                                        </div>
                                    </div>
                                    <div className="fr mt50">
                                        <Link to={"/order/" + m.storeId + "/" + m.carId  + "/"+ m.id}> <Button  bsStyle="warning" >立即预定</Button></Link>
                                    </div>

                                </li>
                            )
                        })}

                    </ul>
                </div>

            </div>
        )

    }

}