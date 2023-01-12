import React from 'react'
import './serverList.css'
import CpuChart from '../../components/cpuChart/CpuChart'
import MemChart from '../../components/memChart/MemChart'
import DiskChart from '../../components/diskChart/diskChart'
import DiskIo from '../../components/diskChart/disk_io_select'
import ProcsChart from '../../components/processChart/ProcsChart'
import NetChart from '../../components/netChart/NetChart'

import Button from '@mui/material/Button';

export default function ServerList() {
    return (
    <div className="serverList">
        <div className = "charts">
            <div className="navigation">
            </div>
            <div className="cpu_mem">
                <div className="cpu">
                    <div className="cpuNav">
                        <p>cpu</p><Button variant="outlined" className="detailButton">상세보기</Button>
                    </div>
                    <CpuChart /> 
                </div>
                <div className="memory">
                    <div className="memNav">
                        <p>메모리</p><Button variant="outlined" className="detailButton">상세보기</Button>
                    </div>
                    <MemChart />
                </div>
            </div>
            <div className="disk_net">
                <div className="disk">
                    <div className="diskNav">
                        <p>디스크</p><Button variant="outlined" className="detailButton">상세보기</Button>
                    </div>
                    <div className="diskIoName">
                        <DiskIo />
                    </div>
                    <DiskChart />
                </div>
                <div className="net">
                    <div className="netNav">
                        <p>네트워크</p><Button variant="outlined" className="detailButton">상세보기</Button>
                    </div>
                    <NetChart />
                </div>
            </div>
            <div className="proc">
                <ProcsChart />
            </div>
        </div>
    </div>
    )
}