import { Button, Result } from "antd";


export const MercardoPagoFailure = () => {


  return (
    <Result
    status="error"
    title="Algo deu errado na compra!"
    extra={[
      <Button key="console">
        Ok
      </Button>,
    ]}
  />
  );
};
