import React from 'react'
import './firstChart.css'
import Chart from "react-apexcharts";

export default class firstchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
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
                  console.log(json);
                    this.setState({
                      isLoaded: true,
                     data : json
                    })
                  }
      });
  }
    render() {
    const Data = this.state.data;
    console.log(Data.cpu_per);
    return(
                 <Chart
                     type="radialBar"
                     series={ [
                         Data.cpu_per
                        ]} 
                    options={{
                        height: 350,
                        labels:["CPU"],
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
        )
    }
}