import { Button, Col, Row, Select, Slider } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useMap } from "react-leaflet";
import { getBeginAndEndOfMonths, months, monthsMarks } from "../../helpers";
import ProjectStatusSelect from "../ProjectPage/components/ProjectStatusSelect";
import { useEffect, useState } from "react";

const MapFilters = ({
  isOpen,
  isSidebarOpen,
  onClose,
  onChange,
}: MapFiltersProps) => {
  const map = useMap();
  const [filters, setFilters] = useState<MapFiltersOpts>({
    dateRange: ["2021-01-01", "2021-12-31"],
  });

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <div
      id="map-filters"
      onMouseOver={(e) => {
        map.dragging.disable();
      }}
      onMouseLeave={(e) => {
        map.dragging.enable();
      }}
      className="map-filter-container"
      style={{
        width: isSidebarOpen ? "70%" : "100%",
        height: isOpen ? "200px" : "0px",
      }}
    >
      <Button
        className="accent-button"
        type="default"
        onClick={() => onClose()}
        icon={<ArrowDownOutlined />}
      />
      <div className="filters">
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <StatusFilter
              onChange={(project_status_id: string) =>
                setFilters({ ...filters, project_status_id })
              }
            />
          </Col>
          <Col span={12}>
            <GovernorAssistanceFilter onChange={(governor_assitance:string) => setFilters({...filters, governor_assitance})} />
          </Col>
          <Col span={24}>
            <TimeRangeFilter
              onChange={(dateRange) => setFilters({ ...filters, dateRange })}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const GovernorAssistanceFilter = ({onChange} : {onChange: Function}) => {
  return (
    <>
      Presencia del gobernador
      <Select style={{width: '100%'}} onChange={e => onChange(e)}>
        <Select.Option value={"TODOS"}>TODOS</Select.Option>
        <Select.Option value={"SI"}>Si</Select.Option>
        <Select.Option value={"NO"}>No</Select.Option>
      </Select>
    </>
  );
};

const TimeRangeFilter = ({
  onChange,
}: {
  onChange: (dateRange: string[]) => void;
}) => {
  return (
    <>
      Rango de tiempo (mensual)
      <Slider
        onChange={(v: [number, number]) => {
          onChange(getBeginAndEndOfMonths(v));
        }}
        marks={monthsMarks}
        tipFormatter={(t) => months[t ? t - 1 : 0]}
        range
        defaultValue={[1, 12]}
        min={1}
        max={12}
        step={1}
      />
    </>
  );
};

const StatusFilter = ({ onChange }: { onChange: Function }) => {
  return (
    <>
      Estatus:
      <ProjectStatusSelect showAll onChange={onChange} />
    </>
  );
};

export const MapFilterToggle = ({ onClick, isOpen }: MapFilterToggleProps) => {
  return (
    <Button
      onClick={() => onClick()}
      type={"default"}
      className="map-filter-toggle accent-button"
      style={{ visibility: isOpen ? "hidden" : "visible" }}
      icon={<ArrowUpOutlined />}
    >
      Filtros
    </Button>
  );
};

type MapFiltersProps = {
  isOpen: boolean;
  isSidebarOpen: boolean;
  onClose: Function;
  onChange: (filters: MapFiltersOpts) => void;
};

type MapFilterToggleProps = {
  onClick: Function;
  isOpen: boolean;
};

export type MapFiltersOpts = {
  project_status_id?: string;
  dateRange?: string[];
  governor_assitance?: string;
};

export default MapFilters;
