import './serverNet.css'
import NetIoBytes from '../../components/detail/net_detail/net_io_bytes/netIoBytes'
import NetIoPackets from '../../components/detail/net_detail/net_io_packets/netIoPackets'
import NetIf from '../../components/detail/net_detail/net_if/netIf'
import NetCon from '../../components/detail/net_detail/net_con/netCon'
import Title from '../../components/detail/detailtitle'
import Start from '../../components/button/start/Start'
import Stop from '../../components/button/stop/Stop'

export default function ServerNet() {
    return(
        <div className="net_main">
        <Title title="Network" />
        <div className="start_stop">
                <Start /><Stop />
            </div>
            <div className="net_firstpart">
                <div className="net_io_bytes">
                    IoBytes<NetIoBytes />
                </div>
                <div className="net_io_packets">
                    IoPackets<NetIoPackets />
                </div>
            </div>
            <div className="net_secondpart">
                <div className="net_interface">
                    <NetIf />
                </div>
            </div>
            <div className="net_thirdpart">
                <div className="net_con">
                    <NetCon />
                </div>
            </div>
        </div>
    )       
}