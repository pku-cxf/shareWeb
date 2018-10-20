import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Top from '../../components/share/Top';
import {Link} from 'react-router';
@observer
export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            navList:[
                {id:0,name:'首页',url:'home'},
                {id:1,name:'自驾租车',url:'driving'},
                {id:2,name:'车型查询',url:'car'},
                {id:3,name:'营业网点',url:'store'},
                {id:5,name:'接送服务',url:'relay'},
                {id:6,name:'精彩活动',url:'active'},
                ]
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    componentDidMount = () =>{

    }

    changeNav = (e) =>{
        let el = $(e.currentTarget);
        el.siblings().removeClass("active");
        el.addClass("active")

    }

    render(){

        return(
            <div className="">
                <Top/>
                <div className="share-nav">
                    <ul>
                        {this.state.navList.map((m,n)=>{
                            return(
                                <li key={n} onClick={this.changeNav} className={m.id== this.props.nav ?'active':''}>
                                    <Link to={m.url}>{m.name}</Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>

            </div>

        )

    }

}