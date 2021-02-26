import {useState, useEffect} from 'react';
import { MeasurementUnit } from '../models';
import { useAxios } from './useAxios';

export function useMeasurementUnit( ) : [MeasurementUnit[], boolean] {
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        setLoading(true);
        axios
            .get<MeasurementUnit[]>("/measurement-unit")
            .then((resp) => setMeasurementUnit(resp.data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);
    return [measurementUnit, loading];
}