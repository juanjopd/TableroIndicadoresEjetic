
import { Box } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import Agregar from "../../components/AgregarIndicadores";
import { Form } from "react-bootstrap";

const Admin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
 

  
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
