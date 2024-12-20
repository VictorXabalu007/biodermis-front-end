import {
	Page,
	Text,
	View,
	Document,
	Image,
	StyleSheet,
} from "@react-pdf/renderer";
import biodermisLogo from "../assets/small-logo.png";
import { NumericFormatter } from "../components/shared/Formatter/numeric-formatter";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		padding: 0,
		margin: 0,
		display: "flex",
		gap: 0,
	},
	container: {
		display: "flex",
		padding: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		gap: 10,
	},
	titleSection: {
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
	},
	subheaderSection: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	subTitleSection: {
		padding: 20,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		gap: 2,
	},
	subtitle: {
		fontSize: 10,
		marginBottom: 5,
	},
	subtitleText: {
		fontSize: 8,
	},
	section: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 10,
	},
	title: {
		fontSize: 10,
		fontWeight: "bold",
	},
	image: {
		width: 70,
		objectFit: "cover",
	},
	separator: {
		height: "100%",
		width: 2,
		backgroundColor: "black",
		marginVertical: 10,
	},
});

const tableStyles = StyleSheet.create({
	table: {
		display: "flex",
		width: "auto",
		borderColor: "#bfbfbf",
		marginVertical: 10,
		padding: 20,
	},
	tableRow: {
		flexDirection: "row",
	},
	tableCol: {
		width: "25%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bfbfbf",
	},
	tableCellHeader: {
		fontSize: 10,
		fontWeight: "bold",
		padding: 5,
		backgroundColor: "#cccccc",
	},
	tableCell: {
		fontSize: 8,
		padding: 5,
	},
	tableColProduct: {
		width: "60%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bfbfbf",
	},
});

const cardStyles = StyleSheet.create({
	cardContainer: {
		display: "flex",
		padding: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		gap: 10,
	},
	card: {
		border: "1px solid #cccccc",
		flexDirection: "column",
		display: "flex",
		padding: 5,
		gap: 5,
		flex: 1,
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: "bold",
		marginBottom: 6,
	},
	cardText: {
		fontSize: 10,
		paddingLeft: 5,
	},
	totalCard: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
		gap: 2,
	},
	separator: {
		width: "100%",
		height: "2px",
		backgroundColor: "#cccccc",
	},
	blackSeparator: {
		width: "100%",
		marginTop: 5,
		height: "3px",
		backgroundColor: "#000",
	},
	subtotalCard: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	totalContent: {
		fontWeight: "bold",
		fontSize: 12,
	},
});

const footerCardStyles = StyleSheet.create({
	paymentTypeCard: {
		display: "flex",
		flex: 1,
		border: "1px solid #cccccc",
		flexDirection: "column",
	},
	paymentTypeCardTitle: {
		backgroundColor: "#bfbfbf",
		padding: 3,
	},
	title: {
		fontSize: 10,
	},
	subcardContent: {
		display: "flex",
		flexDirection: "column",
		padding: 3,
		gap: 5,
	},
	subcardTitle: {
		fontSize: 9,
		fontWeight: "bold",
		marginBottom: 5,
	},
	subcardText: {
		fontSize: 8,
	},
	separator: {
		width: "100%",
		height: "2px",
		backgroundColor: "#cccccc",
	},
});

type Product = {
	id: number;
	nome: string;
	produto_id: number;
	valorvenda: string;
	valortotal: string;
	valormin: string;
	peso: string;
};

type ProductId = {
	id: number;
	quantidade: number;
};

type DataProps = {
	id: number;
	consultor_id: number;
	cliente_id: number;
	modelo: string;
	produtos: Product[];
	produtos_ids: ProductId[];
	[key: string]: any;
};

type PDFFileProps = {
	data?: DataProps;
};

