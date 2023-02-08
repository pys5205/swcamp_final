import React, { Component } from "react";
import './modal.css'
import MaterialTable, { MTableBodyRow } from "material-table";
import { useNavigate } from "react-router-dom"
export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("/server/error/modal", {
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
          //   console.log(json);
          this.setState({
            data: json
          })
        }
      });
  }

  render() {
    console.log(this.props);
    const Data = this.state.data;
    const columns =
      [
        { title: "system", field: "system" },
        { title: "cpu percent", field: "cpu_per" },
        { title: "time", field: "ts_create" },
      ]
    return (
      <div>

        <MaterialTable
          title="Error"
          columns={columns}
          data={Data}
          components={{
            Row: (props) => {
              const navigate = useNavigate();
              const handleClick = (event, rowData) => {
                // alert(`event.target.row = '${rowData.company}'`);
                // console.log(rowData);
                // console.log(event);
                // console.log(rowData);
                // console.log(navigate);

                navigate(`/list/${rowData.system}/cpu`);

                // navigate(`'/${rowData.company}'`);
                // this.props.useNavigate(("/serverlist"));
                // console.log(this.props.setOpen);
                this.props.setOpen(false);
                window.location.reload();
              };
              return (
                <MTableBodyRow {...props} persistEvents onRowClick={handleClick} />
              );
            }
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    )

  }

}