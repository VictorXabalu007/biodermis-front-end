import { Button, Flex, Form, Select, Typography } from "antd";
import { SelectLabel } from "../shared/Input/select-label";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildStatus } from "../../functions/buildStatus";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/connection";
import { useMessageAction } from "../../hooks/useMessageAction";
import { getHeaders } from "../../service/getHeaders";

const { Title } = Typography;

type StatusModalProps = {
	data: UserCredentials;
	handleClose: () => void;
};

export const StatusModal = ({ data, handleClose }: StatusModalProps) => {
	const selectOps = [
		{
			value: 1,
			label: (
				<SelectLabel
					onBold="Mudar para: "
					afterBold={buildStatus("ativo", data, false)}
				/>
			),
		},
		{
			value: 2,
			label: (
				<SelectLabel
					onBold="Mudar para: "
					afterBold={buildStatus("em aprovação", data, false)}
				/>
			),
		},
		{
			value: 3,
			label: (
				<SelectLabel
					onBold="Mudar para: "
					afterBold={buildStatus("inativo", data, false)}
				/>
			),
		},
	];

	const statusSchema = z.object({
		status: z
			.number({ required_error: "selecione um status!" })
			.min(1, "O status é necessário para atualizar o consultor!"),
	});

	type StatusData = z.infer<typeof statusSchema>;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<StatusData>({
		resolver: zodResolver(statusSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const { success, error, contextHolder } = useMessageAction();

	const updateStatus = useMutation({
		mutationFn: async (statusData: StatusData) => {
			const body = {
				opt: statusData.status,
			};

			const headers = getHeaders();
			const req = await api.patch(`/consultores/${data.id}`, body, {
				headers,
			});

			return req.data;
		},
		onSuccess: (res) => {
			success(res.success);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
		onError: (err: any) => {
			console.log(err);

			error(err.response.data.error || "Ops, um erro ocorreu!");
		},
	});

	const onSubmit = (statusData: StatusData) => {
		updateStatus.mutate(statusData);
	};

	return (
		<Form onFinish={handleSubmit(onSubmit)}>
			{contextHolder}

			<Title level={4} className="text-purple-dark">
				Selecione o tipo de status
			</Title>

			<Controller
				rules={{ required: true }}
				control={control}
				name="status"
				render={({ field }) => (
					<Form.Item
						name={"status"}
						validateStatus={errors.status ? "error" : "success"}
						help={errors.status && errors.status.message}
						hasFeedback
					>
						<Select
							placeholder={"selecione"}
							options={selectOps}
							onChange={(e) => {
								field.onChange(e);
							}}
						/>
					</Form.Item>
				)}
			/>

			<Flex className="mt-5" gap={10} justify="end">
				<Button onClick={handleClose}>Cancelar</Button>
				<Button htmlType="submit">Atualizar</Button>
			</Flex>
		</Form>
	);
};
