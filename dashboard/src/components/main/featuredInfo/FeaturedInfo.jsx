import React from 'react'
import './featuredInfo.css'
import MaterialTable, { MTableBodyRow } from "material-table";
import { useNavigate } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default class featured extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []
    };
  }


  componentDidMount() {

    const interval = setInterval(async () => {
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
            // console.log(json);
            this.setState({
              isLoaded: false,
              data: json
            })
          }
        });
    }, 2000);
    return () => clearInterval(interval);

  }
  render() {
    const Data = this.state.data;
    const columns = [
      {
        title: "company",
        field: "company",
        width: 80
      },
      //  {
      //     title: "cpu_cnt",
      //     field: "cpu_cnt",
      //     width:60
      // },
      //  {
      //     title: "mem_total",
      //     field: "mem_total",
      //     width:130
      // },
      {
        title: "os",
        field: "os",
        width: 90
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

    return (
      <>
        {this.state.isLoaded ?
          <div className="loding">
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          </div> :
          <MaterialTable
            title="Company Details"
            data={Data}
            columns={columns}
            options={{
              selection: true
            }}
            components={{
              Row: (props) => {
                let navigate = useNavigate();
                const handleClick = (event, rowData) => {
                  // alert(`event.target.row = '${rowData.company}'`);
                  navigate(`/list/${rowData.system}`);
                  // navigate(`'/${rowData.company}'`);
                  // this.props.useNavigate(("/serverlist"));

                };
                return (
                  <MTableBodyRow {...props} persistEvents onRowClick={handleClick} />
                )
              }
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />

        }
      </>
    )
  }
}
