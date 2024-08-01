import { Form, Modal, ModalProps, Upload } from "antd";
import { FaX } from "react-icons/fa6";
import { useBannerRegister } from "../hooks/useBannerRegister";
import { Controller } from "react-hook-form";
import { Input } from "../../shared/Input/Input";
import Select from "../../shared/Input/Select";

import { UploadProps } from "antd/lib";
import { BsDownload } from "react-icons/bs";
import { BannerModalProps } from "../@types/BannerType";



const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  beforeUpload: () => {
    return false;
  },
  accept: "image/png, image/jpeg, image/jpg",
};

export const BannerRegisterModal = ({
  open,
  setOpen,
  ...rest
}: ModalProps & BannerModalProps) => {
  const { 
    errors, 
    handleSubmit,
    onSubmit, 
    control,
    reset,
    bannerCategoryOptions,
    contextHolder
} = useBannerRegister();

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    reset()
    setOpen(false)
  }

  return (
    <Modal
    
      onCancel={onReset}
      {...rest}
      open={open}
      closable
      title="Registrar banner"
      closeIcon={<FaX className="fill-brand-purple" />}
      okText="Enviar"
      onOk={()=> {
        handleSubmit(onSubmit)()
        setTimeout(()=> {
          setOpen(false)
        },1000)
      }}
    >
      <Form form={form}>

        {contextHolder}

        <Controller
          name="titulo"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="title"
              validateStatus={errors.titulo ? "error" : "success"}
              help={errors.titulo && errors.titulo.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Título"
                  htmlFor="title"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Select 
                    options={bannerCategoryOptions}
                    onChange={(e) => onChange(e.value)}
                    id="title"
                 />
              </Input.Root>
            </Form.Item>
          )}
        />
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
                  placeholder="ex: 2"
                  id="ordem"
                  type="number"
                  {...field}
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

                <Dragger onChange={(file)=>onChange(file.fileList)} {...props}>
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
  );
};
