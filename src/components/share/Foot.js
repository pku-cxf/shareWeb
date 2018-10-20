import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';

@observer
export default class Foot extends React.Component {
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
            <div className="share-foot">
                <div className="share-foot-img">
                   <ul>
                       <li>300多个城市</li>
                       <li>400个服务网点</li>
                       <li>200余车型</li>
                       <li>24小时服务</li>
                       <li>服务广泛</li>

                   </ul>
                </div>

            </div>

        )

    }

}