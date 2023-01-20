import React from 'react'
import './cpuChart.css'
import Chart from "react-apexcharts";

export default class cpuchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    const interval = setInterval(async () => {
      fetch("/server", {
        method: "post", //통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
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
              isLoaded: true,
              data: json
            })
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    // console.log(this.state.data);
    const Data = this.state.data;
    return (
      <Chart
        type="line"
        height="250"
        series={[
          {
            name: "cpu퍼센트",
            data: Data.cpu_per,
          },
        ]}
        options={{
          stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
            curve: "smooth",
            width: 1,
          },
          tooltip: {
            x: {
              format: "yy/MM/dd HH:mm:ss",
            },
          },
          grid: { //격자 없앰
            show: false,
          },
          xaxis: {
            categories: Data.ts_create,
            labels: { show: false },
          }
        }}
      />

    )
  }
}