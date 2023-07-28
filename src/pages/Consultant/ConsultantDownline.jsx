import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConsultantDownline() {
  const { state, dispatch } = React.useContext(AuthContext);

  const { consultantLogin } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    {
      field: "state",
      headerName: "State",
      // type: "number",
      width: 120,
    },
    {
      field: "country",
      headerName: "Country",
      // type: "number",
      width: 120,
    },
    {
      field: "gender",
      headerName: "Gender",
      // type: "number",
      width: 120,
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
  console.log(consultantLogin);
  // name: fullname, customerId: id, id: cuid(), state, city, country, gender
  const [consultants, setConsultant] = React.useState([]);

  React.useEffect(() => {
    const abortCont = new AbortController();
    const getDownline = async () => {
      try {
        const { data } = await axios.get("/getDownline", {
          signal: abortCont.signal,
          headers: {
            authorization: `Bearer ${consultantLogin?.accessToken}`,
          },
        });
        // setConsultant(JSON.parse(data?.message[0]["downline"]);
        console.log(data?.message)
        setConsultant(data?.message)
        // setConsultant(JSON.parse(data?.message[0]["downline"]));
      } catch (error) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("successfully cleanup");
        } else {
          if (error?.response?.data?.message === "expired token") {
            dispatch({ type: "CONSULTANT_LOGOUT" });
            localStorage.removeItem("consultantInfo");
            navigate("/consultant", { state: { from: location } });
          }
        }
      }
    };
    getDownline();
    return () => {
      abortCont.abort();
    };
  }, []);

  const [copied, setCopied] = React.useState(false);
  const qrRef = React.useRef();
  function handleClipBoard() {
    navigator.clipboard.writeText(qrRef.current.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }
  return (
    <>
      <div className="downlines">
        <div className="title">Downline</div>
        <div className="input_referral">
          <input
            type="text"
            name=""
            id=""
            defaultValue={`https://betamarketingng.com/portal/${consultantLogin?.realtorId}`}
            ref={qrRef}
            readOnly
          />
          <button onClick={handleClipBoard} className={copied ? "active" : ""}>
            <ContentCopyIcon className="clip_board" /> copy
          </button>
        </div>
        {consultants && consultants.length > 0 ? (
          <div
            style={{ height: 400,  width: "100%" }}
            className="consultant_table"
          >
            <DataGrid
              rows={consultants}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        ) : (
          <h1>No Records Found</h1>
        )}
      </div>
    </>
  );
}
