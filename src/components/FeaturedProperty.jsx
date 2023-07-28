import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "api/axios";
import { useSnackbar } from "notistack";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useLocation } from "react-router-dom";
import formattedPrice from "utils/formattedPrice";
export default function FeaturedProperty() {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const abortCont = new AbortController();
    const getListings = async () => {
      try {
        const { data } = await axios.get("/getListings", {
          signal: abortCont.signal,
        });
        setListData(data?.message);
      } catch (error) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("successfully abort");
        } else {
          console.log(error);
          let err = error.response
            ? error.response.data.message
            : error?.message;
          enqueueSnackbar(err, { variant: "error" });
        }
      }
    };
    getListings();
    return () => {
      abortCont.abort();
    };
  }, [enqueueSnackbar]);
  const [current, setCurrent] = useState(1);
  const [grid, setGrid] = useState(1);
  const typeProperties = [
    {
      name: "ALL",
      id: 1,
    },
    {
      name: "FOR RENT",
      id: 2,
    },
    {
      name: "FOR SALE",
      id: 3,
    },
  ];
  const gridData = [
    {
      name: TableRowsIcon,
      id: 2,
    },
    {
      name: GridViewIcon,
      id: 1,
    },
  ];
  return (
    <div className="featuredProperty">
      {location.pathname !== "/properties" && (
        <>
          <h1>Featured Luxury Property</h1>
          <p>Create property listings with all the features you’d expect</p>
        </>
      )}
      {location.pathname === "/properties" && (
        <>
          <div className="properties_grid">
            <h2>Properties</h2>
            <div className="grid">
              {gridData.map((item) => {
                return (
                  <div className="grid_icon" key={item.id}>
                    <item.name
                      className={grid === item.id ? "active icon" : "icon"}
                      onClick={() => setGrid(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="categories">
            <ul>
              {typeProperties?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setCurrent(item.id)}
                  className={current === item.id ? "active" : ""}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="gallery">
        <ul className={grid === 2 ? "row" : ""}>
          {listData &&
            listData.length > 0 &&
            listData?.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/property/${item.id}`} className="link">
                    <div className="image">
                      <img src={JSON.parse(item.images)[0]?.url} alt="" />
                      <div className="attachment">
                        <div className="name">{item?.title}</div>
                        <div className="price">
                          {formattedPrice(item?.price, item?.currency)}
                        </div>
                      </div>
                    </div>
                    <div className="description">
                      <div
                        className={
                          item?.bedrooms ||
                          item?.bathrooms ||
                          item?.garage_space
                            ? "top_border top_desc"
                            : "top_desc"
                        }
                      >
                        <ul>
                          <li>
                            <span>{item?.bedrooms}</span>{" "}
                            {item?.bedrooms && <span>Bedrooms</span>}
                          </li>
                          <li>
                            <span>{item?.bathrooms}</span>{" "}
                            {item?.bathrooms && <span>Bathroom</span>}
                          </li>
                          <li>
                            <span>{item?.garage_space}</span>{" "}
                            {item?.garage_space && <span>parking Space</span>}
                          </li>
                        </ul>
                      </div>
                      <div className="bottom_desc">
                        <span>
                          {item?.str_no} {item?.street}
                        </span>
                        <span>
                          {item?.city} {item?.zip_code}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
