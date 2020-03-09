import React, { useState, useEffect } from "react";
import { api } from "./api_conf";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Device from "./Device";

function Devices() {
  const [deviceList, setDeviceList] = useState([]);

  const pingDevice = async device => {
    await fetch(`${api}/api/ping/${device.ipAddress}`);
    getDevices();
  };
  const getDevices = async () => {
    const res = await fetch(`${api}/api/devices`);
    const data = await res.json();
    setDeviceList(data);
  };
  const deleteDevice = async id => {
    await fetch(`${api}/api/devices/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    });
    getDevices();
  };
  useEffect(() => {
    getDevices();
  }, []);
  return (
    <div>
      <h2>Device List</h2>
      <TableContainer>
        <DeviceTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Hostname</b>
              </TableCell>
              <TableCell>
                <b>IP Address</b>
              </TableCell>
              <TableCell>
                <b>Model</b>
              </TableCell>
              <TableCell align="center">
                <b>Reachability</b>
              </TableCell>
              <TableCell>
                <b>Last Checked</b>
              </TableCell>
              <TableCell align="center">
                <b>Test</b>
              </TableCell>
              <TableCell align="center">
                <b>Delete Device</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceList.length > 0
              ? deviceList.map(d => (
                  <TableRow key={d.id} style={{ height: 63 }}>
                    <Device
                      device={d}
                      pingDevice={pingDevice}
                      deleteDevice={deleteDevice}
                    />
                  </TableRow>
                ))
              : null}
          </TableBody>
        </DeviceTable>
      </TableContainer>
    </div>
  );
}

const DeviceTable = styled(Table)`
  max-width: 850px;
`;

export default Devices;
