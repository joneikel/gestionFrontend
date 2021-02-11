import {useState, useEffect} from 'react';
import { Project } from '../models';
import { useAxios } from './useAxios';

export function useProjects(program?: string) : [Project[], boolean] {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const axios =  useAxios();

    useEffect(() => {
        if(!program) return;
        setLoading(true);
        axios
            .get<Project[]>("/project", {
                params: {
                    program
                }
            })
            .then((resp) => setProjects(resp.data))
            .catch((e) => setLoading(false))
            .finally(() => setLoading(false));
    }, [program]);
    return [projects, loading];
}