import { useCallback } from "react";
import { SVGOverlay, useMap } from "react-leaflet";

const MapLabels = ({ features }: { features: any[] }) => {
    const map = useMap();
    const onClick = useCallback(
        (event) => map.setView(event.sourceTarget.feature.properties.CENTER),
        [map]
    );

    return (
        <>
            {features.length > 0 && features.map((feat: any) => {
                return (
                    <SVGOverlay
                        attributes={{ stroke: "red" }}
                        bounds={[
                            [feat.properties.CENTER.lat - 0.1, feat.properties.CENTER.lng],
                            [feat.properties.CENTER.lat, feat.properties.CENTER.lng + 1],
                        ]}
                    >
                        <text
                            onClick={() => console.log(feat)}
                            style={{ WebkitTextStroke: "1px white" }}
                            fontSize="12px"
                            width="100%"
                            height="100%"
                            x="1%"
                            y="60%"
                            stroke="black"
                        >
                            {feat.properties.NAME_2}
                        </text>
                    </SVGOverlay>
                );
            })}
        </>
    )
};

export default MapLabels;