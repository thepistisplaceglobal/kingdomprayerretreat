'use client';

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Flame, Globe, Users } from "lucide-react";
import type { Map } from "leaflet";

interface Hub {
  name: string;
  lat: number;
  lng: number;
  attendees: string;
  type: string;
  details: string;
  country: string;
}

const ATTENDEE_HUBS: Hub[] = [
  { name: "Uyo (Host)", lat: 5.0389, lng: 7.9094, attendees: "Emerald Event Center", type: "physical", country: "Nigeria", details: "Grand Venue & Altar of Fire 🔥" },
  { name: "London Fellowship", lat: 51.5074, lng: -0.1278, attendees: "250+ Streamers", type: "virtual", country: "United Kingdom", details: "UK & Northern Europe Hub" },
  { name: "Houston Altar", lat: 29.7604, lng: -95.3698, attendees: "180+ Streamers", type: "virtual", country: "United States", details: "North America Hub" },
  { name: "Toronto Fellowship", lat: 43.6532, lng: -79.3832, attendees: "120+ Streamers", type: "virtual", country: "Canada", details: "Canada Regional Altar" },
  { name: "Johannesburg Hub", lat: -26.2041, lng: 28.0473, attendees: "140+ Streamers", type: "virtual", country: "South Africa", details: "Southern Africa Fellowship" },
  { name: "Nairobi Hub", lat: -1.2921, lng: 36.8219, attendees: "90+ Streamers", type: "virtual", country: "Kenya", details: "East Africa Prayer Hub" },
  { name: "Accra Gathering", lat: 5.6037, lng: -0.1870, attendees: "160+ Streamers", type: "virtual", country: "Ghana", details: "West Africa satellite room" },
  { name: "Frankfurt Hub", lat: 50.1109, lng: 8.6821, attendees: "75+ Streamers", type: "virtual", country: "Germany", details: "Germany & Central Europe" },
  { name: "Dublin Altar", lat: 53.3498, lng: -6.2603, attendees: "50+ Streamers", type: "virtual", country: "Ireland", details: "Ireland Fellowship" },
  { name: "Lagos Hub", lat: 6.5244, lng: 3.3792, attendees: "450+ Streamers", type: "virtual", country: "Nigeria", details: "Nigeria Hub - Lagos Altar" },
  { name: "Abuja Hub", lat: 9.0765, lng: 7.3986, attendees: "300+ Streamers", type: "virtual", country: "Nigeria", details: "Nigeria Hub - Federal Capital" },
];

