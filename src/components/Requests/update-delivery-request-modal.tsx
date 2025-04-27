
import dayjs from "dayjs";
import { InputDatePicker } from "../shared/Input/date-picker";
import { ConfigProvider, Flex, Input, Skeleton, Typography } from "antd";
import { Form } from "antd/lib";
import { Control, Controller, FieldErrors, } from "react-hook-form";
import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { Text } from "../shared/Typography/typography-text";
import { colors } from "../../theme/colors";
import { useEffect, useState } from "react";
import { UpdateRequestType } from "../../validations/updateRequestValidation";
import { useRequestsData } from "../../hooks/orders/useRequestsData";

type RequestEditorProps = {
    requestId: number,
    control: Control<UpdateRequestType>,
    errors: FieldErrors<UpdateRequestType>
}

export const RequestEditor = ({
    requestId,
    control,
    errors
}: RequestEditorProps) => {

    const {
        isLoading,
        data: requests } = useRequestsData();

    const [currentRequest, setCurrentRequest] = useState<Requests>({} as Requests);

    useEffect(() => {
        if (requests) {
            const current = requests.find(r => r.id === requestId);
            if (current) {
                setCurrentRequest(current)
            }
        }
    }, [requests, currentRequest])

    if (isLoading) {
        return <Skeleton />
    }

    return (

        <ConfigProvider theme={{
            components: {
                Input: {
                    colorPrimary: colors.primaryPurple
                }
            }
        }}>






            <div className="px-4">

                <Flex className="flex-col">
                    <div className="mb-10">

                        <Typography.Title level={3}>
                            Adicionar código de envio
                        </Typography.Title>

                    </div>

                    <Flex className="w-full px-10" gap={10} justify="space-between">


                        <Flex vertical align="center" gap={2}>

                            <Typography.Title level={5}>

                                {requestId}

                            </Typography.Title>

                            <Text strong>
                                Código do produto
                            </Text>

                        </Flex>

                        <Flex vertical align="center" gap={2}>

                            <Typography.Title level={4}>

                                {currentRequest.formaenvio}
                            </Typography.Title>

                            <Text strong >
                                Forma de envio
                            </Text>

                        </Flex>

                        <Flex vertical align="center" gap={2}>

                            <Typography.Title level={4}>

                                <NumericFormatter value={parseFloat(currentRequest.valorfrete)} />

                            </Typography.Title>

                            <Text strong>
                                Valor do frente
                            </Text>

                        </Flex>


                    </Flex>
                </Flex>


                <div className="my-3">

                    <div className="my-3">
                        <Text className="text-gray-neutral-600 my-2 font-[600] ">
                            Data de envio
                        </Text>

                        <Controller
                            control={control}
                            name="sendDate"
                            render={({ field: { onChange, value } }) => (

                                <Form.Item
                                    name="sendDate"
                                    validateStatus={errors.sendDate ? 'error' : 'success'}
                                    help={errors.sendDate && errors.sendDate.message}
                                    hasFeedback
                                >
                                    <p className=" sr-only">
                                        {value}
                                    </p>
                                    <InputDatePicker
                                        value={dayjs(dayjs(value))}
                                        onChange={(_, dateString) => {
                                            console.log({ dateString, _ })
                                            onChange(_.format('MM/DD/YYYY'));
                                        }}
                                    />

                                </Form.Item>


                            )}

                        />
                    </div>

                    <div className="my-3">


                        <Controller
                            name="sendCode"
                            control={control}
                            render={({ field }) => (

                                <Form.Item
                                    name="sendCode"
                                    validateStatus={errors.sendCode ? 'error' : 'success'}
                                    help={errors.sendCode && errors.sendCode.message}
                                    label="Código de envio"
                                >
                                    <Text className=" sr-only">{field.value}</Text>
                                    <Input
                                        placeholder="0000"
                                        size="large"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />



                                </Form.Item>

                            )}

                        />


                    </div>


                </div>


            </div>






        </ConfigProvider>


    );

}