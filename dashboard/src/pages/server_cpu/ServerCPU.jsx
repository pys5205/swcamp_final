import React from 'react'
import './serverCPU.css'
import CpuSys from '../../components/detail/cpu_detail/cpu_sys_chart/CpuSysChart'
import CpuWait from '../../components/detail/cpu_detail/cpu_wait_chart/CpuWaitChart'
import CpuIrq from '../../components/detail/cpu_detail/cpu_irq_chart/CpuIrqChart'
import CpuAvg from '../../components/detail/cpu_detail/cpu_loadavg_chart/CpuLoadavgChart'
export default function serverCPU() {
    return(
        <div className="main">
            <div className="firstpart">
                    <CpuSys />
            </div>
            <div className="secondpart">
                <div className="cpu_wait">
                   <CpuWait />
                </div>
                <div className="cpu_irq">
                    <CpuIrq />
                </div>
            </div>
            <div className="thirdpart">
                <CpuAvg />
            </div>   
        </div>
        )
}
