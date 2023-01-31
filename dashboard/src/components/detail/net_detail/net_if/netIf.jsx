import React from 'react'
import MaterialTable from "material-table";
import Loding from '../../../main/loding'

export default class NetIf extends React.Component {
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
      fetch("/network/if", { 
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
            title: "이름",
            field: "net_if_name",
        },
         {
            title: "주소",
            field: "net_if_address",
        },
         {
            title: "넷마스크",
            field: "net_if_netmask",
        },
         {
            title: "브로드캐스트",
            field: "net_if_broadcast",
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
        title="네트워크 인터페이스"
        data={Data}
        columns={columns}
        options={{
          selection: true
        }}
        pageSize={5}
        rowsPerPageOptions={[4]}
        />
      }
      </>
        )
}
}