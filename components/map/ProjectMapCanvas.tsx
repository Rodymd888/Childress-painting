'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, Marker, MarkerClusterGroup } from 'leaflet';
import type { MappedProject } from '@/lib/projects';

/**
 * PROJECT MAP CANVAS
 * ---------------------------------------------------------------------------
 * The interactive map itself. Isolated in its own client component so the
 * mapping library can be dynamically imported by the route: nothing here
 * reaches the global bundle, and no other page pays for the map existing.
 *
 * PROVIDER
 * Leaflet with OpenStreetMap tiles, rather than Google Maps. Three reasons:
 * it needs no API key, so there is no billing account to configure and no
 * secret to leak; it ships roughly 40KB gzipped against Google's much larger
 * runtime; and swapping the tile URL later is a one-line change if a Google or
 * Mapbox key is ever preferred. Leaflet is a mature, production-grade library,
 * not a homemade map.
 *
 * LOADING
 * Leaflet and its clustering plugin are imported inside the effect, so they
 * are fetched only once this component actually mounts.
 *
 * MARKERS
 * Drawn as inline SVG divIcons using the brand red and ink only. Overlapping
 * markers cluster, and cluster badges carry the same treatment, so a growing
 * portfolio never becomes a pile of pins.
 */
const LEAFLET_CSS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
  'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
];

/** Adds Leaflet's stylesheets once, on the route that actually needs them. */
function injectLeafletCss() {
  for (const href of LEAFLET_CSS) {
    if (document.querySelector(`link[href="${href}"]`)) continue;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

export function ProjectMapCanvas({
  projects,
  hovered,
  selected,
  onHover,
  onSelect,
}: {
  projects: MappedProject[];
  hovered: string | null;
  selected: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const clusterRef = useRef<MarkerClusterGroup | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const readyRef = useRef(false);

  /* ---------------------------------------------------------- create map */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet.markercluster');
      /* Leaflet's stylesheet is injected here rather than imported globally,
         so no other route downloads it. */
      injectLeafletCss();
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false, // page scroll should not be hijacked
        attributionControl: true,
      }).setView([39.05, -94.6], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;
      readyRef.current = true;

      // Trigger the marker effect now that the map exists.
      map.fire('cp:ready');
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      clusterRef.current = null;
      markersRef.current = {};
      readyRef.current = false;
    };
  }, []);

  /* ------------------------------------------------------- draw markers */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet.markercluster');

      // Wait for the map instance if it is still being created.
      for (let i = 0; i < 40 && !mapRef.current; i++) {
        await new Promise((r) => setTimeout(r, 50));
      }
      const map = mapRef.current;
      if (cancelled || !map) return;

      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
        clusterRef.current = null;
      }
      markersRef.current = {};

      const pin = (active: boolean) =>
        L.divIcon({
          className: '',
          html: `<span style="display:block;width:${active ? 34 : 26}px;height:${
            active ? 44 : 34
          }px;transition:all .2s">
            <svg viewBox="0 0 26 34" width="100%" height="100%" aria-hidden="true">
              <path d="M13 0C5.8 0 0 5.8 0 13c0 9.4 13 21 13 21s13-11.6 13-21C26 5.8 20.2 0 13 0z"
                    fill="${active ? '#d81f26' : '#0a0a0b'}"/>
              <circle cx="13" cy="13" r="5" fill="${active ? '#ffffff' : '#d81f26'}"/>
            </svg></span>`,
          iconSize: [active ? 34 : 26, active ? 44 : 34],
          iconAnchor: [active ? 17 : 13, active ? 44 : 34],
        });

      const cluster = (L as unknown as {
        markerClusterGroup: (o: object) => MarkerClusterGroup;
      }).markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 44,
        iconCreateFunction: (c: { getChildCount: () => number }) =>
          L.divIcon({
            className: '',
            html: `<span style="display:flex;align-items:center;justify-content:center;
                   width:40px;height:40px;background:#0a0a0b;color:#fff;
                   border:2px solid #d81f26;font-family:ui-monospace,monospace;
                   font-size:13px;font-weight:700">${c.getChildCount()}</span>`,
            iconSize: [40, 40],
          }),
      });

      for (const p of projects) {
        const marker = L.marker([p.latitude, p.longitude], {
          icon: pin(false),
          title: `${p.name}, ${p.city}, ${p.state}`,
          alt: `${p.name} project location`,
        });

        marker.on('mouseover', () => onHover(p.slug));
        marker.on('mouseout', () => onHover(null));
        marker.on('click', () => onSelect(p.slug));
        marker.bindTooltip(
          `<strong>${p.name}</strong><br>${p.city}, ${p.state}`,
          { direction: 'top', offset: [0, -30] },
        );

        markersRef.current[p.slug] = marker;
        cluster.addLayer(marker);
      }

      map.addLayer(cluster);
      clusterRef.current = cluster;

      if (projects.length > 0) {
        map.fitBounds(
          projects.map((p) => [p.latitude, p.longitude] as [number, number]),
          { padding: [48, 48], maxZoom: 12 },
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projects, onHover, onSelect]);

  /* ------------------------------------- reflect hover/selection state */
  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      const activeSlug = selected ?? hovered;
      for (const [slug, marker] of Object.entries(markersRef.current)) {
        const active = slug === activeSlug;
        marker.setIcon(
          L.divIcon({
            className: '',
            html: `<span style="display:block;width:${active ? 34 : 26}px;height:${
              active ? 44 : 34
            }px">
              <svg viewBox="0 0 26 34" width="100%" height="100%" aria-hidden="true">
                <path d="M13 0C5.8 0 0 5.8 0 13c0 9.4 13 21 13 21s13-11.6 13-21C26 5.8 20.2 0 13 0z"
                      fill="${active ? '#d81f26' : '#0a0a0b'}"/>
                <circle cx="13" cy="13" r="5" fill="${active ? '#ffffff' : '#d81f26'}"/>
              </svg></span>`,
            iconSize: [active ? 34 : 26, active ? 44 : 34],
            iconAnchor: [active ? 17 : 13, active ? 44 : 34],
          }),
        );
        if (active) marker.setZIndexOffset(1000);
        else marker.setZIndexOffset(0);
      }
    })();
  }, [hovered, selected]);

  return (
    <div
      ref={containerRef}
      /* The map is decorative relative to the list, which carries the same
         information in accessible form. */
      role="presentation"
      className="h-[26rem] w-full border border-line bg-mist sm:h-[32rem] lg:h-[36rem]"
    />
  );
}
