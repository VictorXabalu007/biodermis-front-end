import { Empty, Flex, Image, Skeleton, Typography } from "antd";
import { capitalizeFirstLetter } from "../../functions/Capitalizer/capitalizeFirstLetter";
import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Paragraph from "antd/es/typography/Paragraph";
import { Text } from "../shared/Typography/typography-text";
import { buildDeliveryStatus } from "./functions/buildDeliveryStatus";
import { buildPaymentStatus } from "./functions/buildPaymentStatus";
import { useEffect, useState } from "react";
import { useProductsData } from "../../hooks/products/useProductsData";
import Title from "../shared/Typography/typography-title";
import { productFallback } from "../../util/projectImage";

export const RequestViewModal = ({ requests }: { requests: Requests }) => {
	const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

	const { isLoading, products } = useProductsData();

	useEffect(() => {
		if (products) {
			const currents = products.filter((p) =>
				requests.produtos_ids.find((r) => r.id === p.id),
			);
			setCurrentProducts(currents);
		}
	}, [products]);

	const data = [
		{
			title: "Data de pagamento",
			label: requests.datapedido,
		},
		{
			title: "",
			label: (
				<Flex
					className="flex flex-col self-end"
					gap={10}
					wrap="wrap"
					align="flex-start"
				>
					<Text>
						<strong>Nome do Comprador: </strong>
						<span title={requests.nomecliente || "Sem nome do comprador"}>
							{requests.nomecliente || "Sem nome do comprador"}
						</span>
						s
					</Text>

					<Text>
						<strong>Email: </strong>
						<span title={requests.emailcliente || "Sem email disponível"}>
							{requests.emailcliente || "Sem email disponível"}
						</span>
					</Text>

					<Text>
						<strong>CPF: </strong>
						<span title={requests.cpfcliente || "Sem CPF disponível"}>
							{requests.cpfcliente || "Sem CPF disponível"}
						</span>
					</Text>

					<Text>
						<strong>Telefone: </strong>
						<span title={requests.telefone || "Sem telefone disponível"}>
							{requests.telefone || "Sem telefone disponível"}
						</span>
					</Text>
				</Flex>
			),
		},

		{
			title: "Status do pagamento:",
			label: buildPaymentStatus(requests.statuspag),
		},
		{
			title: "Status de entrega",
			label: (
				<Flex gap={10} justify="flex-start">
					<div>
						{buildDeliveryStatus({
							status: requests.statusentrega,
							request: requests,
						})}
					</div>

					{!requests.codigorastreio ? (
						<Text className="text-[12px] text-brand-purple">
							Sem código de rastreio até o momento
						</Text>
					) : (
						<div className="flex text-start w-full justfy-start items-center gap-2">
							<Paragraph
								disabled={!requests.codigorastreio}
								className="flex text-[12px] items-center text-brand-purple"
								copyable={{
									icon: [
										<IoCopyOutline
											className="text-brand-purple"
											key={"copy-icon"}
										/>,

										<FaCheck key="copied-icon" />,
									],
									tooltips: ["Copiar", "Código copiada"],
									text: requests.codigorastreio || "sem código no momento",
								}}
							>
								Copiar Código de rastreio
							</Paragraph>
						</div>
					)}
				</Flex>
			),
		},
		{
			title: "",
			label: (
				<Flex style={{ maxWidth: "300px" }} gap={5} wrap>
					<Text strong>Endereço de entrega: </Text>
					<Text>{requests.estado}</Text>
					<Text>{requests.cidade}</Text>
					<Text>{requests.rua}</Text>
					<Text>{requests.bairro}</Text>
					<Text>{requests.complemento}</Text>
					<Text>{requests.numero}</Text>
				</Flex>
			),
		},
		{
			title: "compras/venda: ",
			label: requests.modelo,
		},
		{
			title: "Valor do frete: ",
			label: requests.valorfrete || "Valor do frete não disponível no momento",
		},
		{
			title: "Preço total do pedido:",
			label: isNaN(parseInt(requests.valor))
				? "Valor total não definido"
				: requests.valor,
		},
		{
			title: "Forma de pagamento:",
			label: requests.formapag_id || "Não definida no momento",
		},
		{
			title: "Forma de envio: ",
			label: requests.formaenvio || " indisponível no momento",
		},
	];

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<Flex align="center" justify="center" vertical>
			<Flex
				justify="flex-start"
				className="my-5 w-full"
				gap={15}
				align="center"
			>
				<Typography.Title className="m-0" level={4}>
					{capitalizeFirstLetter(requests.modelo)}
				</Typography.Title>

				<Text strong>{requests.id}º Pedido</Text>
			</Flex>

			{currentProducts && currentProducts.length > 0 ? (
				currentProducts.map((p) => (
					<Flex key={p.id} className="flex mt-2 w-full justify-between gap-2">
						<Flex gap={15}>
							<Image
								width={145}
								src={p.imagePath}
								fallback={productFallback}
								alt={p.nome}
								style={{
									borderRadius: "4px",
									objectFit: "cover",
								}}
								preview={false}
							/>
							<div className="flex flex-col text-start gap-3">
								<Title className="text-[16px] font-semibold">
									{`#${p.id < 10 ? "0" + p.id : p.id}Pedido`}
								</Title>
								<Text ellipsis={{ tooltip: p.nome }} className="w-[200px] mt-1">
									Produto: <span className="font-semibold">{p.nome}</span>
								</Text>
								<Text>
									Quant:{" "}
									<span className="font-semibold">
										{
											requests.produtos_ids.find((r) => r.id === p.id)
												?.quantidade
										}
									</span>
								</Text>
							</div>
						</Flex>

						<div>
							<Text className="mt-1 text-xl font-medium text-purple-solid-500">
								<NumericFormatter value={parseFloat(p.valorvenda)} />
							</Text>
						</div>
					</Flex>
				))
			) : (
				<Flex gap={10}>
					<Empty description="Ops, parece que as imagens dos produtos foram deletadas ):" />
				</Flex>
			)}

			<Flex className="my-5 w-full" gap={15} vertical>
				{data.map((item) => {
					return (
						<Flex vertical key={item.title} gap={50}>
							<Flex gap={5}>
								<Text strong>{item.title}</Text>

								<Text className="text-black font-[400]">
									{Number(item.label) ? (
										//@ts-ignore
										<NumericFormatter value={parseFloat(item.label)} />
									) : (
										<>{item.label}</>
									)}
								</Text>
							</Flex>

							<hr />
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
};
