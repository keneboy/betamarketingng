import axios from "api/axios";
import { useEffect, useContext, useState } from "react";
import AuthContext from "Context/AuthProvider";

export default function Commission({ update }) {
  const { state } = useContext(AuthContext);
  const { consultantLogin: login } = state;
  const [user, setUser] = useState();

  useEffect(() => {
    const abortCont = new AbortController();
    const getUser = async () => {
      try {
        const { data } = await axios.get("/getDownlineConsultant", {
          signal: abortCont.signal,
          headers: {
            authorization: `Bearer ${login?.accessToken}`,
          },
        });
        setUser(data?.message[0]);
      } catch (error) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("cleanedUp");
        } else {
          const err = error.response
            ? error.response?.data.message
            : error.message;
          console.log(err);
        }
      }
    };
    getUser();
  }, [update, login?.accessToken]);
  return (
    <div className="comission">
      <ul>
        <li>
          <span>&#8358;{user?.indirect}</span>
          <p> Indirect Commision</p>
        </li>
        <li>
          <span>&#8358;{user?.direct}</span>
          <p>Direct Commision</p>
        </li>
        <li>
          <span>{user?.ID}</span>
          <p>Downlines</p>
        </li>
      </ul>
    </div>
  );
}
