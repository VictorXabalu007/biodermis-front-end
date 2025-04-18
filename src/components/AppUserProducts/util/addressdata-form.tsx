import { Flex, Form, Input } from "antd";
import { SubHeader } from "../../shared/SubHeader/sub-header";
import { colors } from "../../../theme/colors";
import {
	Controller,
	type UseFormHandleSubmit,
	type Control,
	type FieldErrors,
	type FieldValues,
	type UseFormGetValues,
	type UseFormRegister,
	type UseFormReset,
	type UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import type { ProductResponseFromApi } from "../../../@types/product";
import { api } from "../../../service/connection";
import Api from "../../../service/api";

export type ProductWithQuantity = {
	product: ProductResponseFromApi;
	quantity: number;
};

type AddressFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>;
	control: Control<T>;
	register: UseFormRegister<T>;
	getValues: UseFormGetValues<T>;
	reset: UseFormReset<T>;
	setFreteCalculate: (data: any[]) => void;
	setValue: UseFormSetValue<T>;
	product: ProductWithQuantity[];
	handleSubmit: UseFormHandleSubmit<T>;
	onSubmit: (data: T) => void;
};

type UserData = {
	cep: string;
	rua: string;
	cidade: string;
	numero: string;
	complemento: string;
	bairro: string;
	estado: string;
	telefone: string;
	nomecliente: string;
	emailcliente: string;
	cpfcliente: string;
};

export const AddressDataForm = ({
	errors,
	control,
	setValue,
	getValues,
	register,
	reset,
	handleSubmit,
	product,
	setFreteCalculate,
	onSubmit,
}: AddressFieldProps<UserData>) => {
	const [loadingCep, setLoadingCep] = useState(false);

	const [cep, setCep] = useState<string>("");

	const featchCalculateShipping = async () => {
		try {
			const payload = {
				zipCodeAdress: cep,
				productsData: product,
			};

			// Fazer a chamada ao endpoint
			const response = await api.post(Api.calcularFrete, payload);
			setFreteCalculate(response.data);
		} catch (error) {
			console.error("Erro ao calcular frete:", error);
			setFreteCalculate([]);
		}
	};

	useEffect(() => {
		if (cep.length === 8) {
			featchCalculateShipping();
		}
	}, [cep, product]);

	const handleCepChange = async (value: string) => {
		const numericCep = value.replace(/\D/g, "");

		if (numericCep.length === 8) {
			setCep(numericCep);
			setLoadingCep(true);
			try {
				const response = await fetch(
					`https://viacep.com.br/ws/${numericCep}/json/`,
				);
				const data = await response.json();

				if (data.erro) {
					console.error("CEP não encontrado");
					return;
				}

				reset({
					...getValues(),
					rua: data.logradouro || "",
					bairro: data.bairro || "",
					cidade: data.localidade || "",
					estado: data.uf || "",
				});
			} catch (error) {
				console.error("Erro ao buscar CEP:", error);
			} finally {
				setLoadingCep(false);
			}
		}
	};

	const [form] = Form.useForm();

	return (
		<Flex vertical className="w-full">
			<SubHeader
				heading="Endereço"
				hasLink={false}
				style={{
					color: colors.primaryPurple,
				}}
				subtext="Informe os dados de endereço do novo usuário"
			/>

			<Form
				form={form}
				onFinish={handleSubmit(onSubmit)}
				layout="vertical"
				className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
			>
				<Form.Item
					label="CEP"
					validateStatus={errors.cep ? "error" : ""}
					help={errors.cep?.message}
				>
					<Controller
						name="cep"
						control={control}
						render={({ field }) => (
							<Input
								className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
								{...field}
								onChange={(e) => {
									field.onChange(e);
									handleCepChange(e.target.value);
								}}
							/>
						)}
					/>
					{loadingCep && <div>Carregando dados do CEP...</div>}
				</Form.Item>

				<Form.Item
					label="Rua"
					validateStatus={errors.rua ? "error" : ""}
					help={errors.rua?.message}
				>
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						{...register("rua")}
						onChange={(e) =>
							setValue("rua", e.target.value, { shouldValidate: true })
						}
					/>
				</Form.Item>

				<Form.Item
					label="Bairro"
					validateStatus={errors.bairro ? "error" : ""}
					help={errors.bairro?.message}
				>
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						{...register("bairro")}
						onChange={(e) =>
							setValue("bairro", e.target.value, { shouldValidate: true })
						}
					/>
				</Form.Item>

				<Form.Item
					label="Cidade"
					validateStatus={errors.cidade ? "error" : ""}
					help={errors.cidade?.message}
				>
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						{...register("cidade")}
						onChange={(e) =>
							setValue("cidade", e.target.value, { shouldValidate: true })
						}
					/>
				</Form.Item>

				<Form.Item
					label="Estado"
					validateStatus={errors.estado ? "error" : ""}
					help={errors.estado?.message}
				>
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						{...register("estado")}
						onChange={(e) =>
							setValue("estado", e.target.value, { shouldValidate: true })
						}
					/>
				</Form.Item>

				<Form.Item
					label="Número"
					validateStatus={errors.numero ? "error" : ""}
					help={errors.numero?.message}
				>
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						onChange={(e) =>
							setValue("numero", e.target.value, { shouldValidate: true })
						}
					/>
				</Form.Item>

				<Form.Item label="Complemento">
					<input
						className="w-full border border-zinc-300 outline-none px-2.5 rounded-md py-1 focus:border-fuchsia-400 "
						onChange={(e) =>
							setValue("complemento", e.target.value, {
								shouldValidate: true,
							})
						}
					/>
				</Form.Item>
			</Form>
		</Flex>
	);
};
