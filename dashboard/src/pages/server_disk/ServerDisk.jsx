import './serverDisk.css'
import DiskIoSelect from '../../components/diskChart/disk_io_select'
import DiskIoCount from '../../components/detail/disk_detail/disk_io_count/diskIoCount'
import DiskIoBytes from '../../components/detail/disk_detail/disk_io_bytes/diskIoBytes'
import DiskIoTime from '../../components/detail/disk_detail/disk_io_time/diskIoTime'
import DiskPart from '../../components/detail/disk_detail/disk_part/diskPart'

export default function serverDisk() {
    return (
        <div className="disk_main">
            <div className="disk_firstpart">
                <div className="disk_io_count">
                    <div className="selectbox">
                        IoCount <DiskIoSelect />
                    </div>
                    <DiskIoCount />
                </div>
                <div className="disk_io_bytes">
                    <div className="selectbox">
                        IoBytes <DiskIoSelect />
                    </div>
                    <DiskIoBytes />
                </div>
            </div>
            <div className="disk_secondpart">
                <div className="disk_io_time">
                    <div className="selectbox">
                        IoTime <DiskIoSelect />
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
