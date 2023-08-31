import React from 'react';
import { Form } from "react-bootstrap";


const TeamSelect = ({ dataEntidades, onSelectEntity }) => {
  const handleSelectChange = (event) => {
    const selectedEntityName = event.target.value;
    console.log("Selected Entity Name:", selectedEntityName); // Verifica que esté recibiendo el valor correcto
    const selectedEntity = dataEntidades.find(
      (entity) => entity.name === selectedEntityName
    );
    console.log("Selected Entity:", selectedEntity); // Verifica si se encuentra la entidad correctamente
    onSelectEntity(selectedEntity);
  };

  return (
    <div>
     <Form.Select size="sm" aria-label="Default select example" >
        <option>Selecciona una entidad</option>
        {dataEntidades.map((entity) => (
          <option key={entity.id} value={entity.name}>
            {entity.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default TeamSelect;