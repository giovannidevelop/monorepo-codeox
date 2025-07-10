export const obtenerDireccionDesdeCoordenadas = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
        direccion: data.display_name || "Dirección no encontrada",
        datosCrudos: data.address || {},
    };
};
export const obtenerCoordenadasDesdeDireccion = async (direccion) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=cl&q=${encodeURIComponent(direccion)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) return null;

    const { lat, lon, display_name, address } = data[0];
    return {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        direccion: display_name,
        raw: address,
    };
};
