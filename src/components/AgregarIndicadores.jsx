import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Modal from "react-modal";
import EditIndicadores from "./EditIndicadores";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";


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
      meta: "",
      proceso: "",
      sirveI: "",
      medicion: "",
      responsable: "",
    },
  });

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const estilodiv = {
    border: '2px solid black',  // ancho estilo color
    padding: '5px',     
    opacity: 0.5, // Valor de transparencia, donde 0.5 es semitransparente
    backgroundColor: '#000',
  }

  const [indicadoresData, setIndicadoresData] = useState([]);

  const handleAddComponent = ( data ) => {
    console.log(data);

    // Agregar los valores a la lista de indicadores
    setIndicadoresData((prevData) => [...prevData, data]);

    const newData = {
      nombre: data.nombre,
      meta: data.meta,
      proceso: data.proceso,
      medicion: data.medicion,
      responsable: data.responsable,
      sirveI: data.sirveI,
    };

    // Guardar los datos en localStorage
  const storedData = localStorage.getItem('formData');
  const existingData = storedData ? JSON.parse(storedData) : [];
  existingData.push(newData);
  localStorage.setItem('formData', JSON.stringify(existingData));

    // Generar un ID único para cada nuevo componente
    const newComponentId = `component_${componentList.length + 1}`;
    // Crear un nuevo componente con los valores ingresados por el usuario
    const newComponent = (
      <EditIndicadores
        key={newComponentId}
        id={newComponentId}
        data={data}
      />
    );
    // Agregar el nuevo componente a la lista
    setComponentList((prevList) => [...prevList, newComponent]);
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

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setIndicadoresData(JSON.parse(storedData));
    }
  }, []);

  return (
    <Box>
      <Button color="secondary" variant="contained" onClick={abrirModal}>
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
          <Form.Select size="sm" aria-label="Default select example">
            <option>Selecciona una entidad</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
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
          <Form.Select size="sm" aria-label="Default select example">
            <option>Tipo de indicador</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <br />
          <Form.Select size="sm" aria-label="Default select example">
            <option>Tendencia esperada</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
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
          <Button type="submit" color="secondary" variant="contained">
            Enviar
          </Button>
        </Form>
      </Modal>
      {/* Componentes agregados */}
      <Box>
        {componentList.map((component, index) => (
          <Box key={`component_${index}`} sx={{ padding: "5px" }}>
            {component}
          </Box>
        ))}
      </Box>
      {/* Imprimir los valores de los indicadores */}
      <Box>
        {indicadoresData.map((data, index) => (
          <Box key={`indicador_${index}`} sx={{ padding: "5px" }}>
            <div onClick={abrirModal} style={estilodiv}>
              <p>{data.nombre}</p>
            </div>
            <p>Nombre: {data.nombre}</p>
            <p>Valor de meta: {data.meta}%</p>
            <p>Valor de proceso: {data.proceso}</p>
            <p>Frecuencia: {data.medicion}</p>
            <p>Responsable: {data.responsable}</p>
            <p>Sirve: {data.sirveI}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Agregar;
