import { Col } from "antd";
import { Home } from "../../components/Home";
import { useStateTheme } from "../../context/ThemeProvider";

export const HomeTemplate = () => {

  const {setTitle} = useStateTheme();
  setTitle('Home');

  return (

        
        <Home.Wrapper>

          <Col lg={24}>
            <Home.Cards />
          </Col>

          <Col lg={16}>
            <Home.Chart />
          </Col>

          <Col lg={8}>
            <Home.Tables />
          </Col>

        </Home.Wrapper>
  
  );
};
