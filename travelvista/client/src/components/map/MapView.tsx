import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { Place } from '../../types';
import { Star } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with bundlers
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapViewProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  height?: string;
  singlePlace?: boolean;
}

export default function MapView({ 
  places, 
  center, 
  zoom = 3, 
  className = '', 
  height = '400px',
  singlePlace = false 
}: MapViewProps) {
  const mapCenter = center || (places.length === 1 
    ? [places[0].latitude, places[0].longitude] as [number, number]
    : [20, 0] as [number, number]);

  const mapZoom = singlePlace ? 12 : zoom;

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 ${className}`} style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]} icon={customIcon}>
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{place.name}</h3>
                <p className="text-xs text-slate-400 mb-2">{place.city}, {place.country}</p>
                {place.rating > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="fill-accent-400 text-accent-400" />
                    <span className="text-xs font-medium">{place.rating.toFixed(1)}</span>
                  </div>
                )}
                {!singlePlace && (
                  <Link to={`/place/${place.id}`} className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                    View Details →
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
