import './serverMem.css'
import MemTotal from '../../components/detail/mem_detail/mem_total_chart/memTotalChart'
import MemUsed from '../../components/detail/mem_detail/mem_used_chart/memUsedChart'
import MemFree from '../../components/detail/mem_detail/mem_free_chart/memFreeChart'
import MemAvail from '../../components/detail/mem_detail/mem_avail_chart/memAvailChart'
import MemCached from '../../components/detail/mem_detail/mem_cached_chart/memCachedChart'
import MemBuffer from '../../components/detail/mem_detail/mem_buffer_chart/memBufferChart'
import Title from '../../components/detail/detailtitle'
import Start from '../../components/button/start/Start'
import Stop from '../../components/button/stop/Stop'
export default function serverMem() {
    return(
        
        <div className="mem_main">
            <Title title="Memory" />
            <div className="start_stop">
                <Start /><Stop />
            </div>
            <div className="mem_firstpart">
                <div className="mem_total">
                    <MemTotal />
                </div>
                <div className="mem_used">
                    used<MemUsed />
                </div>
            </div>
            <div className="mem_secondpart">
                <div className="mem_free">
                    free<MemFree />
                </div>
                <div className="mem_buffer">
                    buffer<MemAvail />
                </div>
            </div>
            <div className="mem_thirdpart">
                <div className="mem_cache">
                    cashe<MemCached />
                </div>
                <div className="mem_shard">
                    shard<MemBuffer />
                </div>
            </div>   
        </div>
        )
}