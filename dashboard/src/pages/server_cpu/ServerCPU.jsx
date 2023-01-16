import React from 'react'
import './serverCPU.css'
import CpuSys from '../../components/detail/cpu_detail/cpu_sys_chart/CpuSysChart'
export default function serverCPU() {
    return(
        <div className="main">
            <div className="firstpart">
                    <CpuSys />
            </div>
            <div className="secondpart">
                <div className="cpu_wait">
                </div>
                <div className="cpu_irq">
                </div>
            </div>
            <div className="thirdpart">
                
            </div>   
        </div>
        )
}
