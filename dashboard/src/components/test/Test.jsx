import React from 'react'
import './test.css'
// import Chart from "react-apexcharts";
// import { DataGrid } from '@mui/x-data-grid'; 

// const columns = [
//   { field: 'system', headerName: 'SYS', width: 100 },
//   { field: 'company', headerName: 'COM', width: 100 },
//   { field: 'service', headerName: 'SERVICE', width: 100 },
//   { field: 'os', headerName: 'OS', width: 100 },
//   { field: 'cpu_cnt', headerName: 'cpu_cnt', type: 'number', width: 90 },
//   { field: 'mem_total', headerName: 'mem_total', width: 160 },
//   ]

export default class test extends React.Component {
  
    constructor(props) {
    super(props);
    this.state = {
      data: [],
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
                  this.setState({
                     isLoaded: true,
                     data : json
                    })
                  }
      });
      
  }
  render() {
    const content= this.state.data.map((data) => (
    <div className="divTable"  key="{data.ts_insert}">
      <div className="divTableBody">
        <div className="divTableRow">
          <div className="divTableHead">시스템</div> 
          <div className="divTableHead">회사</div> 
          <div className="divTableHead">서비스</div>
          <div className="divTableHead">os</div>
          <div className="divTableHead">cpu</div>
          <div className="divTableHead">memory</div>
        </div> 

        <div className="divTableRow">
          <div className="divTableCell">{data.system}</div> 
          <div className="divTableCell">{data.company}</div> 
          <div className="divTableCell">{data.service}</div>
          <div className="divTableCell">{data.os}</div>
          <div className="divTableCell">{data.cpu_cnt}</div>
          <div className="divTableCell">{data.mem_total}</div>
        </div> 
      </div> 
    </div>
    
          
    
       ));
       return(
          <div className="content">{content}</div>

           
         )
  }
}