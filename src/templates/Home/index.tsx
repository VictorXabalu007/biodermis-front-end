import { Col } from "antd";
import { Home } from "../../components/Home";

export const HomeTemplate = () => {
  return (
    <Home.Layout>
      <Home.Header heading="Home" />

      <Home.Content>
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
      </Home.Content>
    </Home.Layout>
  );
};
