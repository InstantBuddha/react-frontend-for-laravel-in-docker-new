import React from "react";
import "../../styles/member-card.css";

function MemberCard({ memberData }) {
  const tableRows = Object.entries(memberData).map(([key, value]) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{value}</td>
    </tr>
  ));

  return (
    <div className="member-card">
      <h2>{memberData.name}</h2>
      <table className="table table-bordered table-hover table-striped">
        <thead className="thead-light">
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
export default MemberCard;
