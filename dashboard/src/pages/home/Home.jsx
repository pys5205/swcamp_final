import React from 'react'
import './home.css'
import MainChart from '../../components/main/main_chart/MainChart'
import FeaturedInfo from '../../components/main/featuredInfo/FeaturedInfo'
import FristChart from '../../components/main/first_chart/FristChart'
import ServerCnt from '../../components/main/server_cnt/ServerCnt'
import ServerErr from '../../components/main/server_err/ServerErr'


export default function Home() {
    return (
        <div className="home">
            <div>
                <div className="first">
                    <div className="second">
                        <FristChart />
                    </div>
                    <div className="tt">
                        <div className="normal">
                            <ServerCnt />
                        </div>
                        <div className="error">
                            <ServerErr />
                        </div>
                    </div>
                </div>
                <div className="chartComp">
                    <div className="pchart">
                        <div className="oschart">
                            <MainChart />
                        </div>
                        <div className="server_list">
                            <FeaturedInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}