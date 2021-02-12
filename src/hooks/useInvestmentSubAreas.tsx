import { useEffect, useState } from 'react';
import { InvestmentSubArea } from '../models';
import { useAxios } from './useAxios';

export function useInvestmentSubArea( investmentAreaIds?: string[] ) : [InvestmentSubArea[], boolean]{
    const [investmentSubArea, setInvestmentSubArea] = useState<InvestmentSubArea[]>([]);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        setLoading(true);
        axios
            .get<InvestmentSubArea[]>("investment-sub-area" , 
                {params: {
                    investmentAreaIds 
                }})
            .then((resp) => {console.log(resp); setInvestmentSubArea(resp.data);} )
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
        }, [investmentAreaIds])
        return [investmentSubArea, loading];
}