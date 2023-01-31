import React from 'react'
import './procsChart.css'
import MaterialTable from "material-table";
import Loding from '../main/loding'
export default class ProcsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: true,
      data: []
    };
  }
  
componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
    const interval = setInterval(async () => {
      fetch("/process", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
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
    render() {
    const Data = this.state.data;
    //console.log(Data);
    //console.log(Data.procs_name);
    const columns = [
        {
            title: "user",
            field: "procs_username",
 
        },
         {
            title: "이름",
            field: "procs_name",
        },
         {
            title: "pid",
            field: "procs_pid",
        },
         {
            title: "ppid",
            field: "procs_ppid",
        },
         {
            title: "상태",
            field: "procs_status",
        },
         {
            title: "메모리사용량",
            field: "procs_mem_full_uss",
        },
        {
            title: "시간",
            field: "ts_create",
        },
        ]
        //console.log(columns);
    return(
         <>
      {this.state.isLoaded ? 
    <Loding /> : 
        <MaterialTable 
        title="프로세스"
        data={Data}
        columns={columns}
        options={{
          selection: true
        }}
        
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
      }
      </>
        )
}
}