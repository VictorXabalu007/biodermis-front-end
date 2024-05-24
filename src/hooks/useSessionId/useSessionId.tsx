import { useState } from "react";



type UseIdType = {
    key: string;
}

export const useSessionId = ({key}:UseIdType) => {

    const [lastId, setLastId] = useState<number>(() => {

        const savedLastId = sessionStorage.getItem(key);
        return savedLastId ? Number(savedLastId) : 0;

    });

    return {lastId, setLastId}

}