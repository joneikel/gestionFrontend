import {useState, useEffect} from 'react';
import { Project } from '../models';
import { useAxios } from './useAxios';

export function useProjects(program_id?: string) : [Project[], boolean] {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        if(!program_id) return;
        setLoading(true);
        axios
            .get<Project[]>("/project", {
                params: {
                    program_id
                }
            })
            .then((resp) => setProjects(resp.data))
            .catch((e) => setLoading(false))
            .finally(() => setLoading(false));
    }, [program_id]);
    return [projects, loading];
}