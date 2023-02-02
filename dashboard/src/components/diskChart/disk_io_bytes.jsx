import React from "react";
import Chart from "react-apexcharts";
import Loding from '../main/loding'

export default class disk_io_select extends React.Component {
  
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
  const name = "testtest";
      fetch("/disk/io/name", { 
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
      fetch("/disk/io_bytes", { 
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
          <div className="mixed-chart">
            <Chart
              type="line"
              height="250"
              series={[
                {
                  name: "io읽기",
                  data: Data.read_bytes,
                },
                {
                  name: "io쓰기",
                  data: Data.write_bytes,
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
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                  show: false,
                },
                xaxis: {
                  categories: Data.ts_create,

                  labels: { show: false },
                  range:8,
                },
                yaxis: [
                  {
                    title: {
                      text: "읽기"
                    },
                  }, {
                    opposite: true,
                    title: {
                      text: "쓰기"
                    }
                  }
                ]
              }}
            />
          </div>
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
    return(
      <>
      
      <div>
      IoBytes
        <select onChange={handleChange} id="diskname" defaultValue="nvme0n1p1">
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