import { UserRole } from "../../../../../util/UserRole";
import { SelectLabel } from "../../../../shared/Input/Select/SelectLabel";




export const userSelectOptions = [
    {
        value: '',
        label: <SelectLabel onBold="Tipo: " afterBold="Todos" />
    },
    {
        value: UserRole.ADMIN,
        label: <SelectLabel onBold="Tipo: " afterBold="Admin" />
    },
    {
        value: UserRole.CONSULTOR,
        label: <SelectLabel onBold="Tipo: " afterBold="Consultor" />
    },
    {
        value: UserRole.STOCK,
        label: <SelectLabel onBold="Tipo: " afterBold="Estoque" />
    },
    {
        value: UserRole.MANAGER,
        label: <SelectLabel onBold="Tipo: " afterBold="Gerente" />
    },
    {
        value: UserRole.USER,
        label: <SelectLabel onBold="Tipo: " afterBold="Cliente" />
    },
]