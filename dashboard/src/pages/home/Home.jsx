import React from 'react'
import './home.css'
import Test from '../../components/test/Test'
import ProcsChart from '../../components/processChart/ProcsChart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
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
                    <ProcsChart />
                </div>
                <div className="oschart">
                    <ProcsChart />
                </div>
                <div className="oschart">
                    <ProcsChart />
                </div>
            </div>
        </div>
        <div className="server_list">
             <FeaturedInfo />
        </div>
    </div>
    )
}