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

export type Municipio = {
    id: string;
    name: string;
}
export type Parroquia = {
    id: string;
    name: string;
}

export type ProjectStatus = {
    id: string;
    name: string
}

export type Budget = {
    id?: string;
    name?: string;
    value: number;
    dolarvalue?: number;
    petro?: number
}

export type BudgetSource = {
    id: string;
    name: string;
}

export type InvestmentArea = {
    id: string;
    name: string;
}

export type MeasurementUnit = {
    id: string;
    name: string;
    shortName: string
}