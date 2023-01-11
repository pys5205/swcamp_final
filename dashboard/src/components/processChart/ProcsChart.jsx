import React from 'react'
import './procsChart.css'
import MaterialTable from "material-table";

export default class ProcsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  fetch("/process", { 
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
    console.log(Data);
    console.log(Data.procs_name);
    const columns = [
        {
            title: "procs_username",
            field: "procs_username",
        },
         {
            title: "procs_name",
            field: "procs_name",
        },
         {
            title: "procs_pid",
            field: "procs_pid",
        },
         {
            title: "procs_ppid",
            field: "procs_ppid",
        },
         {
            title: "procs_status",
            field: "procs_status",
        },
         {
            title: "procs_mem_full_uss",
            field: "procs_mem_full_uss",
        },
        {
            title: "ts_create",
            field: "ts_create",
        },
        ]
        console.log(columns);
    return(
        <MaterialTable 
        title="Company Details"
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