import React, { useState } from "react";
import { Box, Card, CardContent, Typography, CardActionArea, Button, TextField} from "@mui/material";
import Modal from 'react-modal';
import { Row, Col, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";


const EditIndicadores = (props) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
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

  const {
    control,
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

  return (
    <>
      <Box width="300px">
        <Card>
          <CardActionArea onClick={abrirModal}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.nameValue}
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
        <h2 style={modalEstilos.title}>{props.nameValue}</h2>
        <Form noValidate>
         
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
    </>
  );
};


export default EditIndicadores;