import { Button, Slider } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useMap } from "react-leaflet";
import { months, monthsMarks } from "../../helpers";

const MapFilters = ({ isOpen, isSidebarOpen, onClose }: MapFiltersProps) => {

    const map = useMap();

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
            width: isSidebarOpen ? '75%' : '100%',
            height: isOpen ? '200px' : '0px'
        }}
    >
        <Button type="primary" onClick={() => onClose()} icon={<ArrowDownOutlined />} />
        <div className="filters">
            <TimeRangeFilter />
        </div>
    </div>
}

const TimeRangeFilter = () => {
    return <>
        Rango de tiempo (mensual)
        <Slider
            marks={monthsMarks}
            tipFormatter={(t) => months[t ? t - 1 : 0]}
            range defaultValue={[1, 3]} min={1} max={12} step={1} />
    </>
}

export const MapFilterToggle = ({ onClick, isOpen }: MapFilterToggleProps) => {
    return <Button
        onClick={() => onClick()}
        type={isOpen ? "link" : "primary"}
        className="map-filter-toggle"
        icon={<ArrowUpOutlined />}
    >Filtros</Button>
}

type MapFiltersProps = {
    isOpen: boolean,
    isSidebarOpen: boolean;
    onClose: Function;
}

type MapFilterToggleProps = {
    onClick: Function;
    isOpen: boolean;
}

export default MapFilters;