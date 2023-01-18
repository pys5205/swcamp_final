import './serverMem.css'
import MemTotal from '../../components/detail/mem_detail/mem_total_chart/memTotalChart'
import MemUsed from '../../components/detail/mem_detail/mem_used_chart/memUsedChart'
import MemFree from '../../components/detail/mem_detail/mem_free_chart/memFreeChart'
import MemAvail from '../../components/detail/mem_detail/mem_avail_chart/memAvailChart'
import MemCached from '../../components/detail/mem_detail/mem_cached_chart/memCachedChart'
import MemBuffer from '../../components/detail/mem_detail/mem_buffer_chart/memBufferChart'
export default function serverMem() {
    return(
        <div className="mem_main">
            <div className="mem_firstpart">
                <div className="mem_total">
                    <MemTotal />
                </div>
                <div className="mem_used">
                    <MemUsed />
                </div>
            </div>
            <div className="mem_secondpart">
                <div className="mem_free">
                    <MemFree />
                </div>
                <div className="mem_buffer">
                    <MemAvail />
                </div>
            </div>
            <div className="mem_thirdpart">
                <div className="mem_cache">
                    <MemCached />
                </div>
                <div className="mem_shard">
                    <MemBuffer />
                </div>
            </div>   
        </div>
        )
}