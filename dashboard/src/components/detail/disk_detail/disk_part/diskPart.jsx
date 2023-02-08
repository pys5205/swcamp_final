import React from 'react'
import Chart from "react-apexcharts";
import './diskPart.css'
import Loding from '../../../main/loding'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import '../../../diskChart/disk_io_chart.css';
export default class diskpart extends React.Component {
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
    fetch("/disk/part/name", {
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
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }));
    const handleChange = (event) => {
      // console.log(event.target.value);
      const current = decodeURI(window.location.href);
      const server = current.split('/')[4];
      let selectName = null;
      // console.log(event.target.value);
      const interval = setInterval(async () => {
        selectName = null;
        selectName = event.target.value;
        // console.log(event.target);

        // console.log(selectName);
        fetch("/disk/part", {
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
    // console.log(this.state.data);
    const Data = this.state.data;
    const test = Data.disk_part;
    // console.log(test);
    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.disk_part_mnt} name={iodata.disk_part_mnt}>{iodata.disk_part_mnt}</option>
    ));
    const charts = <Chart
      type="pie"
      height="250"
      series={test}
      options={{
        labels: ['사용중', '빈공간']
      }}
    />
    return (
      <>

        <div className="selectTitle">
          Partition
          <select onChange={handleChange} id="mntname">
            <option value="test" name="test" disabled selected>선택하세요</option>
            {content}
          </select>
          <div className="tool">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Disk Partition</Typography>
                  {"Disk에 대한 입력/출력 바이트"}
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