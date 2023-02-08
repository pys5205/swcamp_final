import React from "react";
import Chart from "react-apexcharts";
import Loding from '../main/loding'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';

export default class disk_io_select extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iodata: [],
      data: [],
      isLoaded: true
    };
  }

  componentDidMount() {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    const name = "testtest";
    fetch("/disk/io/name", {
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system': server,
      }
      ),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === undefined) {
          alert("오류");
        } else {
          //////////////////////////////////여기부터보자
          // console.log(json);
          this.setState({
            isLoaded: true,
            iodata: json
          })
        }
      });
  }
  render() {
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
    // const test = null;
    const handleChange = (event) => {
      // console.log(event.target.value);
      const current = decodeURI(window.location.href);
      const server = current.split('/')[4];
      let selectName = null;
      const interval = setInterval(async () => {
        selectName = null;
        selectName = event.target.value;
        // console.log(selectName);
        fetch("/disk/io_time", {
          method: "post", //통신방법
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            'ioName': selectName,
            'system': server
          }
          ),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json === undefined) {
              alert("오류");
            } else {
              //////////////////////////////////여기부터보자
              // console.log(json);
              this.setState({
                isLoaded: false,
                data: json
              })
            }
          });
      }, 2000);
      return () => clearInterval(interval);
    }

    const Data = this.state.data;
    //const charts= null;
    var charts;
    if (Data != null) {
      charts =
        <>
          {this.state.isLoaded ?
            <Loding /> :
            <Chart
              type="area"
              height="250"
              series={[
                {
                  name: "읽는 시간",
                  data: Data.read_time,
                },
                {
                  name: "쓰는 시간",
                  data: Data.write_time,
                },
                {
                  name: "사용중인 시간",
                  data: Data.busy_time,
                },
              ]}
              options={{
                legend: {
                  position: "top",
                  horizontalAlign: "left'"
                },
                stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                  curve: "smooth",
                  width: 1,
                },
                tooltip: {
                  x: {
                    categories: Data.ts_create,
                  },
                },
                grid: { //격자 없앰
                  show: false,
                },
                xaxis: {
                  categories: Data.ts_create,
                  labels: { show: false },
                  range: 8,
                }
              }}
            />
          }
        </>
    }
    // const Name = this.state.iodata;
    // console.log(this.state.iodata[0].disk_io_name);
    // console.log(Name[0]);
    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.disk_io_name} name={iodata.disk_io_name}>{iodata.disk_io_name}</option>
    ));
    //  console.log(Data);
    return (
      <>

        <div className="selectTitle">
          IoTime
          <select onChange={handleChange} id="diskname">
            <option value="test" name="test" disabled selected>선택하세요</option>
            {content}
          </select>
          <div className="tool">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Disk Io Time</Typography>
                  {"하드 디스크에서 읽기 및 쓰기 작업에 필요한 시간"}
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
        {this.state.isLoaded ?
          <Loding /> :
          <div>
            {charts}
          </div>

        }
      </>

    )
  }
}