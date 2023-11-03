import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id_completo", headerName: "ID", flex: 0.1 },
    {
      field: "nombre_indicador",
      headerName: "nombre indicador",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "meta",
      headerName: "Meta",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.3, 
    },
    {
      field: "tendencia",
      headerName: "Tedencia",
      headerAlign: "center",
      align: "center",
      flex: 0.6,
    },
    {
      field: "Limite_insatifacion",
      headerName: "Limite insatifacion",
      align: "center",
      flex: 0.8,
    },
    {
      field: "Limite_satifacion",
      headerName: "Limite satisfacion",
      flex: 0.8,
      align: "center",
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tablero")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header
        title="TABLERO"
      />
      <Box
        m="40px 0 0 0"
        height="70vh"
        width="90vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
