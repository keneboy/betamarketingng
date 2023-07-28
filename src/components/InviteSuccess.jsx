import axios from "api/axios";
import { useLocation } from "react-router-dom";

export default function InviteSuccess() {
  const location = useLocation();
  async function handleReset() {
    try {
      const { data } = await axios.post("/resendEmail", {
        email: location?.state?.from,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="success_invite">
      <div className="card">
        <div className="image">
          <img src="/image/mail.png" alt="" />
          <span> 1 </span>
        </div>

        <h1>Confirmation of user via Email</h1>
        <p>Details about the realtors has been sent to:</p>
        <p>{location?.state?.from}</p>
        <p className="resend">
          Didn't receive this email?{" "}
          <span onClick={handleReset}>Resend Email</span>
        </p>
      </div>
    </div>
  );
}
