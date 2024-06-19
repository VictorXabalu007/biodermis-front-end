import { SelectLabel } from "../../../../shared/Input/Select/SelectLabel";


export const userStatusOptions = [
    {
        value: '',
        label: <SelectLabel onBold="Status: " afterBold="Todos" />
    },
    {
        value: "isAtivo",
        label: <SelectLabel onBold="Status: " afterBold="Ativo" />
    },
    {
        value: "inativo",
        label: <SelectLabel onBold="Status: " afterBold="Inativo" />
    },
    {
        value: "em andamento",
        label: <SelectLabel onBold="Status: " afterBold="Em aprovação" />
    },
]