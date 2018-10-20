/**接送服务**/

import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';



@observer
export default class RelayCom extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    render(){
        return(
            <div className="share-box">

                <div className="share-relay"></div>

                <div className="share-relay-box">
                    <div className="share-relay-scroll">
                        <div className="share-relay-left"></div>
                        <div className="share-relay-img"></div>
                        <div className="share-relay-right"></div>
                    </div>
                    <div className="">

                    </div>

                </div>

            </div>
        )

    }

}