import React from 'react'
import './serverList.css'
import CpuChart from '../../components/cpuChart/CpuChart'
import MemChart from '../../components/memChart/MemChart'
import DiskChart from '../../components/diskChart/diskChart'
import ProcsChart from '../../components/processChart/ProcsChart'
export default function ServerList() {
    return (
    <div className="serverList">
        <div className = "charts">
            <div className="navigation">
            </div>
            <div className="cpu_mem">
                <CpuChart /> 
                <MemChart />
            </div>
            <div className="disk_net">
                <DiskChart />
            </div>
            <div className="proc">
                <ProcsChart />
            </div>
        </div>
    </div>
    )
}