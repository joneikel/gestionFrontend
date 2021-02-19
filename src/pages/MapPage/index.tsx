import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { guaricoJSON } from './guarico_municipios';

const MapPage = () => {

    return (
        <MapContainer
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={true}
            center={{ lat: 9.913963483473944, lng: -67.35703581437961 }}
            zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON style={(feat) => {
                console.log(feat);
                return {
                    color: "#2961c4",
                    fillColor: "#2961c4",
                    fillOpacity: .08,
                    weight: 1,
                    fillRule: "evenodd"
                };
            }} data={guaricoJSON} />
        </MapContainer>
    );
}

export default MapPage;