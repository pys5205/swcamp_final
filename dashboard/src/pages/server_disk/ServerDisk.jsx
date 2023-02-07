import './serverDisk.css'
// import DiskIoCount from '../../components/detail/disk_detail/disk_io_count/diskIoCount'
// import DiskIoBytes from '../../components/detail/disk_detail/disk_io_bytes/diskIoBytes'
// import DiskIoTime from '../../components/detail/disk_detail/disk_io_time/diskIoTime'
import DiskPart from '../../components/detail/disk_detail/disk_part/diskPart'
import Title from '../../components/detail/detailtitle'
import Start from '../../components/button/start/Start'
import Stop from '../../components/button/stop/Stop'
import Iocnt from '../../components/diskChart/disk_io_select'
import IoBytes from '../../components/diskChart/disk_io_bytes'
import IoTime from '../../components/diskChart/disk_io_time'
export default function serverDisk() {
    return (
        <div className="disk_main">
         <Title title="Disk" />
         <div className="start_stop">
                <Start /><Stop />
            </div>
            <div className="disk_firstpart">
                <div className="disk_io_count">
                    <div className="selectbox">
                        <Iocnt />
                    </div>
                </div>
                <div className="disk_io_bytes">
                    <div className="selectbox">
                        <IoBytes /> 
                    </div>
                </div>
            </div>
            <div className="disk_secondpart">
                <div className="disk_io_time">
                    <div className="selectbox">
                        <IoTime/>
                    </div>
                    
                </div>
                <div className="disk_part">
                    Partition <DiskPart />
                </div>
            </div>
        </div>
    )
}
