import './serverNet.css'
import NetIoBytes from '../../components/detail/net_detail/net_io_bytes/netIoBytes'

export default function ServerNet() {
    return(
        <div className="net_main">
            <div className="net_firstpart">
                <div className="net_io_bytes">
                <NetIoBytes />
                </div>
            </div>
        </div>
    )       
}