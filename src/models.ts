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
  mision?: string;
  vision?: string;
  code: string;
  parent?: Institution;
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
  budgets: Budget[];
  project_status: ProjectStatus;
  project_status_id: string;
  measurement_unit: MeasurementUnit[];
  timeline: Timeline[];
  is_planified: number;
  init_date: Date;
  end_date: Date;
  total_activities?: number;
  modified_culmination_dates: ModifiedCulminationDate[];
};

export type ModifiedCulminationDate = {
  id: string;
  modified_date: string;
  project_id: string;
  created_at: string;
  updated_at: string;
};

export type Timeline = {
  id: string;
  previous_value: string;
  current_value: string;
  user_id: string;
  update_type_id: string;
  observation: string;
};

export type Municipio = {
  id: string;
  name: string;
  code: string;
};
export type Parroquia = {
  id: string;
  name: string;
  municipio: Municipio;
};

export type ProjectStatus = {
  id: string;
  name?: string;
  is_final?: boolean;
  observation?: string;
};

export type Budget = {
  id?: string;
  project_id: string;
  value: number;
  is_budget_increase: boolean;
  dollar_value?: number;
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
};

export type MeasurementUnit = {
  id: string;
  name: string;
  short_name: string;
  pivot: MeasurementUnitPivot;
};

export type MeasurementUnitPivot = {
  project_id: string;
  measurement_unit_id: string;
  proposed_goal: number;
  reached_goal?: number;
  is_goal_increase: boolean;
  observation?: string;
};

export type Role = {
  id: string;
  name: string;
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  render: JSX.Element;
};

export type Activity = {
  id: string;
  budget_cost: string;
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
  benefited_population: number;
  lat?: number;
  lng?: number;
  images: ActivityImage[];
};

export type Scope = {
  id: string;
  name: string;
  module_id: string;
  scoppe: string;
};

export type Module = {
  id: string;
  name: string;
  label: string;
  scopes?: Scope[];
};

export type ActivityImage = {
  created_at: string;
  id: string;
  imageable_id: string;
  imageable_type: string;
  path: string;
  updated_at: string;
};
