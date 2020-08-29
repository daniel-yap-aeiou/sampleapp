import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { TD } from "../../Theme/styles";

function Data(props) {
  const [data, updateData] = useState([]);

  useEffect(() => {

    updateData(prevValue => prevValue = props.data);
    return () => {
      console.log("cleaned up");
    };
  }, [props.data]);

  return (
    <table className="table table-striped table-bordered">
      <tbody>
        {data.map((pd) => {
          return (
            <tr key={pd.id}>
              <TD>
                <img src={pd.thumbnailUrl} alt="" /> {pd.title}
              </TD>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default withRouter(Data);
