
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Hackathon } from '@/hooks/use-hackathons';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { CheckCircle } from 'lucide-react';
import { useConnectStore } from '@/hooks/use-connect-store';

interface HackathonMapProps {
  hackathons: Hackathon[];
}

export default function HackathonMap({ hackathons }: HackathonMapProps) {
    const { theme } = useTheme();
    const { registeredHackathons, toggleHackathonRegistration } = useConnectStore();

    // Filter out virtual events for map view
    const onSiteHackathons = hackathons.filter(h => h.mode === 'On-Site');

    if (onSiteHackathons.length === 0) {
        return <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg"><p>No on-site hackathons to display on the map.</p></div>
    }
  
    const center: [number, number] = [onSiteHackathons[0].location.lat, onSiteHackathons[0].location.lng];

    const tileUrl = theme === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      
    const attribution = theme === 'dark'
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy; <a href="https://carto.com/attributions">CARTO</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer center={center} zoom={4} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} className="rounded-lg z-0">
      <TileLayer
        attribution={attribution}
        url={tileUrl}
        key={theme} // Force re-render on theme change
      />
      {onSiteHackathons.map(hackathon => (
        <Marker key={hackathon.id} position={[hackathon.location.lat, hackathon.location.lng]}>
          <Popup>
            <div className="w-48">
              <h3 className="font-bold text-md mb-1">{hackathon.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{hackathon.location.label}</p>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => toggleHackathonRegistration(hackathon.id)}
              >
                {registeredHackathons.includes(hackathon.id) ? 
                    <><CheckCircle className="mr-2 h-4 w-4"/>Registered</> :
                    'Register'
                }
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
