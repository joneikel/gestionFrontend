import {useState, useEffect} from 'react';
import { Municipio, Parroquia } from '../models';
import { useAxios } from './useAxios';

export function useParroaquias(municipio?: string) : [Municipio[], boolean] {
    const [parroquia, setParroquias] = useState<Parroquia[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        if(!municipio) return;
        setLoading(true);
        axios
            .get<Parroquia[]>("/parroquia/filter", {
                params: {
                    municipio
                }
            })
            .then((resp) => setParroquias(resp.data))
            .catch((e) => setLoading(false))
            .finally(() => setLoading(false));
    }, [municipio]);
    return [parroquia, loading];
}