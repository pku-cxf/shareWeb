import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import ShareStore  from '../../stores/share/shareStore';
const  store = new ShareStore();
@observer
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            storeList:[]
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();
        this.getStore();
    }

    componentDidMount = () =>{

    }

    getStore = ()=>{
        store.getStore({},(storeList)=>{
            this.setState({storeList})
        })
    }


    render(){
        let list = this.state.storeList ;
        return(
            <div className="share-car">
                <div className="share-store">
                    <ul  className="share-store-ul">
                        {list.length > 0 ?
                            (
                                list.map((m,n)=>{
                                    let star = [] ;
                                    for(let i = 0 ; i < m.storeStar ; i++){
                                        star.push(i)
                                    }
                                    return(
                                        <li key={n}>
                                            <p>{m.storeName}</p>
                                            <div className="share-store-info">
                                                <div className="share-store-address"><span></span>店铺地址：{m.storeAddressProvince}{m.storeAddressCity}{m.storeAddressArea}{m.storeAddress}</div>
                                                <div className="share-store-detail">
                                                    <div className="share-store-phone fl"> <span className="glyphicon glyphicon-earphone"></span>联系方式：{m.storePhone}</div>
                                                    <div className="share-store-star fl">星级：
                                                        {star.map((a,b)=>{
                                                            return (
                                                                <span></span>
                                                            )
                                                        })}

                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                })
                            )
                            :""}

                    </ul>

                </div>

        
            </div>
        )

    }

}