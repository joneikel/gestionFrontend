import { AutoComplete, Input, message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
export function GeoEncodingSearch({ onSelect }: { onSelect: (v: PositionStack) => void }) {

    const [results, setResults] = useState<PositionStack[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSelect = (value: string) => {
        console.log(value);
        const result = results.find(r => r.id === value);
        if (result) {
            onSelect(result);
        }
    }

    const handleSearch = (query: string, e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
        e?.preventDefault();
        setLoading(true);
        document.getElementById('geosearch')?.blur();
        axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: `${query} guarico`,
                format: 'json',
                countrycodes: 've',
            }
        }).then(res => {
            if (res.data.length === 0) {
                message.info("No se encontraron lugares, intente usando otros puntos de referencia.");
            }
            setResults(res.data.map((l: any, i: number) => {
                return {
                    label: l.display_name,
                    value: l.place_id.toString(),
                    lat: l.lat,
                    lng: l.lon,
                    id: l.place_id.toString(),
                    type: l.class,
                    geojson: l.geojson
                } as PositionStack;
            }));
            document.getElementById('geosearch')?.focus();
        })
            .catch(err => {
                message.error("Ocurrio un error con el servicio de geobusqueda");
            }).finally(() => {
                setLoading(false);
            });
    }

    return <AutoComplete
        id="geosearch"
        onSelect={handleSelect}
        options={results}
    >
        <Input.Search loading={loading} onSearch={handleSearch} size="large" placeholder="Buscar dirección" enterButton />
    </AutoComplete>
}

export type PositionStack = {
    id: string;
    value: string;
    lat: string;
    lng: string;
    label: string;
    type: string;
    geojson?: {
        type: string;
        coordinates: number[][];
    }
}