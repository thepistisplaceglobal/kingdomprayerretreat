"use client";

import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { MapPin, Navigation, Compass, ExternalLink, Flame, Sparkles, Building2 } from "lucide-react";

// Emerald Event Center, Uyo coordinates
const EMERALD_CENTER = {
  lat: 5.0286,
  lng: 7.9252,
};

const EMERALD_ADDRESS = "119 Edet Akpan Avenue (4 Lanes), Uyo, Akwa Ibom State, Nigeria";
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Emerald Event Center, Edet Akpan Avenue, Uyo, Akwa Ibom State, Nigeria"
)}`;

function MarkerWithInfo() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={EMERALD_CENTER}
        title="Emerald Event Center, Uyo"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#F21449] to-[#300460] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
          <div className="relative flex items-center justify-center w-11 h-11 bg-[#0c0818] border-2 border-[#F21449] rounded-2xl shadow-2xl text-[#F21449]">
            <Flame size={22} className="animate-bounce" />
          </div>
        </div>
      </AdvancedMarker>

      {isOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setIsOpen(false)}
          headerContent={
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F21449]">
              <Flame size={14} />
              <span>KPR 2026 Venue</span>
            </div>
          }
        >
          <div className="p-1 max-w-[240px] text-gray-900">
            <h4 className="font-extrabold text-sm leading-tight text-gray-900">
              Emerald Event Center
            </h4>
            <p className="text-[11px] text-gray-600 mt-1 leading-snug">
              {EMERALD_ADDRESS}
            </p>
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F21449] text-white text-xs font-bold hover:bg-[#d60e3f] transition-colors"
            >
              <Navigation size={12} />
              <span>Get Directions</span>
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function EventMap() {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY ||
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "";

  const [mapType, setMapType] = useState<"roadmap" | "hybrid">("roadmap");

  return (
    <div className="w-full bg-[#0c0818] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative text-white">
      {/* Map Header Overlay Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0c0818] via-[#150d2a] to-[#0c0818] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F21449] to-[#300460] p-0.5 shrink-0 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0818] rounded-[14px] flex items-center justify-center text-[#F21449]">
              <Building2 size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#F21449]/20 text-[#F21449] border border-[#F21449]/30">
                <Sparkles size={10} /> Official Location
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-0.5 tracking-tight">
              Emerald Event Center, Uyo
            </h3>
            <p className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-[#F21449] shrink-0" />
              <span>119 Edet Akpan Avenue (Four Lanes), Uyo, Akwa Ibom State</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setMapType("roadmap")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                mapType === "roadmap" ? "bg-[#F21449] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType("hybrid")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                mapType === "hybrid" ? "bg-[#F21449] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Satellite
            </button>
          </div>

          <a
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F21449] to-[#300460] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#F21449]/20 transition-all cursor-pointer"
          >
            <Navigation size={14} />
            <span>Open in Maps</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* Map Body Container */}
      <div className="relative w-full h-[380px] sm:h-[420px] bg-[#120e24]">
        {apiKey ? (
          <APIProvider apiKey={apiKey} version="weekly">
            <Map
              defaultCenter={EMERALD_CENTER}
              defaultZoom={15}
              mapId="KPR_VENUE_MAP"
              mapTypeId={mapType}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              zoomControl={true}
              internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              className="w-full h-full"
            >
              <MarkerWithInfo />
            </Map>
          </APIProvider>
        ) : (
          /* Fallback standard Google Maps iframe embed + directions card */
          <div className="relative w-full h-full">
            <iframe
              title="Emerald Event Center Google Map Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Emerald+Event+Center+Edet+Akpan+Avenue+Uyo+Akwa+Ibom+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full grayscale-[20%] contrast-[105%]"
            />

            {/* Float badge overlay */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#0c0818]/90 backdrop-blur-xl border border-white/20 p-3 rounded-2xl max-w-xs shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F21449] animate-ping" />
                <p className="text-xs font-bold text-white">Emerald Event Center</p>
              </div>
              <p className="text-[11px] text-white/70 mt-0.5">
                4 Lanes, Edet Akpan Avenue, Uyo
              </p>
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#F21449] hover:underline"
              >
                Get driving directions <ExternalLink size={10} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar with navigation tips */}
      <div className="p-4 bg-[#0a0714] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/60 gap-2">
        <div className="flex items-center gap-2">
          <Compass size={14} className="text-[#F21449]" />
          <span>Located on Edet Akpan Avenue — accessible via Victor Attah International Airport Road.</span>
        </div>
        <div className="text-[11px] text-white/40">
          Uyo, Akwa Ibom State, Nigeria
        </div>
      </div>
    </div>
  );
}
