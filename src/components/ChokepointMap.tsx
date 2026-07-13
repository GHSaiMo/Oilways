import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { useMemo, useState } from 'react'
import { feature } from 'topojson-client'
import worldData from 'world-atlas/countries-110m.json'
import { chokepoints } from '../data/content'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 470

export function ChokepointMap() {
  const [selectedId, setSelectedId] = useState('hormuz')
  const selected = chokepoints.find((point) => point.id === selectedId) ?? chokepoints[0]

  const { landPath, routePath, points } = useMemo(() => {
    const topology = worldData as typeof worldData & {
      objects: { countries: never }
    }
    const land = feature(topology as never, topology.objects.countries)
    const projection = geoNaturalEarth1()
      .fitExtent(
        [
          [12, 12],
          [MAP_WIDTH - 12, MAP_HEIGHT - 12],
        ],
        land,
      )
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
    const path = geoPath(projection)
    const route = {
      type: 'LineString' as const,
      coordinates: [
        [48.5, 29.5],
        [56.3, 26.6],
        [80, 10],
        [101.1, 2.8],
        [121.5, 30.8],
      ],
    }

    return {
      landPath: path(land) ?? '',
      routePath: path(route) ?? '',
      points: chokepoints.map((point) => ({
        ...point,
        position: projection(point.coordinates) ?? [0, 0],
      })),
    }
  }, [])

  return (
    <section className="map-section" id="chokepoints">
      <div className="shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">04 / 全球流动系统</div>
            <h2>油田很分散，<br />航线却高度集中。</h2>
          </div>
          <p>
            能源咽喉并不创造石油，却决定石油能否按时抵达。选择地图上的节点，观察一次局部中断如何变成全球价格信号。
          </p>
        </div>

        <div className="map-controls" aria-label="选择能源咽喉">
          {chokepoints.map((point) => (
            <button
              type="button"
              className={point.id === selected.id ? 'is-active' : ''}
              key={point.id}
              onClick={() => setSelectedId(point.id)}
            >
              <MapPin size={15} />
              {point.name}
            </button>
          ))}
        </div>

        <div className="map-layout">
          <div className="world-map" aria-label="全球石油运输咽喉地图">
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img">
              <title>全球主要石油运输咽喉</title>
              <defs>
                <filter id="point-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path className="map-land" d={landPath} />
              <path className="map-route" d={routePath} />
              {points.map((point) => {
                const [x, y] = point.position
                const isActive = point.id === selected.id
                return (
                  <g
                    className={`map-point ${isActive ? 'is-active' : ''}`}
                    key={point.id}
                    transform={`translate(${x} ${y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={point.name}
                    onClick={() => setSelectedId(point.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setSelectedId(point.id)
                      }
                    }}
                  >
                    <circle className="point-pulse" r={isActive ? 18 : 10} />
                    <circle className="point-core" r={isActive ? 5 : 3.5} />
                  </g>
                )
              })}
            </svg>
            <div className="map-legend">
              <span><i className="legend-route" />示意航路</span>
              <span><i className="legend-point" />关键咽喉</span>
            </div>
          </div>

          <aside className="point-detail" aria-live="polite">
            <div className="point-detail-head">
              <Navigation size={18} />
              <span>{selected.region}</span>
              <strong>{selected.year}</strong>
            </div>
            <h3>{selected.name}</h3>
            <div className="point-flow">{selected.flow}</div>
            <div className="point-share">{selected.share}</div>
            <p>{selected.description}</p>
            <ol className="impact-chain compact-chain">
              {selected.chain.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
            <a
              className="source-link"
              href="https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints"
              target="_blank"
              rel="noreferrer"
            >
              查看 EIA 原始口径
              <ExternalLink size={14} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
