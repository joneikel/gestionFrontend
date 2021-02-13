export type Sector = {
  id: string;
  name: string;
  code: string;
};

export type Institution = {
  id: string;
  name: string;
  parent_id?: string;
  sector: Sector;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  project?: Project[];
  institution: Institution;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  program: Program;
  investment_sub_areas: InvestmentSubArea[];
  measurement: MeasurementUnit;
  budgets: Budget[];
  status: ProjectStatus;
  measurement_value: number;
  is_planified: number;
  init_date: Date;
  end_date: Date;
  total_activities?: number;
};

export type Municipio = {
  id: string;
  name: string;
};
export type Parroquia = {
  id: string;
  name: string;
  municipio: Municipio;
};

export type ProjectStatus = {
  id: string;
  name: string;
  is_final: boolean;
};

export type Budget = {
  id?: string;
  name?: string;
  value: number;
  dolarvalue?: number;
  petro?: number;
  budget_source: BudgetSource;
};

export type BudgetSource = {
  id: string;
  name: string;
};

export type InvestmentArea = {
  id: string;
  name: string;
};

export type InvestmentSubArea = {
  id: string;
  name: string;
}

export type MeasurementUnit = {
  id: string;
  name: string;
  short_name: string;
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  render: JSX.Element;
};

export type Activity = {
  id: string;
  name: string;
  project: Project;
  description: string;
  municipio: Municipio;
  parroquia: Parroquia;
  gobernador: boolean;
  conclusion: string;
  address: string;
  init_date: Date;
  end_date: Date;
  estimated_population: number;
  bedefited_population: number;
  latitude?: number;
  longitude?: number;
  images: string[];
};
