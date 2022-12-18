import FolderIcon from "@mui/icons-material/Folder";
import { ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import * as React from "react";
import { CollapsedBreadcrumbs } from "./BreadCrumb";
import { findIndex, dropRight } from "lodash";
import { CSVTable } from "./CSVTable";
import { IconButton } from "@material-ui/core";
import { ViewAgenda } from "@material-ui/icons";
import { setColumns } from "../../redux/actions";
const csv = require("csvtojson");

export function FileView() {
  const [secondary, setSecondary] = React.useState(false);
  const [breadcrumbs, setBreadCrumbs] = React.useState<any>([]);
  const [csvData, setCSVData] = React.useState([]);
  const [csvColumns, setCSVColumns] = React.useState([]);

  const [files, setFiles] = React.useState([]);
  React.useEffect(() => {
    fetchFiles("");
  }, []);
  const fetchFiles = (path: string) => {
    const params = {
      path,
    };
    axios
      .get("/api/v1/file/list", { params })
      .then((response) => {
        const navigateIndex = findIndex(
          breadcrumbs,
          function (breadcrumb: any) {
            return breadcrumb.url === path;
          }
        );
        let newBreadCrumb = [];
        if (navigateIndex > -1) {
          newBreadCrumb = dropRight(breadcrumbs, navigateIndex);
        } else {
          newBreadCrumb = breadcrumbs;
          const title: any = path == "" ? "Root" : path.split("/").at(-1);
          newBreadCrumb.push({ title: title, url: path });
        }

        setBreadCrumbs(newBreadCrumb);
        setFiles(response.data);
      })
      .catch();
  };
  const loadCSV = (path: string) => {
    const params = {
      path,
    };
    axios
      .get("/api/v1/file/get", { params })
      .then((response) => {
        csv({
          noheader: true,
          output: "json",
        })
          .fromString(response.data)
          .then((csvRows: any) => {
            const toJson: any = [];
            const columns: any = [];
            csvRows.forEach((aCsvRow: any, i: any) => {
              if (i !== 0) {
                const builtObject: any = {};
                Object.keys(aCsvRow).forEach((aKey) => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  const keyToAddInBuiltObject = csvRows[0][aKey];
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                });

                builtObject.id = i;
                toJson.push(builtObject);
              } else {
                Object.keys(aCsvRow).forEach((aKey: any) => {
                  debugger;
                  columns.push({ field: aCsvRow[aKey] });
                });
              }
            });
            setCSVColumns(columns);
            setCSVData(toJson);
          });
      })
      .catch();
  };
  const navigate = (path: string) => {
    fetchFiles(path);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CollapsedBreadcrumbs
        breadcrumbs={breadcrumbs}
        navigate={navigate}
      ></CollapsedBreadcrumbs>
      <Grid container>
        <Grid item xs={4} style={{ border: "1px solid grey" }}>
          <List dense>
            {files.map((file: any, index: any) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        loadCSV(`${file.path}/${file.name}`);
                      }}
                    >
                      <ViewAgenda />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      file.isDir && navigate(`${file.path}/${file.name}`);
                    }}
                  >
                    <ListItemIcon>{file.isDir && <FolderIcon />}</ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8} style={{ border: "1px solid grey" }}>
          <CSVTable csvData={csvData} columns={csvColumns}></CSVTable>
        </Grid>
      </Grid>
    </Box>
  );
}
