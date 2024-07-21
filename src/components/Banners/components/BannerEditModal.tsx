import { Form, Modal, ModalProps } from "antd"
import { FaX } from "react-icons/fa6"
import { useBannerUpdate } from "../hooks/useBannerUpdate"
import { Controller } from "react-hook-form";
import { Input } from "../../shared/Input/Input";
import { useBannerRegister } from "../hooks/useBannerRegister";
import Select from "../../shared/Input/Select";
import { BannerModalProps } from "../@types/BannerType";



export const BannerEditModal = ({open,setOpen,...rest}:ModalProps & BannerModalProps) => {

    const {errors,control,handleSubmit,onSubmit,reset} = useBannerUpdate();
    const {bannerStatusOptions} = useBannerRegister();
    const [form] = Form.useForm();

    const onReset = () => {
      setOpen(false)
      form.resetFields();
      reset()
    }

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

        <Controller
          name="status"
          control={control}
          render={({ field: { onChange } }) => (
            <Form.Item
              name="Status"
              validateStatus={errors.status ? "error" : "success"}
              help={errors.status && errors.status.message}
              hasFeedback
            >
              <Input.Root className="my-2">
                <Input.Label
                  content="Status"
                  htmlFor="banner"
                  className="text-gray-neutral-600 font-[600]"
                />

                <Select
                    options={bannerStatusOptions} 
                    onChange={(e)=>onChange(e.value)}
                />
              </Input.Root>
            </Form.Item>
          )}
        />


    </Form>


       </Modal>
    )
}