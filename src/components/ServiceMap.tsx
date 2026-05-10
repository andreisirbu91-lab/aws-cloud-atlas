'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Service, Category } from '@/types';
import { categories } from '@/data/categories';
import { services } from '@/data/services';
import { useProgressStore } from '@/store/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceMapProps {
  onServiceClick: (service: Service) => void;
  selectedService: Service | null;
  language: string;
}

export default function ServiceMap({ onServiceClick, selectedService, language }: ServiceMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { progress, getMasteryPercentage } = useProgressStore();

  const width = 1000;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate positions for categories and services
  const categoryRadius = 250;
  const serviceRadius = 120;

  const categoryAngle = (2 * Math.PI) / categories.length;

  const getServicePosition = (categoryIndex: number, serviceIndex: number, totalServices: number) => {
    const angle = categoryAngle * categoryIndex - Math.PI / 2;
    const serviceArc = categoryAngle * 0.7;
    const serviceAngle = angle - serviceArc / 2 + (serviceIndex / (totalServices - 1)) * serviceArc;
    
    return {
      x: centerX + Math.cos(serviceAngle) * categoryRadius,
      y: centerY + Math.sin(serviceAngle) * categoryRadius
    };
  };

  const getCategoryPosition = (index: number) => {
    const angle = categoryAngle * index - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * (categoryRadius + 80),
      y: centerY + Math.sin(angle) * (categoryRadius + 80)
    };
  };

  // Initialize zoom behavior
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });

    svg.call(zoom);

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const handleServiceClick = useCallback((service: Service) => {
    onServiceClick(service);
  }, [onServiceClick]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#f5f7ff]">
      {/* Grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        <g transform={transform.toString()}>
          {/* Connection lines between services */}
          {services.map((service, i) => 
            service.connections?.map((connId) => {
              const connectedService = services.find(s => s.id === connId);
              if (!connectedService || connectedService.id <= service.id) return null;
              
              const catIdx1 = categories.findIndex(c => c.id === service.category);
              const catIdx2 = categories.findIndex(c => c.id === connectedService.category);
              const pos1 = getServicePosition(
                catIdx1,
                categories[catIdx1].services.indexOf(service.id),
                categories[catIdx1].services.length
              );
              const pos2 = getServicePosition(
                catIdx2,
                categories[catIdx2].services.indexOf(connectedService.id),
                categories[catIdx2].services.length
              );
              
              return (
                <line
                  key={`${service.id}-${connId}`}
                  x1={pos1.x}
                  y1={pos1.y}
                  x2={pos2.x}
                  y2={pos2.y}
                  stroke="#ff8c00"
                  strokeWidth="1"
                  strokeDasharray="5 3"
                  opacity={0.4}
                />
              );
            })
          )}

          {/* Category arcs */}
          {categories.map((category, i) => {
            const pos = getCategoryPosition(i);
            const angle = (categoryAngle * i - Math.PI / 2) * (180 / Math.PI);
            
            return (
              <g key={category.id}>
                {/* Category label */}
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-semibold fill-gray-600"
                  style={{ fontSize: '12px' }}
                  transform={`rotate(${angle > 90 || angle < -90 ? angle + 180 : angle}, ${pos.x}, ${pos.y})`}
                >
                  {category.label[language as keyof typeof category.label] || category.label.en}
                </text>
              </g>
            );
          })}

          {/* Service nodes */}
          {categories.map((category, catIdx) => 
            category.services
              .filter(sId => services.find(s => s.id === sId))
              .map((serviceId, svcIdx) => {
                const service = services.find(s => s.id === serviceId)!;
                const pos = getServicePosition(catIdx, svcIdx, category.services.length);
                const isSelected = selectedService?.id === service.id;
                const isHovered = hoveredService === service.id;
                const serviceProgress = progress.serviceProgress[service.id];
                const masteryLevel = serviceProgress?.confidenceLevel || 0;
                
                return (
                  <g
                    key={service.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleServiceClick(service)}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Outer ring for mastered services */}
                    {masteryLevel >= 4 && (
                      <circle
                        r={serviceRadius / 2 + 8}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        opacity={0.8}
                      />
                    )}
                    
                    {/* Service circle */}
                    <circle
                      r={serviceRadius / 2}
                      fill={category.color}
                      stroke={isSelected ? '#3b82f6' : isHovered ? '#1e40af' : 'white'}
                      strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                      filter={isHovered ? 'url(#shadow)' : undefined}
                      style={{
                        transition: 'all 0.2s ease'
                      }}
                    />
                    
                    {/* Service abbreviation */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-bold fill-white pointer-events-none"
                      style={{ fontSize: '14px' }}
                    >
                      {service.abbreviation}
                    </text>
                    
                    {/* Progress indicator */}
                    {masteryLevel > 0 && masteryLevel < 4 && (
                      <circle
                        r={serviceRadius / 2 + 4}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray={`${(masteryLevel / 5) * 100} 100`}
                        transform="rotate(-90)"
                        opacity={0.6}
                      />
                    )}
                  </g>
                );
              })
          )}

          {/* Center hub */}
          <g transform={`translate(${centerX}, ${centerY})`}>
            <circle r={40} fill="white" stroke="#e5e7eb" strokeWidth="2" filter="url(#shadow)" />
            <text textAnchor="middle" y={-5} className="text-xs font-bold fill-gray-800">AWS</text>
            <text textAnchor="middle" y={10} className="text-[10px] fill-gray-600">
              {getMasteryPercentage(services.length)}%
            </text>
          </g>
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            svg.transition().duration(300).call(
              d3.zoom<SVGSVGElement, unknown>().transform as any,
              transform.scale(1.2)
            );
          }}
          className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 shadow-sm transition-colors"
        >
          +
        </button>
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            svg.transition().duration(300).call(
              d3.zoom<SVGSVGElement, unknown>().transform as any,
              d3.zoomIdentity
            );
          }}
          className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 shadow-sm transition-colors"
        >
          ⌂
        </button>
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            svg.transition().duration(300).call(
              d3.zoom<SVGSVGElement, unknown>().transform as any,
              transform.scale(0.8)
            );
          }}
          className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 shadow-sm transition-colors"
        >
          −
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-600 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full border-2 border-amber-500" />
          <span>Learning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span>New</span>
        </div>
      </div>
    </div>
  );
}
