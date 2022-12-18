import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export function CSVTable(props: any) {
  const [pageSize, setPageSize] = React.useState<number>(5);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  console.log(data);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        getRowId={(d) => d.id}
        columns={props.columns}
        rows={props.csvData}
      />
    </div>
  );
}
