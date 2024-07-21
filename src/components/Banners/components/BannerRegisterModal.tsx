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
  multiple: true,
  beforeUpload: () => {
    return false;
  },
  listType: "picture-card",
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
    bannerStatusOptions
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
      onOk={handleSubmit(onSubmit)}
    >
      <Form form={form}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="categoria"
              validateStatus={errors.name ? "error" : "success"}
              help={errors.name && errors.name.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Nome do banner"
                  htmlFor="banner"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Input.System
                  id="banner"
                  className="border-purple-solid-950 placeholder-purple-solid-950 text-sm font-[600]"
                  placeholder="ex: cabelos"
                  onChange={onChange}
                />
              </Input.Root>
            </Form.Item>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="status"
              validateStatus={errors.status ? "error" : "success"}
              help={errors.status && errors.status.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Status"
                  htmlFor="status"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Select 
                    options={bannerStatusOptions}
                    onChange={(e) => onChange(e.value)}
                 />
              </Input.Root>
            </Form.Item>
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="category"
              validateStatus={errors.category ? "error" : "success"}
              help={errors.category && errors.category.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Categoria"
                  htmlFor="category"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Select 
                    options={bannerCategoryOptions}
                    onChange={(e) => onChange(e.value)}
                 />
              </Input.Root>
            </Form.Item>
          )}
        />

        <Controller
          name="src"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="src"
              validateStatus={errors.src ? "error" : "success"}
              help={errors.src && errors.src.message}
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
