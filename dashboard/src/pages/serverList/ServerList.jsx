import React from 'react'
import './serverList.css'
import CpuChart from '../../components/cpuChart/CpuChart'
import MemChart from '../../components/memChart/MemChart'
export default function ServerList() {
    return (
    <div  className="serverList">
        <CpuChart />
        <MemChart />
    </div>)
}