import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { DEFAULT_PATH } from "../../constants/paths";



export const ForbiddenPage = () => {

  const navigate = useNavigate();
    return (
    <Result
        status="403"
        title="403"
        subTitle="OPS, Não era para você estar aqui!"
        extra={<Button onClick={()=> navigate(DEFAULT_PATH)}>Ir para Login</Button>}
      />
    )
}