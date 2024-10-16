import { SelectLabel } from "../../shared/Input/select-label";

export const userStatusOptions = [
    {
        value: '',
        label: <SelectLabel onBold="Status: " afterBold="Todos" />
    },
    {
        value: "ativo",
        label: <SelectLabel onBold="Status: " afterBold="Ativo" />
    },
    {
        value: "inativo",
        label: <SelectLabel onBold="Status: " afterBold="Inativo" />
    },
    {
        value: "em aprovação",
        label: <SelectLabel onBold="Status: " afterBold="Em aprovação" />
    },
]