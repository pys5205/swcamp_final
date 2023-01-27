import './serverDisk.css'
import DiskIoCount from '../../components/detail/disk_detail/disk_io_count/diskIoCount'
import DiskIoBytes from '../../components/detail/disk_detail/disk_io_bytes/diskIoBytes'
import DiskIoTime from '../../components/detail/disk_detail/disk_io_time/diskIoTime'
import DiskPart from '../../components/detail/disk_detail/disk_part/diskPart'
import Title from '../../components/detail/detailtitle'
export default function serverDisk() {
    return (
        <div className="disk_main">
         <Title title="Disk" />
            <div className="disk_firstpart">
                <div className="disk_io_count">
                    <div className="selectbox">
                        IoCount 
                    </div>
                    <DiskIoCount />
                </div>
                <div className="disk_io_bytes">
                    <div className="selectbox">
                        IoBytes 
                    </div>
                    <DiskIoBytes />
                </div>
            </div>
            <div className="disk_secondpart">
                <div className="disk_io_time">
                    <div className="selectbox">
                        IoTime 
                    </div>
                    <DiskIoTime />
                </div>
                <div className="disk_part">
                    Partition <DiskPart />
                </div>
            </div>
        </div>
    )
}
