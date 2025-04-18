import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import {
	RangeDateActions,
	useRangeDate,
} from "../../context/RangeDate/RangeDateContext";
import { useRequestsData } from "./useRequestsData";

type Props = {
	setFilteredData: React.Dispatch<React.SetStateAction<Requests[]>>;
};

export const useRequestTableFilters = ({ setFilteredData }: Props) => {
	const { data: initialData } = useRequestsData();

	// Estado para cada filtro
	const [paymentStatus, setPaymentStatus] = useState<string>("");
	const [orderStatus, setOrderStatus] = useState<string>("");
	const [sellChannel, setSellChannel] = useState<number>(0);
	const [dateInterval, setDateInterval] = useState<[Date | null, Date | null]>([null, null]);
	const [showFilters, setShowFilters] = useState(false);
	const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);
	console.log({ orderStatus, paymentStatus, sellChannel })
	const { dispatch, state } = useRangeDate();

	// Função que aplica todos os filtros
	const applyAllFilters = () => {
		if (!initialData) return;

		let filteredResult = [...initialData];

		// Filtro de status de pagamento
		if (paymentStatus) {
			filteredResult = filteredResult.filter(item => item.statuspag === paymentStatus);
		}

		// Filtro de status de entrega
		if (orderStatus) {
			filteredResult = filteredResult.filter(item => item.statusentrega === orderStatus);
		}

		// Filtro de canal de venda (forma de pagamento)
		if (sellChannel > 0) {
			filteredResult = filteredResult.filter(item => item.formapag_id === sellChannel);
		}

		// Filtro de data
		if (dateInterval[0] && dateInterval[1]) {
			filteredResult = filteredResult.filter(item => {
				const dataPedido = parse(item.datapedido, 'dd/MM/yyyy', new Date());
				return dataPedido >= dateInterval[0]! && dataPedido <= dateInterval[1]!;
			});
		}
		console.log('Filtrou aqui', { filteredResult, dateInterval })
		setFilteredData(filteredResult);
	};

	// Atualiza os filtros sempre que qualquer um dos estados de filtro mudar
	useEffect(applyAllFilters, [paymentStatus, orderStatus, sellChannel, dateInterval, initialData]);

	const handleOpenFilters = () => {
		setShowFilters(!showFilters);
	};

	// Handlers atualizados para armazenar o estado em vez de aplicar filtros diretamente
	const handlePaymentStatusChange = (status: string) => {
		setPaymentStatus(status === "" ? "" : status);
	};

	const handleOrderStatusChange = (status: string) => {
		setOrderStatus(status === "" ? "" : status);
	};

	const handleSellChannelChange = (channel: number) => {
		setSellChannel(channel);
	};

	const handleDaysChange = (days: string) => {
		if (days) {
			const daysCount = parseInt(days);
			if (daysCount === -1) {
				if (state.rangeDate[0] && state.rangeDate[1]) {
					const startDate = parse(state.rangeDate[0], 'dd/MM/yyyy', new Date());
					const endDate = parse(state.rangeDate[1], 'dd/MM/yyyy', new Date());
					setDateInterval([startDate, endDate]);
				}
				setDateRange([state.rangeDate[0] || "", state.rangeDate[1] || ""]);
				return;
			}

			const endDate = new Date();
			const startDate = new Date();
			startDate.setDate(startDate.getDate() - daysCount);

			const formattedEndDate = format(endDate, "dd/MM/yyyy");
			const formattedStartDate = format(startDate, "dd/MM/yyyy");

			setDateInterval([startDate, endDate]);
			setDateRange([formattedStartDate, formattedEndDate]);
		}
	};

	// Função para atualizar o intervalo de datas a partir do DatePicker
	const updateDateFromPicker = (startDate: Date, endDate: Date) => {
		setDateInterval([startDate, endDate]);
		// Depois de atualizar o intervalo de datas, aplicamos todos os filtros
		// Os outros filtros já estão sendo mantidos nos seus respectivos estados
	};

	useEffect(() => {
		if (dateRange[0] && dateRange[1]) {
			dispatch({
				type: RangeDateActions.setRangeDate,
				payload: { rangeDate: dateRange },
			});
		}
	}, [dateRange]);

	// Limpa todos os filtros
	const resetAllFilters = () => {
		setPaymentStatus("");
		setOrderStatus("");
		setSellChannel(0);
		setDateInterval([null, null]);
		setDateRange(["", ""]);
		setFilteredData(initialData || []);
	};

	return {
		handlePaymentStatusChange,
		handleOrderStatusChange,
		handleOpenFilters,
		showFilters,
		handleDaysChange,
		handleSellChannelChange,
		setShowFilters,
		updateDateFromPicker,
		resetAllFilters,
	};
};
