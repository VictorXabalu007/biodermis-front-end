import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Modal } from "antd";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";
import { useRequestsData } from "./useRequestsData";
import { getHeaders } from "../../service/getHeaders";
import ReactPDF from "@react-pdf/renderer";
import { PDFFile } from "../../resources/PDFFile";
import { saveAs } from "file-saver";
import { useUserData } from "../useUserData";
import { getFormaPag } from "../../functions/Getters/getFormaPag";
import { useConsultorData } from "../users/useConsultorData";
import { useProductsData } from "../products/useProductsData";
// import Api from "../../service/api";

export const useRequestTable = () => {
	const { consultor } = useConsultorData();
	const { data, setData, isLoading } = useRequestsData();

	const { contextHolder, success, error } = useMessageAction();

	const [requestsData, setRequestsData] = useState<Requests[]>([]);

	useEffect(() => {
		if (data) {
			setRequestsData(data);
		}
	}, [data, consultor]);

	const deleteOrder = useMutation({
		mutationFn: async (id: number) => {
			const headers = getHeaders();

			const req = await api.delete(`/pedidos/${id}`, {
				headers,
			});

			return req.data;
		},
		onSuccess: (res, context) => {
			success(res.success || `Pedido ${context} deletado com sucesso`);
			Modal.destroyAll();

			setData((prev) => prev.filter((data) => data.id !== context));
		},
		onError: (err: any) => {
			error(err.response.data.error);
			Modal.destroyAll();
		},
	});

	const { getUserById } = useUserData();

	const { getConsultorById } = useConsultorData();

	const { products } = useProductsData();

	// const fetchConsultorProducts = async (
	// 	consultorId: number,
	// 	produtoIds: number[],
	// ) => {
	// 	try {
	// 		const headers = getHeaders();
	// 		const payload = {
	// 			consultor_id: consultorId,
	// 			produto_ids: produtoIds,
	// 		};
	// 		const response = await api.post(Api.consultorProduct, payload, {
	// 			headers,
	// 		});

	// 		console.log(api);
	// 		console.log("resposta dos produtos", response.data);
	// 		console.log("batatatatatat");
	// 		return response.data;
	// 	} catch (err: any) {
	// 		console.error(
	// 			"Erro ao buscar produtos do consultor:",
	// 			err.response?.data || err,
	// 		);
	// 		throw new Error(err.response?.data?.error || "Erro ao buscar produtos");
	// 	}
	// };

	const dowloadPdf = async (record: Requests) => {
		// const currentProductsValue = await fetchConsultorProducts(
		// 	record.consultor_id,
		// 	record.produtos_ids.map((prod) => prod.id),
		// );

		// console.log("valores", currentProductsValue);

		const currentProducts = products?.filter((p) =>
			record.produtos_ids.find((r) => r.id === p.id),
		);

		const name = `#${record.id < 10 ? `0${record.id}` : record.id}Pedido`;

		const data = {
			...record,
			consultora_data: getConsultorById(record.consultor_id),
			user_data: getUserById(record.cliente_id),
			formaPag: getFormaPag(record.formapag_id),
			products: currentProducts,
			// values: currentProductsValue,
			condicional: record.modelo,
		};

		const blob = await ReactPDF.pdf(<PDFFile data={data} />).toBlob();
		if (blob) {
			saveAs(blob, name);
		}
	};

	return {
		data: requestsData,
		deleteOrder,
		contextHolder,
		isLoading,
		setData,
		dowloadPdf,
	};
};
