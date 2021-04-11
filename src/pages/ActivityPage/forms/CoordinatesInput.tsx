import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useAxios } from "../../../hooks/useAxios";
import { Institution } from "../../../models";
import { defaultMarker, makeMarker } from "../../MapPage";
import { guaricoJSON } from "../../MapPage/guarico_municipios";
import MapLabels from "../../MapPage/MapLabels";

const CoordinatesInput = ({ activity_institution, value, onChange }: { activity_institution?:string; value?: { lat: number, lng: number }, onChange?: Function }) => {

    const axios = useAxios();
    const [ activityMarker, setActivityMarker] = useState<any>();

    const getInstitutionIcon = async (children_institution:string) => {
        let parent_institution = await axios.get(`/institution/${children_institution}`);
        const icon = makeMarker({institution: parent_institution.data});
        return icon;
    }

    useEffect(()=>{
        activity_institution && getInstitutionIcon(activity_institution)
        .then((icon)=> setActivityMarker(icon))
        .catch((e) => console.log(e))
    },[activity_institution])



    const [_value, setValue] = useState(value ? value : { lat: 9.023089283030258, lng: -66.5079173567466 })
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
                <Marker icon={ activityMarker ? activityMarker : defaultMarker} position={_value} />
                <MapLabels features={guaricoJSON.features} />
{/*                 <GeoJSONGuarico lineColor="black" lineWeight={1} opacity={0.05} geoJson={guaricoJSON} /> */}
            </MapContainer>
        </>
    );
}

export default CoordinatesInput;