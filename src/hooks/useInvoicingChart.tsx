import { ApexOptions } from "apexcharts";
import { GREEN_700, RED_500 } from "../constants/classnames";
import { useMovimentationData } from "./useMovimentationData";

export const useChartSeries = () => {
	const { getInputData, getOutputData } = useMovimentationData();

	// Function to aggregate and limit data points to 10
	const processChartData = (data: any[], maxPoints = 10) => {
		if (data.length <= maxPoints) return data;

		// Sort data by date
		const sortedData = [...data].sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		// If we need to aggregate, group by date
		if (sortedData.length > maxPoints) {
			// Calculate how many days to aggregate into one point
			const aggregationSize = Math.ceil(sortedData.length / maxPoints);
			const aggregatedData = [];

			for (let i = 0; i < sortedData.length; i += aggregationSize) {
				const chunk = sortedData.slice(i, i + aggregationSize);
				const firstDate = chunk[0].date;

				// Sum up the values for this chunk
				const totalValue = chunk.reduce((sum, item) => sum + item.total, 0);

				aggregatedData.push({
					date: firstDate,
					total: totalValue,
					items: chunk.flatMap(c => c.items)
				});
			}

			return aggregatedData;
		}

		return sortedData;
	};

	// Get and process data
	const inputData = getInputData();
	const outputData = getOutputData();

	// Process and limit data points to 10
	const processedInputData = processChartData(inputData, 10);
	const processedOutputData = processChartData(outputData, 10);

	// Format data for line chart with dates
	const formattedInputData = processedInputData.map((item) => ({
		x: new Date(item.date).getTime(),
		y: item.total,
	}));

	const formattedOutputData = processedOutputData.map((item) => ({
		x: new Date(item.date).getTime(),
		y: item.total,
	}));

	// Calculate min and max values for better y-axis scaling
	const allValues = [...formattedInputData, ...formattedOutputData].map(item => item.y);

	// Find the minimum and maximum values
	let minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
	let maxValue = allValues.length > 0 ? Math.max(...allValues) : 100;

	// Calculate the range
	const range = maxValue - minValue;

	// Set minimum to be slightly lower than the actual minimum (just 2% below)
	minValue = Math.max(0, minValue - (range * 0.02));

	// Set maximum to be slightly higher than the actual maximum (just 5% above)
	maxValue = maxValue + (range * 0.05);

	// Determinar qual série tem os valores menores em média para colocá-la por cima
	const inputAvg = formattedInputData.reduce((sum, item) => sum + item.y, 0) / 
		(formattedInputData.length || 1);
	const outputAvg = formattedOutputData.reduce((sum, item) => sum + item.y, 0) / 
		(formattedOutputData.length || 1);

	const options: ApexOptions = {
		chart: {
			height: 350,
			type: "line",
			events: {
				mounted: (chart: any) => {
					chart.windowResizeHandler();
				},
			},
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
			},
			zoom: {
				enabled: false,
			},
		},
		colors: [RED_500, GREEN_700],
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: "vertical",
				shadeIntensity: 0.4,
				gradientToColors: undefined,
				inverseColors: false,
				opacityFrom: 0.7,
				opacityTo: 0.3,
				stops: [0, 90, 100]
			},
		},
		xaxis: {
			type: "datetime",
			labels: {
				format: "dd/MM",
			},
		},
		yaxis: {
			min: minValue,
			max: maxValue,
			tickAmount: 4,
			forceNiceScale: false,
			labels: {
				formatter: function (val: number) {
					if (val >= 1000) {
						return `R$${(val / 1000).toFixed(1)}k`;
					} else {
						return `R$${val.toFixed(1)}`;
					}
				},
				minWidth: 40,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 3,
			curve: "smooth",
		},
		legend: {
			position: "top",
			markers: {
				radius: 12,
				width: 8,
				height: 8,
			},
		},
		grid: {
			strokeDashArray: 10,
		},
		tooltip: {
			x: {
				// format: "dd MMM yyyy",
				formatter(val, opts) {
					const date = new Date(val).toLocaleDateString("pt-BR", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					});
					return date;
				},
			},
		},
		markers: {
			size: 4, // Readicionando os pontos ao gráfico
			radius: 4,
			hover: {
				size: 6, // Tamanho aumentado ao passar o mouse
			},
		},
	};

	// Ordenar séries para que a menor fique por cima
	const series = inputAvg < outputAvg
		? [
			{
				name: "Saídas",
				data: formattedOutputData,
				type: "area",
			},
			{
				name: "Entradas",
				data: formattedInputData,
				type: "area",
			},
		]
		: [
			{
				name: "Entradas",
				data: formattedInputData,
				type: "area",
			},
			{
				name: "Saídas",
				data: formattedOutputData,
				type: "area",
			},
		];

	return {
		series,
		options,
	};
};
