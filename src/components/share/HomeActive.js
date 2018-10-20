import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Top from '../../components/share/Top';
@observer
export default class HomeActive extends React.Component {
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
                        精彩活动
                    </div>
                </div>

                <div className="share-hot-content">
                    <ul className="share-active-list">
                        <li>
                            <img src="https://files.1hai.cn/group72/M00/32/9F/rBQFIFt1G4eAX1NlAABOPsV2FZk902.jpg?visitType=ext&sign=MDI0OWRhMDM3YzIwZDE0MWQ3MjQ4YWVmNWZlNDQ0MDg=?v=8c24a601a203498987fcf07d877c6519"/>
                        </li>
                        <li>
                            <img src="https://files.1hai.cn/group72/M00/32/9F/rBQFIFt1G4eAX1NlAABOPsV2FZk902.jpg?visitType=ext&sign=MDI0OWRhMDM3YzIwZDE0MWQ3MjQ4YWVmNWZlNDQ0MDg=?v=8c24a601a203498987fcf07d877c6519"/>
                        </li>
                        <li>
                            <img src="https://files.1hai.cn/group72/M00/32/9F/rBQFIFt1G4eAX1NlAABOPsV2FZk902.jpg?visitType=ext&sign=MDI0OWRhMDM3YzIwZDE0MWQ3MjQ4YWVmNWZlNDQ0MDg=?v=8c24a601a203498987fcf07d877c6519"/>
                        </li>
                        <li>
                            <img src="https://files.1hai.cn/group72/M00/32/9F/rBQFIFt1G4eAX1NlAABOPsV2FZk902.jpg?visitType=ext&sign=MDI0OWRhMDM3YzIwZDE0MWQ3MjQ4YWVmNWZlNDQ0MDg=?v=8c24a601a203498987fcf07d877c6519"/>
                        </li>

                    </ul>

                </div>

            </div>

        )

    }

}