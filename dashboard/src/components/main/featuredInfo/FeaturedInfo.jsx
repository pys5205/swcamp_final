import React from 'react'
import './featuredInfo.css'
import MaterialTable,{ MTableBodyRow } from "material-table";
import {useNavigate} from "react-router-dom"
export default class featured extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  fetch("/data", { 
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
    const columns = [
        {
            title: "company",
            field: "company",
            width:80
        },
         {
            title: "cpu_cnt",
            field: "cpu_cnt",
            width:60
        },
         {
            title: "mem_total",
            field: "mem_total",
            width:130
        },
         {
            title: "os",
            field: "os",
            width:90
        },
         {
            title: "service",
            field: "service",
            width: 80
        },
         {
            title: "system",
            field: "system",
            width: 80
        },
        ]
  
        const handleClick = (event, rowData) => {
            // alert(`event.target.row = '${rowData.company}'`);
            // navigate(`'/server${rowData.company}'`);
            // this.props.useNavigate(("/serverlist"));
          };
    return(
        <MaterialTable 
        title="Company Details"
        data={Data}
        columns={columns}
        options={{
          selection: true
        }}
        components= {{
            Row: (props) => {
                return (
                    <MTableBodyRow {...props} persistEvents onRowClick={handleClick} />
                )
            }
        }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
        )
}
}
