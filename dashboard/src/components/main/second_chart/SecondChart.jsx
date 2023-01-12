import React from 'react'
import './secondChart.css'
import Chart from "react-apexcharts";

export default class secondchart extends React.Component {
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
                     type="bar"
                     series={ [
                     
                        {
                         name: 'Net Profit',
                          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                        }, {
                          name: 'Revenue',
                          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                        }, {
                          name: 'Free Cash Flow',
                          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                          },
        
                        ]} 
                    options={{
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                          },
                        },
                        dataLabels: {
                          enabled: false
                        },
                        stroke: {
                          show: true,
                          width: 2,
                          colors: ['transparent']
                        },
                        xaxis: {
                          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                        },
                     }}
             />
        )
    }
}