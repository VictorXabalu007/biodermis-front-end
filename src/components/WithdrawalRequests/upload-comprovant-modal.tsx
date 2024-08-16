import { UserImage } from "../shared/Image/user-image";
import InputMoney from "../shared/Input/input-money";
import {
  Form,
  Col,
  Flex,
  Row,
  Typography,
  Upload,
  Skeleton,
  Empty,
  Input,
  Select,
  ConfigProvider,
} from "antd";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { UploadProps } from "antd/lib";
import { Control, Controller, FieldErrors } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { WithDrawal } from "./util/withdrawalData";
import { useConsultorData } from "../Consultors/hooks/useConsultorData";
import { RegisterPixProofType } from "./hooks/useComprovantRegister";
import { UserCredentials } from "../../@types/UserData/UserData";
import { colors } from "../../theme/colors";
import { FiUpload } from "react-icons/fi";

const { Paragraph } = Typography;
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  accept: ".pdf",
  beforeUpload() {
    return false;
  },
};

type WithDrawalModalProps = {
  withdraw: WithDrawal;
  errors:FieldErrors<RegisterPixProofType>;
  control:Control<RegisterPixProofType>
};

export const UploadComprovantModal = ({
  withdraw,
  errors,
  control
}: WithDrawalModalProps) => {


  const { getConsultorImageById, getConsultorById, isLoading } =
    useConsultorData();

  const [currentConsultor, setCurrentConsultor] =
    useState<UserCredentials | null>(null);

  const renderField = (
    fieldName: keyof UserCredentials,
    label: React.ReactNode,
    fieldType?: "text" | "number" | "select" | "money"
  ) => {
    switch (fieldType) {
      case "number":
        return (
          <Form.Item label={label}>
            <Input
              type="number"
              value={
                currentConsultor?.[fieldName as keyof UserCredentials] || ""
              }
              readOnly
            />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item label={label}>
            <Select
              value={
                currentConsultor?.[fieldName as keyof UserCredentials] || []
              }
              mode="multiple"
              disabled
            />
          </Form.Item>
        );
      case "money":
        return (
          <Form.Item label={label}>
            <InputMoney
              isFlat={false}
              value={
                parseFloat(
                  currentConsultor?.[
                    fieldName as keyof UserCredentials
                  ] as string
                ) || 0
              }
              prefix="R$"
              readOnly
              onChange={() => {}}
            />
          </Form.Item>
        );
      default:
        return (
          <Form.Item label={label}>
            <Input
              type="text"
              value={
                currentConsultor?.[fieldName as keyof UserCredentials] || ""
              }
              readOnly
            />
          </Form.Item>
        );
    }
  };

  const current = getConsultorById(withdraw.consultor_id);

  useEffect(() => {
    if (current) {
      setCurrentConsultor(current);
    }
  }, [isLoading, current]);

  return (

    <ConfigProvider
        theme={{
            components:{
                Input:{
                    colorPrimary:colors.primaryPurple
                }
            }
        }}
    >

        <Flex vertical className="w-full">
        {isLoading ? (
            <>
            <Skeleton />
            </>
        ) : (
            <>
            {currentConsultor !== null ? (
                <Flex vertical>
                <UserImage
                    className="my-2"
                    image={getConsultorImageById(withdraw.consultor_id)}
                />

             
                    <Row gutter={[32, 32]}>
                    <Col lg={12}>{renderField("nome", "Nome", "text")}</Col>
                    <Col lg={12}>
                        <Flex vertical>
                        {renderField(
                            "pix",
                            <Flex
                            className="w-full"
                            justify="space-between"
                            gap={20}
                            align="center"
                            >
                            Chave pix
                            <Paragraph
                                className="text-brand-purple mb-0"
                                style={{
                                    fontSize:'12px'
                                }}
                                copyable={{
                                icon: [
                                    <IoCopyOutline
                                    className="text-brand-purple"
                                    key={"copy-icon"}
                                    />,

                                    <FaCheck key="copied-icon" />,
                                ],
                                tooltips: ["Copiar", "Chave copiada"],
                                text: currentConsultor?.pix || "",
                                }}
                            >
                                Copiar chave pix
                            </Paragraph>
                            </Flex>,
                            "text"
                        )}
                        </Flex>
                    </Col>
                    <Col lg={12}>
                        <Form.Item label="Valor solicitado">
                        <InputMoney
                            onChange={() => null}
                            value={parseFloat(withdraw.valorsaque)}
                            prefix={"R$"}
                            id="solicitedValue"
                            readOnly
                            isFlat={false}
                        />
                        </Form.Item>
                    </Col>
                    <Col lg={12}>{renderField("banco", "Banco", "text")}</Col>
                    <Col lg={12}>{renderField("agencia", "Agência", "text")}</Col>
                    <Col lg={12}>{renderField("conta", "Conta", "text")}</Col>

                    <Col lg={24}>
                        <Controller
                        control={control}
                        name="pixProof"
                        render={({ field: { onChange } }) => (
                            <Form.Item
                            name="pixProof"
                            validateStatus={errors.pixProof ? "error" : "success"}
                            help={errors.pixProof && errors.pixProof.message}
                            hasFeedback
                            >
                            <Dragger
                                style={{
                                background: "#FAF3F8",
                                borderColor: "#B475A5",
                                padding: "1rem",
                                }}
                                listType="picture"
                                onChange={(info) => {
                            
                                    onChange(info.fileList);
                                }}
                                {...props}
                            >   
                            <Flex align="center" vertical>

                                <p>
                                <FiUpload color={colors.primaryPurple} size={25} />
                                </p>
                    
                                <p className="ant-upload-drag-icon"></p>
                                <p className="ant-upload-text">
                                Faça o upload do comprovante do pagamento
                                </p>
                                <p className="ant-upload-hint">
                                Clique ou arraste o arquivo aqui
                                </p>
                            </Flex>
                              
                                    
                            </Dragger>
                            </Form.Item>
                        )}
                        />
                    </Col>
                    </Row>
           
                </Flex>
            ) : (
                <>
                <Empty description={"Nenhum consultor foi encontrado"} />
                </>
            )}
            </>
        )}
        </Flex>


    </ConfigProvider>
  );
};
