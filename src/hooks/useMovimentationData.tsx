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

	const generateDateRange = (start: Date, end: Date): string[] => {
		const dates: string[] = [];
		const current = new Date(start);
		while (current <= end) {
			dates.push(current.toISOString().split("T")[0]); // YYYY-MM-DD
			current.setDate(current.getDate() + 1);
		}
		return dates;
	};

	const calculateDailyMap = (
		data: MovimentationType[],
		dates: string[]
	): DailyDataType[] => {
		const map = new Map<string, MovimentationType[]>();

		// Organiza por data
		data.forEach((item) => {
			const date = item.datarealizado;
			if (!map.has(date)) {
				map.set(date, []);
			}
			map.get(date)!.push(item);
		});

		// Garante que todas as datas estejam representadas
		return dates.map((date) => {
			const items = map.get(date) ?? [];
			const total = items.reduce((sum, item) => sum + parseFloat(item.valor), 0);
			return { date, total, items };
		});
	};

	const getInputData = (): DailyDataType[] => {
		const inputData = movimentations.filter((m) => m.tipo === "entrada");

		if (dateRange?.startDate && dateRange.endDate) {
			const start = new Date(dateRange.startDate.split("/").reverse().join("-"));
			const end = new Date(dateRange.endDate.split("/").reverse().join("-"));
			const range = generateDateRange(start, end);

			const filteredData = inputData.filter((d) => {
				const dataRealizado = new Date(d.datarealizado);
				return dataRealizado >= start && dataRealizado <= end;
			});

			return calculateDailyMap(filteredData, range);
		}

		return [];
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
			const range = generateDateRange(start, end);

			const filteredData = outputData.filter((d) => {
				const dataRealizado = new Date(d.datarealizado);
				return dataRealizado >= start && dataRealizado <= end;
			});

			return calculateDailyMap(filteredData, range);
		}

		return [];
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