export default function GlobalAttendeeMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [activeHub, setActiveHub] = useState<Hub | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let active = true;
    let mapInstance: Map | null = null;

    import("leaflet").then((L) => {
      if (!active || !mapContainerRef.current) return;

      const container = mapContainerRef.current;
      const containerWithId = container as unknown as { _leaflet_id?: unknown };
      if (containerWithId._leaflet_id) {
        // Already initialized, do not initialize again
        return;
      }

      // Fix Leaflet container size issues on initial load
      const activeMap = L.map(container, {
        center: [22, 12],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstance = activeMap;

      L.control.zoom({ position: "bottomright" }).addTo(activeMap);

      // Add CartoDB Dark Matter Tile Layer (very clean dark slate map)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(activeMap);

      // Add markers
      ATTENDEE_HUBS.forEach((hub) => {
        const isPhysical = hub.type === "physical";
        
        const glowHtml = isPhysical
          ? `<div class="relative flex items-center justify-center w-8 h-8">
               <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F21449] opacity-75"></span>
               <span class="relative inline-flex rounded-full h-4 w-4 bg-[#F21449] border-2 border-white shadow-lg shadow-[#F21449]"></span>
             </div>`
          : `<div class="relative flex items-center justify-center w-6 h-6">
               <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-60"></span>
               <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A855F7] border border-white"></span>
             </div>`;

        const customIcon = L.divIcon({
          className: "custom-div-icon",
          html: glowHtml,
          iconSize: isPhysical ? [32, 32] : [24, 24],
          iconAnchor: isPhysical ? [16, 16] : [12, 12],
        });

        const marker = L.marker([hub.lat, hub.lng], { icon: customIcon })
          .addTo(activeMap);

        marker.on("click", () => {
          setActiveHub(hub);
          activeMap.setView([hub.lat, hub.lng], 4, {
            animate: true,
            duration: 0.8,
          });
        });

        // Add a custom hover tooltip
        marker.bindTooltip(`
          <div class="bg-[#0B0813] text-white text-xs font-semibold px-2 py-1.5 rounded-xl border border-white/10 shadow-xl">
            <span class="font-bold text-[#F21449]">${hub.name}</span>
            <div class="text-[10px] text-white/60">${hub.attendees}</div>
          </div>
        `, {
          direction: "top",
          offset: [0, -10],
          opacity: 0.95,
          className: "custom-leaflet-tooltip"
        });
      });

      mapRef.current = activeMap;
      setMapLoaded(true);

      // Trigger a map redraw to ensure full layout rendering
      setTimeout(() => {
        if (active) {
          activeMap.invalidateSize();
        }
      }, 400);
    });

    return () => {
      active = false;
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    };
  }, []);

  const handleHubClick = (hub: Hub) => {
    setActiveHub(hub);
    if (mapRef.current) {
      mapRef.current.setView([hub.lat, hub.lng], 4, {
        animate: true,
        duration: 0.8,
      });
    }
  };

  return (
    <div id="attendees-map-card" className="w-full bg-[#0B0813] border border-white/10 rounded-[2rem] overflow-hidden p-4 sm:p-6 shadow-2xl flex flex-col relative h-[500px] lg:h-[580px]">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F21449]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#300460]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-white text-lg font-bold flex items-center gap-2 tracking-tight">
            <Globe className="w-5 h-5 text-[#F21449] animate-spin-slow" />
            Interactive Global Prayer Map
          </h3>
          <p className="text-white/50 text-xs mt-0.5">
            Click on the pulsing fire hotspots to view registered attendee networks
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <Users className="w-3.5 h-3.5 text-[#F21449]" />
          <span className="text-[10px] uppercase font-bold text-white/80 tracking-wider">
            10,000+ Streamers Combined
          </span>
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="flex-1 grid lg:grid-cols-4 gap-4 relative z-10 min-h-0">
        
        {/* Left Interactive Sidebar Hubs List */}
        <div className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto max-h-[140px] lg:max-h-full pr-1 brand-scrollbar">
          <div className="text-[10px] text-white/40 uppercase font-black tracking-wider mb-1 hidden lg:block">
            Global Fellowship Altars
          </div>
          {ATTENDEE_HUBS.map((hub, idx) => {
            const isActive = activeHub?.name === hub.name;
            const isPhysical = hub.type === "physical";
            return (
              <button
                key={idx}
                onClick={() => handleHubClick(hub)}
                className={`flex items-center justify-between text-left px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#F21449]/20 border-[#F21449] text-white"
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold truncate max-w-[130px]">{hub.name}</span>
                  <span className="text-[10px] opacity-60">{hub.country}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-semibold opacity-85">{hub.attendees.split(" ")[0]}</span>
                  {isPhysical ? (
                    <Flame className="w-3 h-3 text-[#F21449] animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Map Canvas Frame */}
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/5 bg-black/40 flex-1 min-h-[220px] lg:min-h-0">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
          
          {/* Active Tooltip Details overlay on Map */}
          {activeHub && (
            <div className="absolute top-3 left-3 z-10 bg-[#0B0813]/90 border border-[#F21449]/30 backdrop-blur-md p-4 rounded-2xl shadow-2xl max-w-[280px] text-white animate-fadeIn">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-[9px] uppercase font-extrabold text-[#F21449] tracking-widest bg-[#F21449]/15 px-2 py-0.5 rounded-full">
                    {activeHub.type === "physical" ? "Main Altar" : "Satellite Hub"}
                  </span>
                  <h4 className="font-black text-sm text-white mt-1.5">{activeHub.name}</h4>
                </div>
                <button 
                  onClick={() => setActiveHub(null)}
                  className="text-white/40 hover:text-white text-xs px-1 hover:bg-white/5 rounded-md"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-white/70 mb-2 leading-relaxed">{activeHub.details}</p>
              <div className="flex items-center justify-between text-[10px] border-t border-white/5 pt-2 text-white/50">
                <span>Estimated Streamers:</span>
                <span className="font-bold text-white">{activeHub.attendees}</span>
              </div>
            </div>
          )}

          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B0813]/80 backdrop-blur-sm z-20">
              <div className="flex flex-col items-center gap-3">
                <Globe className="w-8 h-8 text-[#F21449] animate-spin-slow" />
                <span className="text-white/60 text-xs font-semibold">Aligning corporate prayer fires...</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Styled Global Tooltips to inject inside document head/body safely */}
      <style jsx global>{`
        /* Custom styled scrollbars that blend with brand colors */
        .brand-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .brand-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .brand-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(242, 20, 73, 0.3) !important;
          border-radius: 999px;
        }
        .brand-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(242, 20, 73, 0.6) !important;
        }
        .brand-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(242, 20, 73, 0.3) transparent;
        }

        /* Hide scrollbar completely on mobile/tablet views */
        @media (max-width: 1024px) {
          .brand-scrollbar::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .brand-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        }

        .custom-leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .custom-leaflet-tooltip::before {
          display: none !important;
        }
        .leaflet-container {
          background: #0B0813 !important;
          font-family: inherit !important;
        }
        .leaflet-bar {
          border: 1px solid rgba(255,255,255,0.1) !important;
          background: #0B0813 !important;
          box-shadow: none !important;
        }
        .leaflet-bar a {
          background-color: #0B0813 !important;
          color: rgba(255,255,255,0.8) !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        }
        .leaflet-bar a:hover {
          background-color: rgba(255,255,255,0.1) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
