import React from 'react'
import './serverCPU.css'
import CpuSys from '../../components/detail/cpu_detail/cpu_sys_chart/CpuSysChart'
import CpuWait from '../../components/detail/cpu_detail/cpu_wait_chart/CpuWaitChart'
import CpuIrq from '../../components/detail/cpu_detail/cpu_irq_chart/CpuIrqChart'
import CpuAvg from '../../components/detail/cpu_detail/cpu_loadavg_chart/CpuLoadavgChart'
import Title from '../../components/detail/detailtitle'
import Start from '../../components/button/start/Start'
import Stop from '../../components/button/stop/Stop'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
export default function serverCPU() {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  return (
    <div className="main">
      <Title title="CPU" />
      <div className="start_stop">
        <Start /><Stop />
      </div>
      <div className="firstpart">
        <div className="toolbox">
          <div className="toolmessage">
            CPU 사용률
          </div>
          <div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">CPU 사용률</Typography>
                  {"CPU user mode, system mode 에서 소비된 cpu시간의 백분율"}
                </React.Fragment>
              }
            >
              <Button>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Button>
            </HtmlTooltip>
          </div>
        </div>
        <CpuSys />
      </div>
      <div className="secondpart">
        <div className="cpu_wait">
          <div className="toolbox">
            <div className="toolmessage">
              CPU I/O
            </div>
            <div>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">CPU I/O wait </Typography>
                    {" CPU I/O 완료를 기다리는 데 소요된 시간 "}
                  </React.Fragment>
                }
              >
                <Button>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Button>
              </HtmlTooltip>
            </div>
          </div>
          <CpuWait />
        </div>
        <div className="cpu_irq">
          <div className="toolbox">
            <div className="toolmessage">
              CPU irq
            </div>
            <div>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">CPU irq</Typography>
                    {" CPU 하드웨어,소프트웨어 인터럽트 서비스에 소요된 시간 "}
                  </React.Fragment>
                }
              >
                <Button>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Button>
              </HtmlTooltip>
            </div>
          </div>

          <CpuIrq />
        </div>
      </div>
      <div className="thirdpart">
        <div className="toolbox">
          <div className="toolmessage">
            CPU LoadAvg
          </div>
          <div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">CPU LoadAvg</Typography>
                  {" CPU 프로세스 처리 대기 시간 "}
                </React.Fragment>
              }
            >
              <Button>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Button>
            </HtmlTooltip>
          </div>
        </div>
        <CpuAvg />
      </div>
      <div>

      </div>
    </div>
  )
}
