import React from 'react'
import './firstChart.css'
import Chart from "react-apexcharts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default class firstchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []
    };
  }

  componentDidMount() {
    fetch("/list/cpu", {
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
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
  }
  render() {
    const Data = this.state.data;
    // console.log(Data.cpu_per);
    return (
      <>
        {this.state.isLoaded ?
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box> :
          <Chart
            type="radialBar"
            height="300"
            series={[
              Data.cpu_per
            ]}
            options={{
              labels: ["CPU"],
              colors: ["#20E647"],
              plotOptions: {
                radialBar: {
                  startAngle: -90,
                  endAngle: 90,
                  track: {
                    background: '#333',
                    startAngle: -90,
                    endAngle: 90,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      fontSize: "30px",
                      show: true
                    }
                  }
                }
              },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  type: "horizontal",
                  gradientToColors: ["#87D4F9"],
                  stops: [0, 100]
                }
              },
              stroke: {
                lineCap: "butt"
              },
            }}
          />
        }
      </>
    )
  }
}