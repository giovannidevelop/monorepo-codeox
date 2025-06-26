import React, { useEffect, useState } from "react";
import { emptyUbicacion } from "./../models/ubicacionTypes";

const Mapa = () => {

    return (
        <div>
            <div className="ubicacion-form">
                <div className="mapa-placeholder">
                    <p>[ Aquí iría el componente del mapa ]</p>
                    <p>Puedes usar una API como Leaflet o Google Maps para geolocalización.</p>
                </div>
            </div>

        </div>
    );
}

export default Mapa;