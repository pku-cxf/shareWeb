/**接送服务**/

import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import Top from '../../components/share/Top';
import Foot from '../../components/share/Foot';
import Nav from '../../components/share/Nav';
import ReplayCom from '../../components/share/RelayCom';
import RelayCom from "@/components/share/RelayCom";


@observer
export default class Relay extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            registerParam:{

            }
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    render(){
        return(
            <div className="share-box">
                <Nav nav={5}/>
                <RelayCom/>
                <Foot/>

            </div>
        )

    }

}