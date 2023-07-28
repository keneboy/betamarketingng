import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "api/axios";
import BasicModal from "components/Modal";

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [updateDelete, setUpdateDelete] = React.useState(0);
  async function handleDelete(params) {
    try {
      const { data } = await axios.delete(`/deleteConsult/${params}`);
      setUpdateDelete((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { field: "customer_id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    {
      field: "id",
      headerName: "Consultant Id",
      // type: "number",
      width: 120,
    },
    {
      field: "downline",
      headerName: "Downline",
      // type: "number",
      width: 120,
    },
    {
      field: "upline",
      headerName: "Upline",
      // type: "number",
      width: 120,
    },
    {
      field: "created_at",
      headerName: "Created At",
      // type: "number",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="consultant_action">
            <DeleteIcon
              className="consultant_delete"
              onClick={() => handleDelete(params.id)}
            />
          </div>
        );
      },
    },
    {
      field: "Top_up",
      headerName: "Top Up",
      width: 120,
      renderCell: (params) => {
        return (
          <button className="commision" onClick={() => handleTopUp(params)}>
            Top Up
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
  // handle top up
  const [realtor, setRealtor] = React.useState();
  function handleTopUp(params) {
    setOpen(true);
    setRealtor(params?.id);
  }

  const [consultants, setConsultant] = React.useState([]);
  const [searchParam] = React.useState([
    "customer_id",
    "fullname",
    "email",
    "id",
    "downline",
    "upline",
    "created_at",
  ]);
  React.useEffect(() => {
    const abortCont = new AbortController();
    const getConsultants = async () => {
      try {
        const { data } = await axios.get("/getAllConsultants", {
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
  }, [updateDelete, realtor]);

  const filtered = (rows) => {
    return rows?.filter((row) => {
      return searchParam.some((item) =>
        row[item]?.toString().toLowerCase().includes(search?.toLowerCase())
      );
    });
  };

  return (
    <>
      <BasicModal open={open} setOpen={setOpen} data={realtor} />
      <div className="consultants">
        <div className="title">Consultants</div>
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
