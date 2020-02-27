import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Device from "./Device";

function Devices() {
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/devices");
      const data = await res.json();
      console.log(data);
      setDeviceList(data);
    }
    getData();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hostname</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Reachability</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {deviceList.length > 0
              ? deviceList.map(d => (
                  <TableRow key={d.id}>
                    <Device device={d} />
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Devices;
