import { useState, useEffect } from 'react';
import { InvestmentArea } from '../models';
import { useAxios } from './useAxios';

export function useInvestmentArea({ includes, vertice_id }: { vertice_id?: string, includes?: string[] }): [InvestmentArea[], boolean] {
    const [investmentArea, setInvestmentArea] = useState<InvestmentArea[]>([]);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        setLoading(true);
        axios
            .get<InvestmentArea[]>("/investment-area", {
                params: {
                    vertice_id,
                    includes
                }
            })
            .then((resp) => setInvestmentArea(resp.data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);
    return [investmentArea, loading];
}