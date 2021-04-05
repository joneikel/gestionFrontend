import { Button, Col, Row, Slider } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useMap } from "react-leaflet";
import { months, monthsMarks } from "../../helpers";
import ProjectStatusSelect from "../ProjectPage/components/ProjectStatusSelect";
import { useEffect, useState } from "react";

const MapFilters = ({ isOpen, isSidebarOpen, onClose, onChange }: MapFiltersProps) => {

    const map = useMap();
    const [filters, setFilters] = useState<MapFiltersOpts>({ dateRange: ["2021-01-01", "2021-12-31"] });

    useEffect(() => {
        onChange(filters);
    }, [filters]);

    return <div
        id="map-filters"
        onMouseOver={e => {
            map.dragging.disable();
        }}
        onMouseLeave={e => {
            map.dragging.enable();
        }}
        className="map-filter-container"
        style={{
            width: isSidebarOpen ? '70%' : '100%',
            height: isOpen ? '200px' : '0px'
        }}
    >
        <Button className="accent-button" type="default" onClick={() => onClose()} icon={<ArrowDownOutlined />} />
        <div className="filters">
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <StatusFilter onChange={(project_status_id: string) => setFilters({ ...filters, project_status_id })} />
                </Col>
                <Col span={24}>
                    <TimeRangeFilter />
                </Col>
            </Row>
        </div>
    </div>
}

const TimeRangeFilter = () => {
    return <>
        Rango de tiempo (mensual)
        <Slider
            marks={monthsMarks}
            tipFormatter={(t) => months[t ? t - 1 : 0]}
            range defaultValue={[1, 12]} min={1} max={12} step={1} />
    </>
}

const StatusFilter = ({ onChange }: { onChange: Function }) => {
    return <>
        Estatus:
        <ProjectStatusSelect onChange={onChange} />
    </>
}

export const MapFilterToggle = ({ onClick, isOpen }: MapFilterToggleProps) => {
    return <Button
        onClick={() => onClick()}
        type={"default"}
        className="map-filter-toggle accent-button"
        style={{visibility: isOpen ? 'hidden' : 'visible'}}
        icon={<ArrowUpOutlined />}
    >Filtros</Button>
}

type MapFiltersProps = {
    isOpen: boolean,
    isSidebarOpen: boolean;
    onClose: Function;
    onChange: (filters: MapFiltersOpts) => void;
}

type MapFilterToggleProps = {
    onClick: Function;
    isOpen: boolean;
}

export type MapFiltersOpts = { project_status_id?: string, dateRange?: [string, string] };


export default MapFilters;