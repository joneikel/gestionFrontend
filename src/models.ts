
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
    program: Program;
    investmentAreas:  InvestmentArea[];
    measurement: MeasurementUnit;
    budgets: Budget[];
    status: ProjectStatus;
    measurementValue: number;
    isPlanified: number;
    initDate: Date;
    endDate: Date;
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
    name: string;
    isFinal: boolean;
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

export type Column = {
    title: string,
    dataIndex: string,
    key: string,
    render: JSX.Element,
}

export type Activity= {
    id: string;
    name: string;
    project: Project;
    description: string;
    municipio: Municipio;
    parroquia: Parroquia;
    gobernador: boolean;
    conclusion: string;
    address: string;
    initDate: Date;
    endDate: Date;
    estimatedPopulation: number;
    bedefitedPopulation: number;
    latitude?: number;
    longitude?: number;
    images: string[];
}
