import { SelectLabel } from "../../shared/Input/select-label";

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
        value: "Em aprovação",
        label: <SelectLabel onBold="Status: " afterBold="Em aprovação" />
    },
]