import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

import SearchIcon from "@mui/icons-material/Search";
import axios from "api/axios";

export default function WidthdrawalList() {
  const [count, setCount] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = React.useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "account_name", headerName: "ACCT Name", width: 250 },
    {
      field: "account_no",
      headerName: "ACCT NO",
      // type: "number",
      width: 220,
    },
    {
      field: "bank",
      headerName: "Bank",
      // type: "number",
      width: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      // type: "number",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      // type: "number",
      width: 120,
    },

    {
      field: "date",
      headerName: "Date",
      // type: "number",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <button className="commision" onClick={() => handleApproved(params)}>
            Approve
          </button>
        );
      },
    },
  ];

  // const keys = ["lastName", "firstName", "age"];
  // const filtered = (rows) => {
  //   return rows.filter((item) => {
  //     return searchParam.some((newItem) => {
  //       return (
  //         item[newItem]
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(search?.toLowerCase()) > -1
  //       );
  //     });
  //   });
  // };
  async function handleApproved(params) {
    // /updateWithdrawalList/:id
    try {
      const { data } = await axios.patch(`updateWithdrawalList/${params.id}`);
      enqueueSnackbar(data?.message, { variant: "success" });
      setCount(prev=> prev + 1)
    } catch (error) {
      const err = error?.response
        ? error.response?.data.message
        : error.message;
      enqueueSnackbar(err, { variant: "error" });
      //   setCount((prev) => prev + 1);
    }
  }

  const [consultants, setConsultant] = React.useState([]);
  const [searchParam] = React.useState([
    "account_no",
    "account_name",
    "bank",
    "date",
    "status",
    "amount",
  ]);
  React.useEffect(() => {
    const abortCont = new AbortController();
    const getConsultants = async () => {
      try {
        const { data } = await axios.get("/getWithdrawalList", {
          signal: abortCont.signal,
        });
        setConsultant(data?.message);
        console.log(data?.message);
      } catch (error) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("cleanup ");
        } else {
          console.log(error);
        }
      }
    };
    getConsultants();
    return () => {
      abortCont.abort();
    };
  }, [count]);

  const filtered = (rows) => {
    return rows?.filter((row) => {
      return searchParam.some((item) =>
        row[item]?.toString().toLowerCase().includes(search?.toLowerCase())
      );
    });
  };

  return (
    <>
      <div className="consultants">
        <div className="title">Widthdrawal List</div>
        <div className="input_search">
          <SearchIcon className="search" />
          <input
            type="search"
            name=""
            id=""
            placeholder="search consultant...."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{ height: 500, width: "100%" }}
          className="consultant_table"
        >
          <DataGrid
            rows={filtered(consultants)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
