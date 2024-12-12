import { Button, Form } from "antd";
import {
	AddressDataForm,
	type ProductWithQuantity,
} from "./util/addressdata-form";
import { useMessageAction } from "../../hooks/useMessageAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "../../util/userRole";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/connection";
import { PessoalDataFormApp } from "./pessoal-data";
import { useProductsData } from "../../hooks/products/useProductsData";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsList from "./util/products-list";
import type { ProductResponseFromApi } from "../../@types/product";
import { z } from "zod";
import Api from "../../service/api";

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
	cargo_id?: number;
	valorfrete?: number;
};

const UserProductsForm = () => {
	const { success, error, contextHolder } = useMessageAction();
	const [productsWithQuantities, setProductsWithQuantities] = useState<
		ProductResponseFromApi[]
	>([]);
	const [productsWithQuantitiesAddress, setProductsWithQuantitiesAddress] =
		useState<ProductWithQuantity[]>([]);
	const [searchParams] = useSearchParams();
	const [freteCalculate, setFreteCalculate] = useState<any[]>([]);
	const [selectedShipping, setSelectedShipping] = useState<string | null>(null);

	const [link, setLink] = useState("");

	const { getProductsById } = useProductsData();

	const produtos = searchParams.get("produtos");
	const total = searchParams.get("total") ?? "";
	const quantidades = searchParams.get("quantidades");
	const valores = searchParams.get("valores");

	const produtosArray = produtos ? produtos.split(",").map(Number) : [];
	const valoresArray = valores ? valores.split(",").map(Number) : [];
	const quantidadesArray = quantidades
		? quantidades.split(",").map(Number)
		: [];

	const userSchema = z.object({
		cep: z.string(),
		rua: z.string(),
		cidade: z.string(),
		numero: z.string(),
		complemento: z.string(),
		bairro: z.string(),
		estado: z.string(),
		telefone: z.string(),
		nomecliente: z.string(),
		emailcliente: z.string(),
		cpfcliente: z.string(),
	});

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
			cep: "",
			rua: "",
			cidade: "",
			numero: "",
			complemento: "",
			bairro: "",
			estado: "",
			telefone: "",
			nomecliente: "",
			emailcliente: "",
			cpfcliente: "",
		},
	});

	const handleFreteCalculate = (data: any[]) => {
		setFreteCalculate(data);
	};

	const handleShippingOption = (option: string, price: number) => {
		setSelectedShipping(option);
		setValue("valorfrete", price);
	};

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
					setProductsWithQuantitiesAddress(productsWithQty);
				} catch (error) {
					console.error("Erro ao buscar dados dos produtos:", error);
				}
			}
		};

		fetchData();
	}, []);

	const submitOrder = useMutation({
		mutationFn: async (data: any) => {
			console.log("DATATATATA", data);
			const payload = {
				produtos_ids: productsWithQuantities.map((product) => ({
					id: product.id,
					quantidade: product.quantity,
				})),

				valorfrete: selectedShipping
					? freteCalculate.find((frete) => frete.name === selectedShipping)
							?.price
					: 0,
				rua: data.rua,
				numero: data.numero,
				bairro: data.bairro,
				cep: data.cep,
				cidade: data.cidade,
				estado: data.estado,
				complemento: data.complemento,
				formaenvio: selectedShipping || "Retirar na Loja",
				telefone: data.telefone,
				consultor_id: 11,
				nomecliente: data.nomecliente,
				emailcliente: data.emailcliente,
				cpfcliente: data.cpfcliente,
			};
			console.log(payload.produtos_ids);

			console.log("payload", payload);

			const response = await api.post(Api.pedidoWeb, payload);

			console.log;

			setLink(response.data.link);

			return response.data;
		},
		onSuccess: () => {
			success("Pedido criado com sucesso!");

			onReset();
		},
		onError: (err: any) => {
			error(err.response.data.error);
		},
	});

	useEffect(() => {
		if (link) {
			console.log("link", link);
			window.location.href = link;
		}
	}, [link]);

	const onSubmit = (data: any) => {
		submitOrder.mutate(data);
	};

	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
		reset({ cargo_id: UserRole.ADMIN });
	};

	console.log(
		"product format antes de ir pro address componente: ",
		productsWithQuantitiesAddress,
	);

	return (
		<div className="flex flex-col-reverse md:flex-row  max-w-6xl mx-auto gap-8 p-12">
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

					<AddressDataForm
						errors={errors}
						setValue={setValue}
						control={control}
						register={register}
						getValues={getValues}
						reset={reset}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						setFreteCalculate={handleFreteCalculate}
						product={productsWithQuantitiesAddress}
					/>
					<Form.Item>
						<div className="flex flex-col md:flex-row gap-4">
							<div
								className={`border-2 p-4 rounded-md text-center cursor-pointer ${
									selectedShipping === "Retirar na Loja"
										? "border-[#C882B7] bg-[#ecd6e6] text-[#C882B7]"
										: "border-gray-300 bg-white text-gray-600 hover:border-gray-500"
								}`}
								onClick={() => handleShippingOption("Retirar na Loja", 0)}
							>
								<span className="font-semibold">Retirar na Loja</span>
								<span className="font-semibold">Frete: R$0</span>
							</div>

							{freteCalculate
								?.filter((frete) => ["PAC", "SEDEX"].includes(frete.name))
								.map((frete) => (
									<div
										key={frete.name}
										className={`border-2 p-4 rounded-md flex items-center justify-center text-center cursor-pointer ${
											selectedShipping === frete.name
												? "border-[#C882B7] bg-[#ecd6e6] text-[#C882B7]"
												: "border-gray-300 bg-white text-gray-600 hover:border-gray-500"
										}`}
										onClick={() =>
											handleShippingOption(frete.name, frete.price)
										}
									>
										<span className="font-semibold">{frete.name}</span>
										<span className="font-semibold">
											{Number(frete.price).toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</span>
									</div>
								))}
						</div>
					</Form.Item>

					<div className="flex gap-2 mt-10 pb-12">
						<Button
							htmlType="submit"
							size="large"
							onClick={handleSubmit(onSubmit)}
							aria-label="submit"
							className="w-1/3 text-xs md:text-base"
						>
							Enviar
						</Button>
						<Button
							htmlType="reset"
							className="w-1/3 text-xs md:text-base bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
							onClick={onReset}
							aria-label="reset"
							size="large"
						>
							Cancelar
						</Button>
					</div>
				</Form>
			</div>
			<div className="w-full md:w-2/3">
				<ProductsList
					valores={valoresArray}
					products={productsWithQuantities}
					total={total}
				/>
			</div>
		</div>
	);
};

export default UserProductsForm;
