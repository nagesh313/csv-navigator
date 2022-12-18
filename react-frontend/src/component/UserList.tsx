import { Checkbox, FormControlLabel } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast } from "../util/util";
import Title from "./Title";

export function UserListComponent(props: any) {
  const [userList, setUserList] = React.useState<any>([]);

  const fetchUserList = () => {
    axios
      .get("/api/v1/admin/getAllUsers")
      .then((response: any) => {
        setUserList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const toggleEnabled = (username: number, enable: boolean) => {
    const url = `/api/v1/admin/user/${
      enable ? "enable" : "disable"
    }/${username}`;
    axios
      .get(url)
      .then((response: any) => {
        fetchUserList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  return (
    <React.Fragment>
      <Title>List of registered Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Enabled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row: any) => (
            <TableRow key={row.username}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      defaultChecked={row.enabled}
                      onChange={(value: any) => {
                        toggleEnabled(
                          row.username,
                          value.currentTarget.checked
                        );
                      }}
                    />
                  }
                  label=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
export const UserList = withSnackbar(UserListComponent);
