import React, { Component } from "react";
import './modal.css'
import MaterialTable, { MTableBodyRow } from "material-table";
import { useNavigate } from "react-router-dom"
class Modal extends Component {
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
    const { isOpen, close } = this.props;//아까 버튼에서 props로 가져온것
    // console.log(this.state.data);
    const Data = this.state.data;
    const columns =
                        [
                          { title: "system", field: "system" },
                          { title: "cpu percent", field: "cpu_per" },
                          { title: "time", field: "ts_create" },
                        ]
    return (
      <>
        {isOpen ? (
          <div className="modal">
            <div onClick={close}>
              <div className="loginModal">
                <span className="close" onClick={close}>
                  &times;
                </span>
                <div className="modalContents" onClick={isOpen}>
                  <div className="Header">
                    <img src="https://100dayscss.com/codepen/alert.png" width="50" height="38" />
                  </div>
                  <div className="table">
                    <MaterialTable
                      title="Error"
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
                          };
                          return (
                            <MTableBodyRow {...props} persistEvents onRowClick={handleClick} />
                          )
                        }
                      }}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Modal;