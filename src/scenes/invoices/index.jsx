import React, {useState} from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Indicador from "../../components/Indicadores";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "react-bootstrap";
import { dataEntidades } from '../../data/data';
import TeamSelect from "../../components/TeamSelect";


const Invoices = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleSelectEntity = (entity) => {
    console.log("Selected Entity in EditIndicadores:", entity); // Verifica si la entidad se recibe correctamente
  setSelectedEntity(entity);
  };
 
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#293040',
       
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#293040' : 'transparent', // Estilo personalizado para el fondo de las opciones
      color: state.isSelected ? 'white' : 'black',
      
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };
 
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Box m="20px">
      <Header title="AGREGAR DATOS A INDICADORES" subtitle="" />
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
        <Form noValidate>
        <TeamSelect
            dataEntidades={dataEntidades}
            onSelectEntity={handleSelectEntity}
          />
        </Form>
      </Box>

      <br />
      <Indicador />
    </Box>
  );
};




        


export default Invoices;
