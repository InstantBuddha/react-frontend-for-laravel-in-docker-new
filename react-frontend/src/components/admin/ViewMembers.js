import React, { useEffect, useState } from "react";
import { getWithBearerToken } from "../../services/ApiServices";
import MemberCard from "./MemberCard";

function ViewMembers() {
  const [memberArr, setMemberArr] = useState([]);
  const [isDataDownloaded, setIsDataDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGetSuccessful, setIsgetSuccessful] = useState(null);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
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
      <h1>The members:</h1>
      <div>
        {isDataDownloaded ? displayContent() : <p>Downloading data...</p>}
      </div>
    </div>
  );
}
export default ViewMembers;
