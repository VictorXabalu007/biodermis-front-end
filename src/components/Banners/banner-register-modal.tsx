import {
  ConfigProvider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Upload,
} from "antd";
import { FaX } from "react-icons/fa6";
import { useBannerRegister } from "../../hooks/banners/useBannerRegister";
import { Controller } from "react-hook-form";
import Select from "../shared/Input/select";
import { UploadProps } from "antd/lib";

import { RcFile } from "antd/es/upload";
import { colors } from "../../theme/colors";
import { FiUpload } from "react-icons/fi";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  beforeUpload: (file: RcFile) => {
    const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
      file.type
    );
    const isValidExtension = /\.(png|jpe?g)$/i.test(file.name);

    if (!isValidType || !isValidExtension) {
      message.error("Faça upload apenas de arquivos PNG, JPEG, ou JPG!");
      return Upload.LIST_IGNORE;
    }
    return false;
  },
  accept: "image/png, image/jpeg, image/jpg",
};

const BannerRegisterModal = ({
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
    contextHolder,
  } = useBannerRegister();

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    reset();
    setOpen(false);
  };

  return (
    <Modal
      onCancel={onReset}
      {...rest}
      open={open}
      closable
      title="Registrar banner"
      closeIcon={<FaX className="fill-brand-purple" />}
      okText="Enviar"
      onOk={() => {
        handleSubmit(onSubmit)();
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }}
    >
      <Form layout="vertical" form={form}>
        {contextHolder}

        <Controller
          name="titulo"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="title"
              validateStatus={errors.titulo ? "error" : "success"}
              help={errors.titulo && errors.titulo.message}
              label="Título"
            >
              <Select
                options={bannerCategoryOptions}
                onChange={(e) => onChange(e)}
                id="title"
              />
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
              label="Ordem"
            >
              <Input
                placeholder="ex: 2"
                id="ordem"
                type="number"
                size="large"
                {...field}
              />
            </Form.Item>
          )}
        />

        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorPrimary: colors.primaryPurple,
              },
            },
          }}
        >
          <Controller
            name="imagem"
            control={control}
            render={({ field: { onChange } }) => (
              <Form.Item
                name="src"
                validateStatus={errors.imagem ? "error" : "success"}
                help={errors.imagem && errors.imagem.message}
                label="Imagem"
              >
                <Dragger
                  onChange={(file) => onChange(file.fileList)}
                  style={{
                    background: "#FAF3F8",
                    borderColor: "#B475A5",
                  }}
                  listType="picture"
                  {...props}
                >
                  <Flex align="center" vertical>
                    <p>
                      <FiUpload color={colors.primaryPurple} size={25} />
                    </p>

                    <p className="ant-upload-drag-icon"></p>
                    <p className="ant-upload-text">
                      Faça o upload do banner
                    </p>
                    <p className="ant-upload-hint">
                      insira somente arquivos .jpeg, .png ou .jpg
                    </p>
                  </Flex>
                </Dragger>
              </Form.Item>
            )}
          />
        </ConfigProvider>
      </Form>
    </Modal>
  );
};

export default BannerRegisterModal;
