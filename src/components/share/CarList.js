import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import ShareStore  from '../../stores/share/shareStore';
const  store = new ShareStore();
@observer
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carList: []
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.getCar();
    }

    componentDidMount = () =>{

    }

    getCar = () =>{
        store.getCar({},(carList)=>{
            this.setState({
                carList
            })
        })
    }


    render(){
        let carList = this.state.carList ;
        return(
            <div className="share-car">

                <div className="share-car-box">
                    <ul className="share-car-ul">
                        {carList ?(
                            carList.map((m,n)=>{
                                return(
                                    <li key={n}>
                                        <div  className="share-car-img">
                                            <img src={m.img}/>
                                        </div>
                                        <div className="share-car-intro">
                                            <h5>{m.carName}</h5>
                                            <p>{m.def0}/{m.carDrive}座/{m.carTypes}/{m.carProduce}</p>
                                        </div>
                                    </li>
                                )
                            })

                        ):""}

                    </ul>

                </div>

            </div>
        )

    }

}