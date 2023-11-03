import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, CardActionArea, useTheme, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from 'react-modal';
import BarChart from "./BarChart";
import { tokens } from "../theme";
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";



const VentanaEmergenteComponente = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [datos, setDatos] = useState([]);
  const [datosT, setDatosT] = useState([]);
  const [modalId, setModalId] = useState(null);

  const abrirModal = (id) => {
    setModalAbierto(true);
    setModalId(id);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  
  useEffect(() => {
    // Realiza la solicitud a la base de datos utilizando Axios
    axios
      .get("http://localhost:3001/indicador")
      .then((response) => {
        // Actualiza los datos obtenidos en el estado
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  useEffect(() => {
    axios
    .get("https://localhost:3001/indicadort:id")
    .then((response) => {
      setDatosT(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    })
  })



  const modalEstilos = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-40%, -50%)",
      backgroundColor: "#141b2d",
      padding: "20px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      height: "70%",
      width: "60%",
    },
    title: {
      color: "#fff",
      fontSize: "18px",
      marginBottom: "10px",
    },
    paragraph: {
      color: "#555",
      fontSize: "14px",
      marginBottom: "20px",
    },
    Button: {
      marginRight: "20px",
    },
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "mes", headerName: "Mes", flex: 1 },
    { field: "año", headerName: "Año", flex: 1 },
    { field: "numerador", headerName: "Numerador", type: "number", flex: 1 },
    {
      field: "denominador",
      headerName: "Denominador",
      type: "number",
      flex: 1,
    },
    { field: "logro", headerName: "Logro", type: "number", flex: 1 },
    { field: "causas", headerName: "Causas", flex: 1 },
    { field: "propuestas", headerName: "Propuestas", flex: 1 },
  ];

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


const currentYear = new Date().getFullYear();
const nextYears = [];

for (let i = 0; i < 5; i++) {
  const year = currentYear + i;
  nextYears.push({ value: year, label: year.toString() });
}

const handleSubmitForm = async (data) => {
  const numerador = data.numerador;
  const denominador = data.denominador;

  const logro = (numerador / denominador) * 100;

  const datosConModalId = {
    ...data,
    logro,
    modalId: modalId
  };

  try {
    // Realiza la solicitud POST utilizando Axios
    const response = await axios.post('http://localhost:3001/indicadort', datosConModalId);
    
    // Maneja la respuesta del servidor
    console.log(response.data);
  } catch (error) {
    // Maneja los errores de la solicitud
    console.error(error);
  }

  reset();
//   window.location.reload();
};


const {
  handleSubmit,
  control,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    numerador: "",
    denominador: "",
    causas: "",
    mes: "",
    año: "",
    propuestas: "",
  },
});

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {datos.map((dato) => (
          <Box width="300px" key={dato.id} style={{ marginBottom: "20px" }}>
            <Card>
              <CardActionArea onClick={() => abrirModal(dato.id)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dato.nombre_indicador}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
        <Modal
          isOpen={modalAbierto}
          onRequestClose={cerrarModal}
          contentLabel="Modal1"
          style={modalEstilos}
        >
          <h2 style={modalEstilos.title}>
            {datos.find((dato) => dato.id === modalId)?.nombre_indicador}
          </h2>
       
          {/* */}

          <Form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="denominador">
                <Form.Label>Denominador</Form.Label>
                <Controller
                  id="denominador"
                  name="denominador"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      isInvalid={errors.denominador}
                      type="number"
                      {...field}
                      placeholder="denominador"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  Requerido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="numerador">
                <Form.Label>Numerador:</Form.Label>
                <Controller
                  id="numerador"
                  name="numerador"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      {...field}
                      placeholder="Numerador"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  Requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="causas">
                <Form.Label>Causas</Form.Label>
                <Controller
                  id="causas"
                  name="causas"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      isInvalid={errors.causas}
                      type="text"
                      {...field}
                      placeholder="causas"
                      style={{ width: "100%" }} // Añade este estilo para ocupar todo el ancho
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  Requerido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="propuestas">
                <Form.Label>Propuestas</Form.Label>
                <Controller
                  id="propuestas"
                  name="propuestas"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      {...field}
                      placeholder="Propuestas"
                      style={{ width: "100%" }} // Añade este estilo para ocupar todo el ancho
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  Requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="mes">
                <Form.Label>Mes</Form.Label>
                <Controller
                  id="mes"
                  name="mes"
                  control={control}
                  render={({ field }) => (
                    <Form.Select
                      size="sm"
                      aria-label="Mes"
                      {...field}
                      style={{ marginRight: "10px" }} // Añade este estilo para dejar espacio entre los selects
                    >
                      <option>Selecciona el mes</option>
                      {months.map((mes, index) => (
                        <option key={index} value={mes}>
                          {mes}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="año">
                <Form.Label>Año</Form.Label>
                <Controller
                  id="año"
                  name="año"
                  control={control}
                  render={({ field }) => (
                    <Form.Select size="sm" aria-label="Año" {...field}>
                      <option>Selecciona el año</option>
                      {nextYears.map((yearObj, index) => (
                        <option key={index} value={yearObj.value}>
                          {yearObj.label}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                />
              </Form.Group>
            </Row>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Enviar
              </Button>
            </Box>
          </Form>

          <Box
            m="40px 0 0 0"
            height="75vh"
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
            }}
          >
            <DataGrid rows={datosT} columns={columns} pageSize={5} />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={cerrarModal}
            >
              Cerrar
            </Button>
          </Box>
          <BarChart />
        </Modal>
      </div>
    </>
  );
}
export default VentanaEmergenteComponente;