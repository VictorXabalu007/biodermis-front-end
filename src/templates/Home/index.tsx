import { Col } from "antd";
import { useStateTheme } from "../../context/ThemeProvider";
import HomeWrapper from "../../components/Home/home-wrapper";
import { HomeCardContainer } from "../../components/Home/cards-container";
import HomeChart from "../../components/Home/home-chart";
import HomeTables from "../../components/Home/home-tables";


export const HomeTemplate = () => {

  const {setTitle} = useStateTheme();
  setTitle('Home');

  return (

        <HomeWrapper>

            <Col lg={24}>
              <HomeCardContainer />
            </Col>

            <Col lg={16}>
              <HomeChart />
            </Col>

            <Col xs={24} sm={24} lg={8}>
              <HomeTables />
            </Col>
      

        </HomeWrapper>
       

  
  );
};
