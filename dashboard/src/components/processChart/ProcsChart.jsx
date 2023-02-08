import * as React from 'react';
import Box from '@mui/material/Box';
import './procsChart.css'
import MaterialTable, { MTableBodyRow } from "material-table";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Loding from '../main/loding'
// import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export default class ProcsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []
    };
  }

  componentDidMount() {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    fetch("/process", {
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system': server
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
            data: json
          })
        }
      });
  }
  render() {
    const Data = this.state.data;
    // console.log(Data);
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
    return (
      <>
        {this.state.isLoaded ?
          <>
      <div>프로세스</div>
    <Loding /> 
    </>  
          :
          <MaterialTable
            title="프로세스"
            data={Data}
            columns={columns}
            options={{

            }}
            components={{

              Row: (props) => {
                const [opens, setOpens] = React.useState(false);
                const [name, setName] = React.useState('');
                const handleClose = () => setOpens(false);
                const handleClick = (event, rowData) => {
                  //   alert(`event.target.row = '${rowData.procs_name}'`);
                  // console.log(rowData.procs_name);
                  let procs_name = rowData.procs_name;
                  // console.log(procs_name);
                  // navigate(`'/${rowData.company}'`);
                  // this.props.useNavigate(("/serverlist"));
                  setOpens(true);
                  setName(procs_name);
                };

                function ChildModal() {
                  const current = decodeURI(window.location.href);
                  const server = current.split('/')[4];
                  const [open, setOpen] = React.useState(false);
                  const handleOpen = (e) => {
                    setOpen(true);
                    fetch("/process/delete", {
                      method: "post", //통신방법
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({
                        'system': server,
                        'process': e.target.value
                      }
                      ),
                    })
                      .then((res) => res.json())
                      .then((result) => console.log("결과: ", result));
                  };
                  const handleClose = () => {
                    setOpens(false);
                    setOpen(false);
                    window.location.reload();
                  };

                  return (
                    <React.Fragment>
                      <Button value={name} onClick={handleOpen}>삭제</Button>
                      <Modal
                        hideBackdrop
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                      >
                        <Box sx={{ ...style, width: 160 }}>
                          <h2 id="child-modal-title">삭제완료</h2>
                          <div className="form">
                          <Button onClick={handleClose} >확인</Button>
                          </div>
                        </Box>
                      </Modal>
                    </React.Fragment>
                  );
                }


                return (

                  <>
                    <MTableBodyRow {...props} persistEvents onRowClick={handleClick} />
                    <Modal
                      open={opens}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style} className="modeldelete">
                      <div >
                        <Typography id="modal-modal-description" sx={{ m : 1}}>
                          {name} 삭제하시겠습니까?
                          <div className="btn_cancle">
                          <ChildModal />
                          <Button onClick={handleClose}>취소</Button>
                          </div>
                        </Typography>
                        </div>
                      </Box>

                    </Modal>
                  </>
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