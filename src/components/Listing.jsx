import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "Context/AuthProvider";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "api/axios";
import { useSnackbar } from "notistack";

export default function Listing() {
  const [deleteCount, setDeleteCount] = useState(0);
  const { state } = useContext(AuthContext);
  const { adminLogin } = state;
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useContext(AuthContext);
  const searchParams = ["description", "property_type", "title", "price"];

  const [message, setMessage] = useState([]);
  const filtered = (property) => {
    return property?.filter((item) => {
      return searchParams.some((param) =>
        item[param]?.toString().toLowerCase().includes(search?.toLowerCase())
      );
    });
  };
  // get all listings...
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(`/getListings`, {
          headers: {
            Authorization: `Bearer ${adminLogin?.accessToken}`,
          },
        });
        setMessage(data?.message);
        console.log("listing....", data?.message);
        // console.log(data);
      } catch (error) {
        // error && navigate("/adminlogin", { state: { from: location } });
      }
    };
    getMessage();
  }, [deleteCount, adminLogin?.accessToken]);
  // handleDelete
  async function handleDeleteProperty(id) {
    try {
      const { data } = await axios.delete(`/deleteListing/${id}`);
      enqueueSnackbar(data?.message, { variant: "success" });
      setDeleteCount((prev) => prev + 1);
    } catch (error) {
      const err = error?.response ? error.response.data.message : error.message;
      enqueueSnackbar(err, { variant: "error" });
    }
  }
  return (
    <div className="listings">
      <div className="addproperty">
        <Link to="/dashboard/add_property">
          <button>
            {" "}
            + <span>Add Property</span>
          </button>
        </Link>
      </div>
      <div className="gallery">
        <ul>
          {filtered(message).map((item, index) => {
            const { title, images, id, price } = item;
            return (
              <li key={index}>
                <div className="image">
                  <img src={JSON.parse(images)[0]?.url} alt="" />
                  <div className="edit_delete">
                    <Link
                      to={`/dashboard/editproperty/${id}`}
                      className="edit_icon"
                    >
                      <span>
                        <EditIcon className="edit" />
                      </span>
                    </Link>
                    <div
                      className="delete_icon"
                      onClick={() => handleDeleteProperty(id)}
                    >
                      <DeleteIcon className="delete" />
                    </div>
                  </div>
                </div>
                <div className="description">
                  <div className="name">{title}</div>
                  <div className="price">{price}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
