import './serverMem.css'
export default function serverMem() {
    return(
        <div className="mem_main">
            <div className="mem_firstpart">
                <div className="mem_total">
                </div>
                <div className="mem_used">
                </div>
            </div>
            <div className="mem_secondpart">
                <div className="mem_free">
                </div>
                <div className="mem_buffer">
                </div>
            </div>
            <div className="mem_thirdpart">
                <div className="mem_cache">
                </div>
                <div className="mem_shard">
                </div>
            </div>   
        </div>
        )
}