import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMovimentations } from "../service/getMovimentations";
import { useRangeDate } from "../context/RangeDate/RangeDateContext";

type MovimentationType = {
	id: number;
	tipo: "entrada" | "saída";
	valor: string;
	saque_id: number | null;
	pedido_id: number | null;
	datarealizado: string; // Format: "YYYY-MM-DD"
};

type DailyDataType = {
	date: string;
	total: number;
	items: MovimentationType[];
};

export const useMovimentationData = () => {
	const { state, getDates } = useRangeDate();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["movimentations"],
		queryFn: () => getMovimentations(getDates(state)),
	});

	const [movimentations, setMovimentations] = useState<MovimentationType[]>([]);
	const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string } | undefined>();

	useEffect(() => {
		refetch();
		const { endDate, startDate } = getDates(state);
		setDateRange({ endDate, startDate });
	}, [state.rangeDate, getDates]);

	useEffect(() => {
		if (data) {
			setMovimentations(data);
		}
	}, [data]);

	const calculateDailyTotals = (data: MovimentationType[]) => {
		const totals: Record<string, { total: number; items: MovimentationType[] }> = {};

		data.forEach((item) => {
			const date = item.datarealizado;
			if (!totals[date]) {
				totals[date] = { total: 0, items: [] };
			}
			totals[date].total += parseFloat(item.valor);
			totals[date].items.push(item);
		});

		return Object.keys(totals).map((date) => ({
			date,
			total: totals[date].total,
			items: totals[date].items,
		}));
	};

	const getInputData = (): DailyDataType[] => {
		const inputData = movimentations.filter((m) => m.tipo === "entrada");

		if (dateRange?.startDate && dateRange.endDate) {
			const start = new Date(dateRange.startDate.split("/").reverse().join("-"));
			const end = new Date(dateRange.endDate.split("/").reverse().join("-"));

			const filteredData = inputData.filter((d) => {
				const dataRealizado = new Date(d.datarealizado);
				return dataRealizado >= start && dataRealizado <= end;
			});

			return calculateDailyTotals(filteredData);
		}

		return calculateDailyTotals(inputData);
	};

	const getInputDataTotal = () => {
		const inputData = getInputData();
		return inputData.reduce((sum, item) => sum + item.total, 0);
	};

	const getOutputData = (): DailyDataType[] => {
		const outputData = movimentations.filter((m) => m.tipo === "saída");

		if (dateRange?.startDate && dateRange.endDate) {
			const start = new Date(dateRange.startDate.split("/").reverse().join("-"));
			const end = new Date(dateRange.endDate.split("/").reverse().join("-"));

			const filteredData = outputData.filter((d) => {
				const dataRealizado = new Date(d.datarealizado);
				return dataRealizado >= start && dataRealizado <= end;
			});

			return calculateDailyTotals(filteredData);
		}

		return calculateDailyTotals(outputData);
	};

	const getOutputDataTotal = () => {
		const outputData = getOutputData();
		return outputData.reduce((sum, item) => sum + item.total, 0);
	};

	return {
		movimentations,
		isLoading,
		getInputData,
		getInputDataTotal,
		getOutputData,
		getOutputDataTotal,
	};
};
