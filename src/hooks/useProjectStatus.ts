import {useState, useEffect} from 'react';
import { ProjectStatus } from '../models';
import { useAxios } from './useAxios';

export function useProjectStatus( ) : [ProjectStatus[], boolean] {
    const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        setLoading(true);
        axios
            .get<ProjectStatus[]>("/project-status")
            .then((resp) => setProjectStatus(resp.data))
            .catch((e) => setLoading(false))
            .finally(() => setLoading(false));
    }, []);
    return [projectStatus, loading];
}