import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css'

@observer
export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }

    componentWillMount =()=>{
        globalStore.hideAlert();

    }

    componentDidMount = () =>{
        var mySwiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
            direction:'horizontal',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }

    render(){
        let imgList  = [

            {id:'0',imgUrl:'https://image.1hai.cn/images/News/20180419/bc9f7a65-1e1a-4e8e-85e8-f1cf9b219103.jpg?v=6f98d42d8a9f4654a1c964dab4436433'},
            {id:'1',imgUrl:'https://files.1hai.cn/group7/M00/22/8E/rBUFH1tVQPGAMkqGAAHTLxhRz_0947.jpg?visitType=ext&sign=ZTIzYzgxMmQwZTYwYWExYzZlNDU4NTUwNTY0Y2NhNTI=?v=6f98d42d8a9f4654a1c964dab4436433 '}
        ];
        return(
            <div className="">

                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {imgList.map((m,n)=>{
                            return (
                                <div key= {n} className="swiper-slide">
                                    <img src={m.imgUrl}></img>
                                </div>
                            )
                        })}
                    </div>
                    <div className="swiper-pagination"></div>

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                    <div className="swiper-scrollbar"></div>
                </div>
            </div>
        )

    }

}