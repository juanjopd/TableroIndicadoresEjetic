import React from 'react';
import { Form } from "react-bootstrap";


const TeamSelect = ({ dataEntidades, onSelectEntity }) => {


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