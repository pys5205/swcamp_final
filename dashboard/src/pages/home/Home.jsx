import React from 'react'
import './home.css'
import MainChart from '../../components/main/main_chart/MainChart'
import FeaturedInfo from '../../components/main/featuredInfo/FeaturedInfo'
import FristChart from '../../components/main/first_chart/FristChart'
import SecondChart from '../../components/main/second_chart/SecondChart'

export default function Home() {
    return (
    <div  className="home">
    
         <div className = "first">
                <div className = "second">
                    <FristChart />
                </div>
                <div className="tt">
                   
                </div>
        </div>
        
        <div className= "chartComp">
            <div className="pchart">
                <div className="oschart">
                    <MainChart />
                </div>
                <div className="server_list">
                    <FeaturedInfo />
                </div>
            </div>
        </div>
        
        <div className="thirdchartComp">
                <div className="compfirst">
                 <SecondChart />
                </div>
                <div className="compsecond">
                </div>
        </div>
    </div>
    )
}