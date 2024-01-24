import React, { useEffect, useState } from "react";
import { getWithBearerToken } from "../../services/ApiServices";
import MemberCard from "./MemberCard";
import { useSelector } from "react-redux";

function ViewMembers() {
  const [memberArr, setMemberArr] = useState([]);
  const [isDataDownloaded, setIsDataDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGetSuccessful, setIsgetSuccessful] = useState(null);
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.user.token);

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
          setErrorMessage(error.response.status);
          return;
        }
        setErrorMessage(" Unknown error");
      });
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const displayContent = () => {
    if (isGetSuccessful) {
      return memberArr.map((memberData) => (
        <MemberCard key={memberData.id} memberData={memberData} />
      ));
    }
    return <p>Error downloading information: Error {errorMessage}</p>;
  };

  return (
    <div>
      <div className="bg-dark text-light">
        <p className="text-end">Hello, {userName}</p>
      </div>
      <h1 className="mb-0">The members:</h1>
      <div>
        {isDataDownloaded ? displayContent() : <p>Downloading data...</p>}
      </div>
    </div>
  );
}
export default ViewMembers;
