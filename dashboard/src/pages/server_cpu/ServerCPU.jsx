import React from 'react'
import './serverCPU.css'
import CpuSys from '../../components/detail/cpu_detail/cpu_sys_chart/CpuSysChart'
import CpuWait from '../../components/detail/cpu_detail/cpu_wait_chart/CpuWaitChart'
import CpuIrq from '../../components/detail/cpu_detail/cpu_irq_chart/CpuIrqChart'
import CpuAvg from '../../components/detail/cpu_detail/cpu_loadavg_chart/CpuLoadavgChart'
import Title from '../../components/detail/detailtitle'
import Start from '../../components/button/start/Start'
import Stop from '../../components/button/stop/Stop'
export default function serverCPU() {
    return (
        <div className="main">
            <Title title="CPU" />
            <div className="start_stop">
                <Start /><Stop />
            </div>
            <div className="firstpart">
                CPU 사용률
                <CpuSys />
            </div>
            <div className="secondpart">
                <div className="cpu_wait">
                    CPU I/O 완료를 기다리는 데 소요된 시간
                    <CpuWait />
                </div>
                <div className="cpu_irq">
                    CPU 하드웨어,소프트웨어 인터럽트 서비스에 소요된 시간
                    <CpuIrq />
                </div>
            </div>
            <div className="thirdpart">
                CPU 프로세스 처리 대기 시간
                <CpuAvg />
            </div>
            <div>
                
            </div>
        </div>
    )
}
