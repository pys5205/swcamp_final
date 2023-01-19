import React from 'react'
import MaterialTable from "material-table";

export default class NetCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
    const current = decodeURI(window.location.href);
   // console.log(current.split('/')[4])
   const system = current.split('/')[4];
  fetch("/network/con", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
          'system' : system
      }),
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
                     data : json
                    })
                  }
      });
  }
    render() {
    const Data = this.state.data;
    //console.log(Data);
    //console.log(Data.procs_name);
    const columns = [
        {
            title: "fd",
            field: "net_con_fd",
        },
         {
            title: "laddr_port",
            field: "net_con_laddr_port",
        },
         {
            title: "laddr_ip",
            field: "net_con_laddr_ip",
        },
        {
            title: "raddr_port",
            field: "net_con_raddr_port",
        },
        {
            title: "raddr_ip",
            field: "net_con_raddr_ip",
        },
         {
            title: "상태",
            field: "net_con_status",
        },
        {
            title: "시간",
            field: "ts_create",
        },
        ]
        //console.log(columns);
    return(
        <MaterialTable 
        title="네트워크 연결"
        data={Data}
        columns={columns}
        options={{
          selection: true
        }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
        )
}
}