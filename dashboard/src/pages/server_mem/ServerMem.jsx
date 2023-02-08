import React from 'react'
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

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
export default function serverMem() {
    const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
    return(
        
        <div className="mem_main">
            <Title title="Memory" />
            <div className="start_stop">
                <Start /><Stop />
            </div>
            <div className="mem_firstpart">
                <div className="mem_total">
    
                <div className="toolbox">
                        <div className= "toolmessage">
                        Total
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Total</Typography>
                                        {"설치된 총 메모리 크기"}
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
                         
                    <MemTotal />
                </div>
                <div className="mem_used">
            
                <div className="toolbox">
                        <div className= "toolmessage">
                        Used
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Used</Typography>
                                        {"사용 중인 메모리의 크기"}
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
                    <MemUsed />
                </div>
            </div>
            <div className="mem_secondpart">
                <div className="mem_free">
             
                <div className="toolbox">
                        <div className= "toolmessage">
                        Free
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Free</Typography>
                                        {"사용되지 않는 메모리 크기"}
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
                    <MemFree />
                </div>
                <div className="mem_buffer">
                <div className="toolbox">
                        <div className= "toolmessage">
                        Available
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Available</Typography>
                                        {"애플리케이션이 시작할 때 swapping없이 사용가능한 메모리의 크기"}
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
                    <MemAvail />
                </div>
            </div>
            <div className="mem_thirdpart">
                <div className="mem_cache">
     
                <div className="toolbox">
                        <div className= "toolmessage">
                        Cashe
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Cashe</Typography>
                                        {"페이지 캐시 사용되는 메모리"}
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
                    <MemCached />
                </div>
                <div className="mem_shard">
       
                <div className="toolbox">
                        <div className= "toolmessage">
                        Buffer
                        </div>
                            <div>
                                 <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography color="inherit">Memory Buffer</Typography>
                                        {"커널 버퍼로 사용되는 메모리"}
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
                    <MemBuffer />
                </div>
            </div>   
        </div>
        )
}