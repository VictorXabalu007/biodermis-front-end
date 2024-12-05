import {
	createContext,
	type PropsWithChildren,
	useContext,
	useReducer,
} from "react";

export type RangeDateState = {
	rangeDate: [string, string];
};

export type FilterDateConstraints = {
	enableFilterDate?: boolean;
};

type Action = {
	type: RangeDateActions;
	payload: any;
};

export type RefinedRangeDate = { startDate: string; endDate: string };

type ContextType = {
	state: RangeDateState;
	dispatch: (action: Action) => void;
	getDates: (rangeDate: RangeDateState) => {
		startDate: string;
		endDate: string;
	};
};

enum RangeDateActions {
	setRangeDate = 0,
}

const RangeDateContext = createContext<ContextType | undefined>(undefined);

const initialData = {
	rangeDate: ["", ""],
};

const rangeDateReducer = (state: RangeDateState, action: Action) => {
	switch (action.type) {
		case RangeDateActions.setRangeDate:
			return {
				...state,
				rangeDate: action.payload.rangeDate,
			};
	}
};

const RangeDateProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(rangeDateReducer, initialData);

	const value = { state, dispatch, getDates };

	return (
		<RangeDateContext.Provider value={value}>
			{children}
		</RangeDateContext.Provider>
	);
};

const refineRangeDate = (state: RangeDateState): RefinedRangeDate => {
	const [startDate, endDate] = state.rangeDate;

	return { startDate: startDate, endDate: endDate };
};

const getDates = (state: RangeDateState): RefinedRangeDate => {
	const dates = refineRangeDate(state);
	return dates;
};

const useRangeDate = () => {
	const context = useContext(RangeDateContext);

	if (context === undefined) {
		throw new Error(
			"useRangeDate precisa ser usado dentro do RangeDateProvider",
		);
	}

	return context;
};

export { useRangeDate, RangeDateProvider, RangeDateActions };
