import React from "react";
import Chart from "react-apexcharts";
import Loding from '../../main/loding'

export default class net_io_packets extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      iodata: [],
      data: [],
      isLoaded: true
    };
  }

componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
      fetch("/network/netname", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system' : server,
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
      fetch("/network/io_packets", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'ioName' : selectName,
        'system' : server
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
                     data : json
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
             type="line"
             height="250"
            series={ [
                { name: "받기",
                  data: Data.packets_sent,
                },
                { name: "보내기",
                  data: Data.packets_recv,
                },
                ]}
            options={{    
                legend: {
                  position:"top",
                  horizontalAlign:"left'"
                },
                 stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                    curve: "smooth",
                    width: 1,
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                    show:false,
                },
                xaxis: {
                  categories: Data.ts_create,
                  labels: { show: false },
                  range:8,
                },
                yaxis: [
                  {
                    title:{
                      text:"받기"
                    },
                  },{
                    opposite: true,
                    title: {
                      text: "보내기"
                    }
                  }
                ]
            }}
            />
       }
       </>  
    }
    // const Name = this.state.iodata;
    // console.log(this.state.iodata[0].disk_io_name);
    // console.log(Name[0]);
    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.net_name} name={iodata.net_name}>{iodata.net_name}</option>
    ));
    //  console.log(Data);
    return(
      <>
      
      <div>
      IoPackets
        <select onChange={handleChange} id="netname">
          {content}
        </select>
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