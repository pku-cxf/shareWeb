import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import Top from '../../components/share/Top';
import Foot from '../../components/share/Foot';
import Nav from '../../components/share/Nav';
import CarList from '../../components/share/CarList';

@observer
export default class Active extends React.Component {
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
                <Nav nav={6}/>
                <div className="share-active-0"></div>
                <div className="share-active-1"></div>
                <div className="share-active-2"></div>

                <Foot/>

            </div>
        )

    }

}