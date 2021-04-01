import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { defaultMarker, GeoJSONGuarico, MapLabels } from "../../MapPage";
import { guaricoJSON } from "../../MapPage/guarico_municipios";

const CoordinatesInput = ({ value, onChange }: { value?: { lat: number, lng: number }, onChange?: Function }) => {

    const [_value, setValue] = useState(value || { lat: 9.023089283030258, lng: -66.5079173567466 })

    const EventHandler = () => {
        const map = useMapEvents({
            click: (e) => {
                const {lat, lng} = e.latlng;
                onChange && onChange({ lat, lng });
                setValue({ lat, lng });
            },
            load: () => {
                map.locate();
            }
        })
        return null
    }
    return (
        <>
            <h4>Lat: {_value.lat}, Lng: {_value.lng}</h4>
            <MapContainer
                doubleClickZoom={false}
                minZoom={8}
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={true}
                center={_value}
                zoom={8.3}
            >
                <TileLayer url="https://mt2.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                <EventHandler />
                <Marker icon={defaultMarker} position={_value} />
                <MapLabels features={guaricoJSON.features} />
{/*                 <GeoJSONGuarico lineColor="black" lineWeight={1} opacity={0.05} geoJson={guaricoJSON} /> */}
            </MapContainer>
        </>
    );
}

export default CoordinatesInput;