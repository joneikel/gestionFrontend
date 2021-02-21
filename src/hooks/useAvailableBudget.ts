import {useState, useEffect} from 'react';
import { useAxios } from './useAxios';

export function useAvaiableBudget(project_id?: string) : [number|undefined, boolean] {
    const [availableBudget, setAvailableBudget] = useState<number|undefined>();
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        if(!project_id) return;
        setLoading(true);
        axios
            .get<number>(`/project/available-budget/${project_id}`)
            .then((resp) => setAvailableBudget(resp.data))
            .catch((e) => setLoading(false))
            .finally(() => setLoading(false));
    }, [project_id]);
    
    return [availableBudget, loading];
}