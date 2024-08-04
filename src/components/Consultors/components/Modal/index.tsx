import { Flex, Form, Typography } from "antd"
import { UserCredentials } from "../../../../@types/UserData/UserData"
import { SelectLabel } from "../../../shared/Input/Select/SelectLabel"
import Select from "react-select"
import { Button } from "../../../shared/Button"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { buildStatus } from "../../../../functions/buildStatus"
import { useMutation } from "@tanstack/react-query"
import { api } from "../../../../service/connection"
import { getHeaders } from "../../../../service/getHeaders"
import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction"

const {Title} = Typography

type StatusModalProps = {
    data:UserCredentials,
    handleClose: ()=>void
}


export const StatusModal = ({data,handleClose}:StatusModalProps) => {

    const selectOps = [
        {
            value: 1,
            label: <SelectLabel onBold="Mudar para: " afterBold={buildStatus('isAtivo',data, false)} />
        },
        {
            value: 2,
            label: <SelectLabel onBold="Mudar para: " afterBold={buildStatus('Em aprovação',data, false)} />
        },
        {
            value: 3,
            label: <SelectLabel onBold="Mudar para: " afterBold={buildStatus('Inativo',data, false)} />
        },
    ]

    
    const statusSchema = z.object({
        status:z.number({required_error: 'selecione um status!'}).min(1, 'O status é necessário para atualizar o consultor!')
    })

    
    type StatusData = z.infer<typeof statusSchema>

    const {control, handleSubmit, formState:{errors}} = useForm<StatusData>({
        resolver: zodResolver(statusSchema),
        mode: 'all',
        criteriaMode: 'all'
    });

    const {success,error,contextHolder} = useMessageAction();
    
    const updateStatus = useMutation({
        mutationFn: async (statusData:StatusData)=> {

            const headers = getHeaders();

            const body = {
                opt: statusData.status
            }

            const req = await api.patch(`/consultores/${data.id}`,body,{
                headers
            })

            return req.data;

        },  
        onSuccess:(res)=> {

            success(res.success)
            setTimeout(()=> {
                window.location.reload()
            },1000)
            
        },
        onError:(err:any)=> {
            
            error(err.response.data.error)
            
        },
    })


    const onSubmit = (statusData:StatusData) => {

        updateStatus.mutate(statusData)
        
    }


    return (
        <Form
            onFinish={handleSubmit(onSubmit)}
        >   

                {contextHolder}


                <Title level={4} className="text-purple-dark">
                    Selecione o tipo de status
                </Title>
                

                <Controller
                    rules={{required:true}}
                    control={control}
                    name="status"
                    render={({field})=> (

                        <Form.Item
                            name={"status"}
                            validateStatus={errors.status ? 'error' : 'success'}
                            help={errors.status && errors.status.message}
                            hasFeedback
                        >

                            <Select
                                theme={theme => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                    ...theme.colors,
                                    text: 'orangered',
                                    primary25: '#dedede',
                                    primary: '#F7ECF4',
                                    },
                                
                                })}
                                placeholder={"selecione"}
                                options={selectOps}
                                onChange={(op)=>field.onChange(op?.value)}
                                
                            />

                        </Form.Item>
                    )}
                /> 
                
                <Flex className="mt-5" gap={10} justify="end">

                    <Button.Root onClick={handleClose}  className="bg-white border border-brand-purple text-brand-purple">

                        <Button.Content content="Cancelar" />

                    </Button.Root>

                    <Button.Root htmlType="submit">

                        <Button.Content content="Atualizar" />

                    </Button.Root>

                </Flex>
    
        </Form>
        
    )
}