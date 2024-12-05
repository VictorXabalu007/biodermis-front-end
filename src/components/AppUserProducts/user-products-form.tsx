import { Button, Checkbox, Form } from "antd";
import { AddressDataForm } from "./util/addressdata-form";
import { useMessageAction } from "../../hooks/useMessageAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type UserData,
	userSchema,
} from "../../validations/registerUserValidation";
import { UserRole } from "../../util/userRole";
import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import { getTypeOfPixKey } from "../../functions/Getters/getTypeOfPixKey";
import { PessoalDataFormApp } from "./pessoal-data";
import { useProductsData } from "../../hooks/products/useProductsData";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsList from "./util/products-list";
import type { ProductResponseFromApi } from "../../@types/product";

const UserProductsForm = () => {
	const { success, error, contextHolder } = useMessageAction();
	const [productsWithQuantities, setProductsWithQuantities] = useState<
		ProductResponseFromApi[]
	>([]);
	const [searchParams] = useSearchParams();
	const [isPickupInStore, setIsPickupInStore] = useState(false);

	const { getProductsById } = useProductsData();

	const produtos = searchParams.get("produtos");
	const total = searchParams.get("total");
	const quantidades = searchParams.get("quantidades");

	const produtosArray = produtos ? produtos.split(",").map(Number) : [];
	const quantidadesArray = quantidades
		? quantidades.split(",").map(Number)
		: [];

	const {
		handleSubmit,
		formState: { errors },
		reset,
		control,
		register,
		getValues,
		setValue,
	} = useForm<UserData>({
		resolver: zodResolver(userSchema),
		criteriaMode: "all",
		mode: "onChange",
		defaultValues: {
			cargo_id: UserRole.ADMIN,
			certificado: undefined,
			cep: "",
			rua: "",
			cidade: "",
			numero: "",
			complemento: "",
			bairro: "",
			estado: "",
		},
	});

	// http://localhost:5173/teste?produtos=293,202,180&quantidades=1,5,3&total=1355,00&totalProdutos=9&User=11

	useEffect(() => {
		const fetchData = async () => {
			if (produtosArray.length > 0) {
				try {
					const productsData = await getProductsById(produtosArray);
					const productsWithQty = productsData.map(
						(product: any, index: number) => ({
							...product,
							quantity: quantidadesArray[index] || 0,
						}),
					);
					setProductsWithQuantities(productsWithQty);
				} catch (error) {
					console.error("Erro ao buscar dados dos produtos:", error);
				}
			}
		};

		fetchData();
	}, []);

	const postAddress = useMutation({
		mutationFn: async ({ data, id }: { data: UserData; id: number }) => {
			const body = {
				rua: data.rua,
				bairro: data.bairro,
				estado: data.estado,
				cep: data.cep,
				cidade: data.cidade,
				usuario_id: id,
				numero: data.numero,
				complemento: data.complemento,
			};

			const headers = getHeaders();

			const req = await api.post("/endereco", body, {
				headers,
			});

			return req.data;
		},
		onSuccess: () => {
			success("Usuário cadastrado com sucesso!");
			onReset();
		},
		onError: (err: any) => {
			error(err.response.data.error);
		},
	});

	const postCertified = useMutation({
		mutationFn: async (certified: any) => {
			const formData = new FormData();

			formData.append("file", certified.originFileObj as File);

			const headers = {
				...getHeaders(),
				"Content-Type": "multipart/form-data",
			};

			await api.post("/perfil/certificado", formData, {
				headers,
			});
		},
		onSuccess: () => console.log("Sucesso ao registrar certificado!"),
		onError: (err) => console.log("Erro ao registrar certificado: ", err),
	});

	const postUser = useMutation({
		mutationFn: async (data: UserData) => {
			const headers = getHeaders();

			const body = {
				nome: data.nome,
				cpf: data.cpf,
				email: data.email,
				telefone: data.telefone,
				agencia: data.bankData.agencia,
				conta: data.bankData.conta,
				pix: data.bankData.pix,
				senha: data.senha,
				cargo_id: data.cargo_id,
				banco: data.bankData.banco,
				tipochave: getTypeOfPixKey(data.bankData.pix),
			};

			const req = await api.post("/usuarios", body, {
				headers,
			});

			return req.data;
		},

		onSuccess: (res, context) => {
			postAddress.mutate({ data: context, id: res.id });

			if (context.certificado) {
				postCertified.mutate(context.certificado);
			}
		},

		onError: (err: any) => {
			error(err.response.data.error || "Erro ao registrar usuário!");
		},
	});

	const onSubmit = (data: UserData) => {
		postUser.mutate(data);
	};

	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
		reset({ cargo_id: UserRole.ADMIN });
	};

	return (
		<div className="flex max-w-6xl mx-auto gap-8 p-12">
			<div className="w-2/3">
				{contextHolder}
				<Form
					form={form}
					onFinish={handleSubmit((data) => {
						onSubmit(data);
					})}
					layout="vertical"
				>
					<PessoalDataFormApp errors={errors} control={control} />
					<Form.Item>
						<Checkbox
							checked={isPickupInStore}
							onChange={(e) => setIsPickupInStore(e.target.checked)}
						>
							Retirar na Loja
						</Checkbox>
					</Form.Item>

					{!isPickupInStore && (
						<AddressDataForm
							errors={errors}
							setValue={setValue}
							control={control}
							register={register}
							getValues={getValues}
							reset={reset}
							handleSubmit={handleSubmit}
							onSubmit={onSubmit}
							product={productsWithQuantities}
						/>
					)}
					<div className="flex gap-2 mt-10 pb-12">
						<Button
							htmlType="submit"
							size="large"
							onClick={handleSubmit(onSubmit)}
							aria-label="submit"
							className="w-1/3"
						>
							Enviar
						</Button>
						<Button
							htmlType="reset"
							className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
							onClick={onReset}
							aria-label="reset"
							size="large"
						>
							Cancelar
						</Button>
					</div>
				</Form>
			</div>
			<div className="w-2/3">
				<ProductsList product={productsWithQuantities} total={total} />
			</div>
		</div>
	);
};

export default UserProductsForm;
