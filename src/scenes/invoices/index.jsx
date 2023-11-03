import React  from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Indicador from "../../components/Indicadores";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "react-bootstrap";


const Invoices = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  

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
       
        </Form>
      </Box>

      <br />
      <Indicador />
    </Box>
  );
};




        


export default Invoices;