export const PDFFile = ({ data = {} as DataProps }: PDFFileProps) => {
	const [userType, setUserType] = useState<"consultor" | "cliente" | null>(
		null,
	);
	const [valueSale, setValueSale] = useState<
		{ id: number; nome: string; valor: string; quantidade: number }[]
	>([]);

	useEffect(() => {
		if (data?.consultor_id && data.consultor_id > 1) {
			setUserType("consultor");
		} else if (data?.cliente_id && data.cliente_id > 1) {
			setUserType("cliente");
		}
	}, [data]);

	useEffect(() => {
		if (!userType) return;

		// Realizar verificações e mapeamento de valores
		const mappedValues = data.produtos_ids
			.map((produtoId: ProductId) => {
				// Localizar o produto correspondente
				const produto = data.produtos.find((p) => p.produto_id == produtoId.id);
				if (!produto) return null;
				if (userType === "consultor") {
					if (data.modelo === "venda") {
						return {
							id: produto.id,
							nome: produto.nome,
							valor: produto.valortotal,
							quantidade: produtoId.quantidade,
						};
					}
					if (data.modelo === "abastecimento") {
						return {
							id: produto.id,
							nome: produto.nome,
							valor: produto.valormin,
							quantidade: produtoId.quantidade,
						};
					}
				} else if (userType === "cliente") {
					return {
						id: produto.id,
						nome: produto.nome,
						valor: produto.valorvenda,
						quantidade: produtoId.quantidade,
					};
				}

				return null;
			})
			.filter(
				(
					item,
				): item is {
					id: number;
					nome: string;
					valor: string;
					quantidade: number;
				} => !!item,
			);

		// Atualizar estado com valores válidos
		setValueSale(mappedValues);
	}, [data, userType]);

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.titleSection}>
					<Text style={styles.title}>
						{`#${data.id < 10 ? `0${data.id}` : data.id}Pedido`} - LOJA VIRTUAL
					</Text>
					<Image style={styles.image} src={biodermisLogo} />
				</View>
				<View style={styles.subheaderSection}>
					<View style={styles.subTitleSection}>
						<Text style={styles.subtitle}>Dados do cliente</Text>
						<Text style={styles.subtitleText}>Nome: {data?.nomecliente}</Text>
						<Text style={styles.subtitleText}>Telefone: {data?.telefone}</Text>
						<Text style={styles.subtitleText}>Email: {data?.emailcliente}</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.subTitleSection}>
						<Text style={styles.subtitle}>Informações adicionais</Text>
						<Text style={styles.subtitleText}>CPF: {data?.cpfcliente}</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.subTitleSection}>
						<Text style={styles.subtitle}>Endereço de Entrega</Text>
						<Text style={styles.subtitleText}>CEP: {data.cep}</Text>
						<Text style={styles.subtitleText}>Cidade: {data.cidade}</Text>
						<Text style={styles.subtitleText}>
							Complemento: {data.complemento}l
						</Text>
						<Text style={styles.subtitleText}>Estado: {data.estado}</Text>
					</View>
				</View>

				{/* table */}
				<View style={tableStyles.table}>
					<View style={tableStyles.tableRow}>
						<View style={tableStyles.tableColProduct}>
							<Text style={tableStyles.tableCellHeader}>Produto</Text>
						</View>
						<View style={tableStyles.tableCol}>
							<Text style={tableStyles.tableCellHeader}>Quantidade</Text>
						</View>
						<View style={tableStyles.tableCol}>
							<Text style={tableStyles.tableCellHeader}>Valor venda</Text>
						</View>
						<View style={tableStyles.tableCol}>
							<Text style={tableStyles.tableCellHeader}>Total</Text>
						</View>
					</View>

					<View>
						{data.products.length > 0 ? (
							valueSale.map((p) => {
								// const quantity =
								// 	data.produtos_ids.find((r) => r.id === p.id)?.quantidade ?? 1;

								return (
									<View style={tableStyles.tableRow}>
										<View style={tableStyles.tableColProduct}>
											<Text style={tableStyles.tableCell}>{p.nome}</Text>
										</View>
										<View style={tableStyles.tableCol}>
											<Text style={tableStyles.tableCell}>{p.quantidade}</Text>
										</View>
										<View style={tableStyles.tableCol}>
											<Text style={tableStyles.tableCell}>
												<NumericFormatter value={Number.parseFloat(p.valor)} />
											</Text>
										</View>
										<View style={tableStyles.tableCol}>
											<Text style={tableStyles.tableCell}>
												<NumericFormatter
													value={Number.parseFloat(p.valor) * p.quantidade}
												/>
											</Text>
										</View>
									</View>
								);
							})
						) : (
							<View>
								<Text>Produtos foram apagados ou não encontrados</Text>
							</View>
						)}
					</View>
				</View>

				{/* endtable */}

				{/* card */}
				<View style={cardStyles.cardContainer}>
					<View style={cardStyles.card}>
						<Text style={cardStyles.cardTitle}>Observação Loja virtual</Text>
						<Text style={cardStyles.cardText}>{data.formaPag}</Text>
					</View>

					<View style={cardStyles.totalCard}>
						<View style={cardStyles.subtotalCard}>
							<Text style={cardStyles.cardText}>Subtotal (1)</Text>
							<Text style={cardStyles.cardText}>
								R${" "}
								{isNaN(parseInt(data.valor))
									? "Valor não definido"
									: data.valor}
							</Text>
						</View>

						<View style={cardStyles.separator} />

						<View style={cardStyles.subtotalCard}>
							<Text style={cardStyles.cardText}>Valor do Frete</Text>
							<Text style={cardStyles.cardText}>R$ {data.valorfrete}</Text>
						</View>

						<View style={cardStyles.separator} />

						<View style={cardStyles.blackSeparator} />

						<View style={cardStyles.subtotalCard}>
							<Text style={cardStyles.cardTitle}>Total do Pedido</Text>
							<Text style={cardStyles.totalContent}>
								R${" "}
								{isNaN(parseInt(data.valor))
									? "Valor não definido"
									: (
											parseFloat(data.valor) + parseFloat(data.valorfrete)
										).toFixed(2)}
							</Text>
						</View>
					</View>
				</View>
				{/* endcard */}

				{/* footer */}
				<View style={styles.container}>
					<View style={footerCardStyles.paymentTypeCard}>
						<View style={footerCardStyles.paymentTypeCardTitle}>
							<Text style={footerCardStyles.title}>Forma de Pagamento</Text>
						</View>
						<View style={footerCardStyles.subcardContent}>
							<Text style={footerCardStyles.subcardTitle}>{data.formaPag}</Text>
							<Text style={footerCardStyles.subcardText}>
								R${" "}
								{isNaN(parseInt(data.valor))
									? "valor não definido"
									: data.valor}{" "}
								{data.datapedido}
							</Text>
							<Text style={footerCardStyles.subcardText}>
								Número do comprovante
							</Text>
							<Text style={footerCardStyles.subcardText}>
								{data.mercadopago_id}
							</Text>
						</View>
					</View>
					<View style={footerCardStyles.paymentTypeCard}>
						<View style={footerCardStyles.paymentTypeCardTitle}>
							<Text style={footerCardStyles.title}>Forma de Envio</Text>
						</View>

						<View style={{ padding: 3 }}>
							<Text style={footerCardStyles.subcardTitle}>
								{data.formaenvio
									? data.formaenvio
									: "Forma de envio não disponível"}{" "}
							</Text>
						</View>
						<View style={footerCardStyles.separator} />

						<View style={footerCardStyles.subcardContent}>
							<Text style={footerCardStyles.subcardText}>
								Peso do Pedido:{" "}
								{data.products.reduce(
									(acc: any, p: any) => acc + Number.parseFloat(p.peso),
									0,
								)}{" "}
								gramas
							</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};
