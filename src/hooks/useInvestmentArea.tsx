import {useState, useEffect} from 'react';
import { InvestmentArea } from '../models';
import { useAxios } from './useAxios';

export function useInvestmentArea( ) : [InvestmentArea[], boolean] {
    const [investmentArea, setInvestmentArea] = useState<InvestmentArea[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        setLoading(true);
        axios
            .get<InvestmentArea[]>("/investment-area")
            .then((resp) => setInvestmentArea(resp.data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);
    return [investmentArea, loading];
}