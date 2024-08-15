import { Flex, Form, Modal, ModalProps, Upload } from "antd";
import { FaX } from "react-icons/fa6";
import { useBannerUpdate } from "./hooks/useBannerUpdate";
import { Controller } from "react-hook-form";
import { Input } from "../shared/Input/Input";
import { BannerModalProps } from "./@types/BannerType";
import { UploadProps } from "antd/lib";
import { useState } from "react";
import { colors } from "../../theme/colors";
import { FiUpload } from "react-icons/fi";

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
  ordem: string;
  imagem: string;
  id: number;
};

const BannerEditModal = ({
  open,
  setOpen,
  ordem,
  imagem,
  id,
  ...rest
}: ModalProps & BannerModalProps & CurrentBannerData) => {
  const {
    errors,
    control,
    handleSubmit,
    onSubmit,
    reset,
    contextHolder,
    setValue,
  } = useBannerUpdate({ id });
  const [form] = Form.useForm();

  const onReset = () => {
    setOpen(false);
    form.resetFields();
    reset();
  };

  setValue("ordem", String(ordem));

  const [initialData, setInitialData] = useState({
    order: ordem,
    imagem,
  });

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
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setInitialData({
                      ...initialData,
                      order: e.target.value,
                    });
                    setValue("ordem", e.target.value);
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
                    <p className="ant-upload-text">Faça o upload do banner</p>
                    <p className="ant-upload-hint">
                      insira somente arquivos .jpeg, .png ou .jpg
                    </p>
                  </Flex>
                </Dragger>
              </Input.Root>
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default BannerEditModal;
