import { useCallback, useEffect, useState } from "react";
import {
	type FilterDateConstraints,
	type RefinedRangeDate,
	useRangeDate,
} from "../../context/RangeDate/RangeDateContext";
import { getTotalBalance } from "../../components/WithdrawalRequests/service/getTotalBalance";
import { useQuery } from "@tanstack/react-query";
import { updateBalance } from "../../components/WithdrawalRequests/service/updateBalance";
import { getWithdraw } from "../../components/WithdrawalRequests/service/getWithdraw";
import { useConsultorData } from "../users/useConsultorData";

export const useWithdrawData = ({
	enableFilterDate = true,
}: FilterDateConstraints = {}) => {
	const mockWithDrawal: WithDrawal[] = [];

	const { getConsultorName } = useConsultorData();

	const { state, getDates } = useRangeDate();
	const [dates, setDates] = useState<RefinedRangeDate>();

	const { data: balance } = useQuery({
		queryKey: ["balance"],
		queryFn: getTotalBalance,
	});

	const [accessBalance, setBalance] = useState({
		saldodisp: "0",
	});

	for (let i = 0; i < 10; i++) {
		mockWithDrawal.push({
			consultor_id: i,
			id: i,
			datasaque: new Date().toLocaleDateString(),
			pedidos_ids: [i],
			pedido_resto_id: i,
			saldo_disp: accessBalance.saldodisp,
			nome_consultor: `Consultor ${i}`,
			srccomp: null,
			status: i % 2 === 0 ? "aprovado" : "pendente",
			valorresto: "100",
			valorsaque: "100",
		});
	}

	const [mockData, _] = useState(mockWithDrawal);

	useEffect(() => {
		if (balance) {
			setBalance(balance);
		}
	}, [balance]);

	useEffect(() => {
		const { endDate, startDate } = getDates(state);

		setDates({ endDate, startDate });
	}, [state.rangeDate]);

	const fetchBalance = useCallback(
		() => async () => {
			await updateBalance();
		},
		[],
	);

	useEffect(() => {
		fetchBalance();
	}, [fetchBalance]);

	const { data: withdraw, isLoading } = useQuery({
		queryKey: ["withdraw"],
		queryFn: getWithdraw,
	});

	const [data, setData] = useState<WithDrawal[]>([]);

	useEffect(() => {
		if (enableFilterDate && dates && dates.startDate && dates.endDate) {
			const start = new Date(dates.startDate.split("/").reverse().join("-"));
			const end = new Date(dates.endDate.split("/").reverse().join("-"));

			const filteredData =
				withdraw?.filter((d: any) => {
					const datasaque = new Date(
						d.datasaque.split("/").reverse().join("-"),
					);
					return datasaque >= start && datasaque <= end;
				}) || [];

			setData(filteredData);
		} else if (withdraw) {
			setData(withdraw);
		}
	}, [dates, withdraw]);

	useEffect(() => {
		if (withdraw) {
			setData(withdraw);
		}
	}, [withdraw]);

	const isWithdrawEmpty = () => {
		return data.length === 0;
	};

	const getWithdrawDateById = (id: number) => {
		console.log("datadata", data);

		const dataSaque =
			data?.find((r) => r.id === id)?.datasaque || "sem data para este saque";
		console.log("Data saque original:", dataSaque);
		return dataSaque;
	};

	return {
		data,
		setData,
		isLoading,
		isWithdrawEmpty,
		getConsultorName,
		getWithdrawDateById,
		accessBalance,
		mockData,
	};
};
