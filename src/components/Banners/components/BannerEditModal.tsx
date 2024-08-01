import { Form, Modal, ModalProps, Upload } from "antd"
import { FaX } from "react-icons/fa6"
import { useBannerUpdate } from "../hooks/useBannerUpdate"
import { Controller } from "react-hook-form";
import { Input } from "../../shared/Input/Input";
import { BannerModalProps } from "../@types/BannerType";
import { UploadProps } from "antd/lib";
import { BsDownload } from "react-icons/bs";
import { useState } from "react";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  beforeUpload: () => {
    return false;
  },
  accept: "image/png, image/jpeg, image/jpg",
};

type CurrentBannerData = {
  ordem:string,
  imagem:string
  id:number
}


export const BannerEditModal = ({open,setOpen,ordem,imagem,id,...rest}:ModalProps & BannerModalProps & CurrentBannerData) => {

    const {errors,control,handleSubmit,onSubmit,reset,contextHolder,setValue} = useBannerUpdate({id});
    const [form] = Form.useForm();

    const onReset = () => {
      setOpen(false)
      form.resetFields();
      reset()
    }

    setValue('ordem',String(ordem))

    const [initialData,setInitialData] = useState({
      order: ordem,
      imagem,
    })

    
    return (
       <Modal
        closable
        maskClosable 
        open={open}
        title="Editar banner"
        closeIcon={<FaX className="fill-brand-purple" />}
        onOk={handleSubmit(onSubmit)}
        okText="Atualizar"
        onCancel={onReset}
        {...rest}
        >

    <Form form={form}>

        {contextHolder}

        <Controller
          name="ordem"
          control={control}
          render={({ field }) => (
            <Form.Item
              name="ordem"
              validateStatus={errors.ordem ? "error" : "success"}
              help={errors.ordem && errors.ordem.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Ordem"
                  htmlFor="ordem"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Input.System 
                  {...field}
                  id="ordem"
                  type="number"
                  value={initialData.order}
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                    setInitialData({
                      ...initialData,
                     order:e.target.value
                    })
                    setValue('ordem',e.target.value)
                  }}
               
                />
              </Input.Root>
            </Form.Item>
          )}
        />

      <Controller
          name="imagem"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="src"
              validateStatus={errors.imagem ? "error" : "success"}
              help={errors.imagem && errors.imagem.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Imagem"
                  htmlFor="img"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Dragger 
             
  
                onChange={(file)=>onChange(file.fileList)}

                 {...props}
                 >
                  <p className="uploader-icon flex justify-center items-center">
                    <BsDownload size={20} className="fill-brand-purple" />
                  </p>
                  <p className="ant-upload-text">
                    Clique ou arraste o arquivo aqui
                  </p>
                  <p className="ant-upload-hint">Faça o upload do banner</p>
                </Dragger>
              </Input.Root>
            </Form.Item>
          )}
        />


    </Form>


       </Modal>
    )
}