import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Modal from "react-modal";
import EditIndicadores from "./EditIndicadores";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

Modal.setAppElement("#root");

const Agregar = () => {
  const [componentList, setComponentList] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      meta: "",
      proceso: "",
      sirveI: "",
      medicion: "",
      responsable: "",
      formula: "",
      fuente: "",
      limiteI: "",
      limiteS: "",
    },
  });

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/indicadores")
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

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los datos de la tabla
    fetch('http://localhost:4000/tiposi')
      .then((response) => response.json())
      .then((data) => {
        // Almacenar los datos en el estado
        setOptions(data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud si es necesario
      });
  }, []);

  const [optionst, setOptionst] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los datos de la tabla
    fetch('http://localhost:4000/tendencia')
      .then((response) => response.json())
      .then((data) => {
        // Almacenar los datos en el estado
        setOptionst(data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud si es necesario
      });
  }, []);
 

  const handleAddComponent = (formData) => {
    const tipoSeleccionado = formData.tipo;
    const tendenciaSeleccionada = formData.tendencia;

    console.log(formData);

    fetch("http://localhost:4000/indicadores", {
      method: "POST",
      body: JSON.stringify(formData), // Convierte a JSON los datos
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Generar un ID único para cada nuevo componente
        const newComponentId = `component_${componentList.length + 1}`;
        // Crear un nuevo componente con los valores ingresados por el usuario
        const newComponent = (
          <EditIndicadores
            key={newComponentId}
            id={newComponentId}
            data={data} // Asegúrate de usar `data` de la respuesta del servidor
            tipo={tipoSeleccionado}
            tendencia={tendenciaSeleccionada}
          />
        );

        // Agregar el nuevo componente a la lista
        setComponentList((prevList) => [...prevList, newComponent]);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
    // Cerrar el modal después de agregar el componente

    reset();
    cerrarModal();
  };
  
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
      height: "100%",
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

  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        style={{ marginLeft: "-97%", fontSize: "30px", borderRadius: "100px" }}
        onClick={abrirModal}
      >
        +
      </Button>
      <Modal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        contentLabel="Modal1"
        style={modalEstilos}
      >
        <h2 style={modalEstilos.title}>AGREGAR INDICADOR</h2>
        <Form noValidate onSubmit={handleSubmit(handleAddComponent)}>
          {/* <Form.Select size="sm" aria-label="Default select example">
            <option>Selecciona una entidad</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select> */}
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Nombre de indicador</Form.Label>
              <Controller
                name="nombre"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Nombre de indicador"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                Requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Controller
            name="tipo" // El nombre debe coincidir con la propiedad en el objeto formData
            control={control}
            render={({ field }) => (
              <Form.Select
                size="sm"
                aria-label="Tipo de indicador"
                {...field} // Asegúrate de incluir esta parte
              >
                <option>Selecciona un tipo de indicador</option>
                {options.map((option) => (
                  <option key={option.id} value={option.tipo}>
                    {option.tipo}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          <br />
          <Controller
            name="tendencia" // El nombre debe coincidir con la propiedad en el objeto formData
            control={control}
            render={({ field }) => (
              <Form.Select
                size="sm"
                aria-label="Tendencia esperada"
                {...field} // Asegúrate de incluir esta parte
              >
                <option>Selecciona la tendencia esperada</option>
                {optionst.map((option) => (
                  <option key={option.id} value={option.tendencia}>
                    {option.tendencia}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>meta</Form.Label>
              <Controller
                name="meta"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    isInvalid={errors.meta}
                    type="number"
                    {...field}
                    placeholder="meta"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                Requerido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Proceso</Form.Label>
              <Controller
                name="proceso"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    isInvalid={errors.proceso}
                    type="text"
                    {...field}
                    placeholder="Proceso"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                Requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Frecuencia de medicion</Form.Label>
              <Controller
                name="medicion"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Frecuencia de medicion"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                Requerido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Responsable</Form.Label>
              <Controller
                name="responsable"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Responsable"
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
              <Form.Label>Para que sirve el indicador</Form.Label>
              <Controller
                name="sirveI"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Para que sirve el indicador"
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
              <Form.Label>formula</Form.Label>
              <Controller
                name="formula"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="denominado/numerador"
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
              <Form.Label>fuente de informacion</Form.Label>
              <Controller
                name="fuente"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="fuente de informacion"
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
              <Form.Label>Limite de insatifacion</Form.Label>
              <Controller
                name="limiteI"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Limite de insatifacion"
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
              <Form.Label>Limite de satifacion</Form.Label>
              <Controller
                name="limiteS"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    placeholder="Limite de satifacion"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                Requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" color="secondary" variant="contained">
            Enviar
          </Button>
        </Form>
      </Modal>
      {/* Componentes agregados */}

      <div style={{ marginTop: "10px", marginLeft: "-100%" }}>
        {data.map((indicador, index) => (
          <Box key={index} sx={{ padding: "5px" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel_${index}_content`}
                id={`panel_${index}_header`}
              >
                <Typography>{indicador.nombre_indicador}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box sx={{ padding: "5px" }}>
                    <ul>
                      <li>Tipo de indicador: {indicador.tipo_indicador}</li>
                      <li>Meta: {indicador.meta}</li>
                      <li>Proceso: {indicador.proceso}</li>
                      <li>Frecuencia: {indicador.frecuencia}</li>
                      <li>Responsable: {indicador.responsable}</li>
                      <li>Para qué sirve: {indicador.sirve}</li>
                      <li>Formula: {indicador.formula}</li>
                      <li>
                        Fuente de información: {indicador.fuente_informacion}
                      </li>
                      <li>
                        Límite de insatisfacción:{" "}
                        {indicador.Limite_insatifacion}
                      </li>
                      <li>
                        Límite de satisfacción: {indicador.Limte_satifacion}
                      </li>
                    </ul>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
        {data.length === 0 && (
          <Typography>No hay datos de indicadores disponibles</Typography>
        )}
      </div>
    </Box>
  );
};

export default Agregar;
