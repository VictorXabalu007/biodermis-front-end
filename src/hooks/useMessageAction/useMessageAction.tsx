import { message } from "antd";


export const useMessageAction = () => {


    const [messageApi, contextHolder] = message.useMessage();


    const success = (successMsg:string) => {
        messageApi.open({
          type: 'success',
          content: successMsg,
        });
      };
    
      const error = (errMsg:string) => {
        messageApi.open({
          type: 'error',
          content: errMsg,
        });
      };

    return {
        contextHolder,

        success,
        error
    }


}