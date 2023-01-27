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
          ////만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
          /// <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
          ///<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
          ////<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
          /// true인 상태로 있어서 화면이 안꺼진다.
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
                      columns={columns}
                      data={Data}
                      components={{
                          Row: (props) => {
                            let navigate = useNavigate();
                            const handleClick = (event, rowData) => {
                              // alert(`event.target.row = '${rowData.company}'`);
                              // console.log(rowData);
                              navigate(`/list/${rowData.system}/cpu`);
                              // navigate(`'/${rowData.company}'`);
                              // this.props.useNavigate(("/serverlist"));
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