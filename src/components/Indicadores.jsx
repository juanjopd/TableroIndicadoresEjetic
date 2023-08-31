import { useState } from "react";
import { Box, Card, CardContent, Typography, CardActionArea, useTheme, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from 'react-modal';
import BarChart from "./BarChart";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";

const VentanaEmergenteComponente = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbierto2, setModalAbierto2] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const abrirModal2 = () => {
    setModalAbierto2(true);
  };

  const cerrarModal2 = () => {
    setModalAbierto2(false);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

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

  /* const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#293040",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#293040" : "transparent", // Estilo personalizado para el fondo de las opciones
      color: state.isSelected ? "white" : "black",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  }; */

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [data, setData] = useState([]);
  const { handleSubmit, control, reset } = useForm();
  


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "mes", headerName: "Mes", flex: 1 },
    { field: "ano", headerName: "Año", flex: 1 },
    { field: "numerador", headerName: "Numerador", type: "number", flex: 1 },
    { field: "denominador", headerName: "Denominador", type: "number", flex: 1 },
    { field: "logro", headerName: "Logro", type: "number", flex: 1 },
    { field: "causas", headerName: "Causas", flex: 1 },
    { field: "propuestas", headerName: "Propuestas", flex: 1 },
  ];


  const currentYear = new Date().getFullYear();
  const nextYears = [];

  for (let i = 0; i < 5; i++) {
    const year = currentYear + i;
    nextYears.push({ value: year, label: year.toString() });
  }

  const onSubmit = (formData) => {
    const numericNumerador = parseFloat(formData.numerador);
    const numericDenominador = parseFloat(formData.denominador);

    if (!isNaN(numericNumerador) && !isNaN(numericDenominador)) {
      const resultado = (numericNumerador * 100) / numericDenominador;

      const newData = {
        id: data.length + 1,
        mes: formData.mes,
        ano: formData.ano,
        numerador: numericNumerador,
        denominador: numericDenominador,
        logro: resultado.toFixed(0)+ "%",
        causas: formData.causas,
        propuestas: formData.propuestas,
      };

      setData((prevData) => [...prevData, newData]);
      reset();
    }
  };


    return (
      <>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Numerador:</label>
              <Controller
                name="numerador"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="text" {...field} />}
              />
            </div>
            <div>
              <label>Denominador:</label>
              <Controller
                name="denominador"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="text" {...field} />}
              />
            </div>
            <div>
              <label>Causas:</label>
              <Controller
                name="causas"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="text" {...field} />}
              />
            </div>
            <div>
              <label>Propuestas:</label>
              <Controller
                name="propuestas"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="text" {...field} />}
              />
            </div>
            <div>
              <label>Mes:</label>
              <Controller
                name="mes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecciona un mes</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label>Año:</label>
              <Controller
                name="ano"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecciona un año</option>
                    {nextYears.map((yearOption) => (
                      <option key={yearOption.value} value={yearOption.value}>
                        {yearOption.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <Button color="secondary" variant="contained" type="submit">
              Calcular
            </Button>
          </form>
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
            <DataGrid rows={data} columns={columns} pageSize={5} />
          </Box>
        </div>

        <Box width="300px">
          <Card>
            <CardActionArea onClick={abrirModal}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  PORCENTAJE DE PROYECTOS QUE CUMPLEN CON LAS METAS DEL PLAN
                  ESTRATEGÍCO
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Modal
          isOpen={modalAbierto}
          onRequestClose={cerrarModal}
          contentLabel="Modal1"
          style={modalEstilos}
        >
          <h2 style={modalEstilos.title}>
            PORCENTAJE DE PROYECTOS QUE CUMPLEN CON LAS METAS DEL PLAN
            ESTRATEGÍCO
          </h2>
          <BarChart />

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              style={modalEstilos.Button}
              onClick={abrirModal2}
            >
              Insertar
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={cerrarModal}
            >
              Cerrar
            </Button>
          </Box>
          <Modal
            isOpen={modalAbierto2}
            onRequestClose={cerrarModal2}
            contentLabel="Modal2"
            style={modalEstilos}
          >
            <h2 style={modalEstilos.title}>
              PORCENTAJE DE PROYECTOS QUE CUMPLEN CON LAS METAS DEL PLAN
              ESTRATEGÍCO
            </h2>

            <form noValidate>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Form.Select size="sm" aria-label="Default select example">
                  <option>Selecciona un mes</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  options={nextYears}
                >
                  <option>Selecciona un año</option>
                </Form.Select>
              </Box>
              <br />
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Numerador</Form.Label>
                  <Controller
                    name="numerador"
                    rules={{ required: true }}
                    //control={control}
                    render={({ field }) => (
                      <Form.Control
                        //isInvalid={errors.meta}
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
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Denominador</Form.Label>
                  <Controller
                    name="denominador"
                    rules={{ required: true }}
                    //control={control}
                    render={({ field }) => (
                      <Form.Control
                        //isInvalid={errors.proceso}
                        type="number"
                        {...field}
                        placeholder="Denomindador"
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    Requerido
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Analisis de las causas </Form.Label>
                  <Controller
                    name="causas"
                    rules={{ required: true }}
                    //control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        {...field}
                        placeholder="Analisis de las causas "
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    Requerido
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Acciones propuestas</Form.Label>
                  <Controller
                    name="propuestas"
                    rules={{ required: true }}
                    //control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        {...field}
                        placeholder="Acciones propuestas"
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    Requerido
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  style={modalEstilos.Button}
                >
                  Agregar datos
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={cerrarModal2}
                >
                  Volver
                </Button>
              </Box>
            </form>
          </Modal>
        </Modal>
      </>
    );
  };




export default VentanaEmergenteComponente;