import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styled from "styled-components";

function Device({ device, pingDevice }) {
  const [loading, setLoading] = useState(false);
  const ping = async () => {
    setLoading(true);
    await pingDevice(device);
    setLoading(false);
  };
  return (
    <>
      <TableCell>{device.hostname}</TableCell>
      <TableCell>{device.ipAddress}</TableCell>
      <TableCell>{device.model}</TableCell>
      <TableCell>
        {device.reachability ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <HighlightOffIcon style={{ color: "red" }} />
        )}
      </TableCell>
      <TableCell>
        {device.lastChecked
          ? new Date(device.lastChecked).toLocaleString()
          : null}
      </TableCell>
      <TableCell>
        {loading ? "Pinging..." : <button onClick={ping}>Ping</button>}
      </TableCell>
    </>
  );
}

export default Device;
