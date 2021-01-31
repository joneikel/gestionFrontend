export type Sector = {
    id: string;
    name: string;
    code: string;
}

export type Institution = {
    id: string;
    name: string;
    parent_id?: string;
    sector: Sector;
}

export type Program = {
    id: string;
    name: string;
    description: string;
    project?: Project[],
    institution: Institution;
}

export type Project = {
    id: string;
    name: string;
    description: string;
    program: Program
}
