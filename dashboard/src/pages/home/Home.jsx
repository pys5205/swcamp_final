import React from 'react'
import './home.css'
import Test from '../../components/test/Test'
import MainChart from '../../components/main/main_chart/MainChart'
import FeaturedInfo from '../../components/main/featuredInfo/FeaturedInfo'
export default function Home() {
    return (
    <div  className="home">
         <div className = "first">
            <div className = "second">
                <div className = "second1">
                    gs
                </div>
                <div>
                    dd
                </div>
            </div>
            <div className="tt">
               
            </div>
        </div>
        <div className= "chartComp">
            <div className="pchart">
                <div className="oschart">
                    <MainChart />
                </div>
                <div className="oschart">
                    <MainChart />
                </div>
                <div className="oschart">
                    <MainChart />
                </div>
            </div>
        </div>
        <div className="server_list">
             <FeaturedInfo />
        </div>
    </div>
    )
}