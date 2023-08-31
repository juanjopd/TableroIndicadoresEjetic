import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import Agregar from "../../components/AgregarIndicadores";
import { Form } from "react-bootstrap";
import { dataEntidades } from '../../data/data';
import TeamSelect from "../../components/TeamSelect";


const Admin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleSelectEntity = (entity) => {
    console.log("Selected Entity in EditIndicadores:", entity); // Verifica si la entidad se recibe correctamente
  setSelectedEntity(entity);
  };
 
  const options = [
    {
      value: "Hospital Santa Monica de Dosquebradas",
      label: "Hospital Santa Monica de Dosquebradas",
    },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];


  return (
    <Box m="20px">
      <Header title="ADMINISTRADOR DE INDICADORES" />
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
        <Box>
          <Agregar />
        </Box>
      </Box>
      <br />
    </Box>
  );
};

export default Admin;
