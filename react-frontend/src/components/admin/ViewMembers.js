import React, { useEffect, useState } from "react";
import { getWithBearerToken, logUserOut } from "../../services/ApiServices";
import MemberCard from "./MemberCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticationStatus,
  setToken,
  setUserName,
} from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

function ViewMembers() {
  const [memberArr, setMemberArr] = useState([]);
  const [isDataDownloaded, setIsDataDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGetSuccessful, setIsgetSuccessful] = useState(null);
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    await getWithBearerToken(token)
      .then((response) => {
        setMemberArr(response.data.data);
        setIsgetSuccessful(true);
        setIsDataDownloaded(true);
      })
      .catch((error) => {
        setIsgetSuccessful(false);
        setIsDataDownloaded(true);

        if (error.response.status) {
          setErrorMessage(`Error downloading information: Error ${error.response.status}`);
          return;
        }
        setErrorMessage(`Unknown error downloading information`);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const logOut = async () => {
    await logUserOut(token)
      .then((response) => {
        dispatch(setAuthenticationStatus(false));
        dispatch(setUserName(null));
        dispatch(setToken(null));
        navigate("/"); //at this point the user gets redirected anyway, but just in case
      })
      .catch((error) => {
        if (error.response.status) {
          setErrorMessage(`Error logging out: Error ${error.response.status}`);
          return;
        }
        setErrorMessage(`Unknown error logging out`);
      });
  };

  const displayContent = () => {
    if (isGetSuccessful && !errorMessage) {
      return memberArr.map((memberData) => (
        <MemberCard key={memberData.id} memberData={memberData} />
      ));
    }
    return <p>{errorMessage}</p>;
  };

  return (
    <div>
      <div className="d-flex justify-content-end bg-dark text-light">
        <div className="p-2">
          <p>Hello, {userName}</p>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-primary" onClick={logOut}>
            Log out
          </button>
        </div>
      </div>
      <h1 className="mb-0">The members:</h1>
      <div>
        {isDataDownloaded ? displayContent() : <p>Downloading data...</p>}
      </div>
    </div>
  );
}
export default ViewMembers;
