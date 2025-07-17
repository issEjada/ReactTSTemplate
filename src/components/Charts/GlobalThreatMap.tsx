import React from "react";
import WorldMap from "../../assets/svg/Map.svg";

interface Country {
  name: string;
  percent: number;
  latitude: number;
  longitude: number;
}

const countryData: Country[] = [
  {
    name: "United States",
    percent: 72,
    latitude: 37.0902,
    longitude: -95.7129,
  },
  { name: "India", percent: 39, latitude: 20.5937, longitude: 78.9629 },
  { name: "UAE", percent: 25, latitude: 23.4241, longitude: 53.8478 },
  { name: "China", percent: 61, latitude: 35.8617, longitude: 104.1954 },
];

// 🌐 Equirectangular projection
const geoToPixel = (lat: number, lon: number): { x: number; y: number } => {
  const mapWidth = 224;
  const mapHeight = 82;

  const x = ((lon + 180) / 360) * mapWidth;
  const y = ((90 - lat) / 180) * mapHeight;

  return { x, y };
};

const getColorClass = (percent: number): string => {
  if (percent <= 25) return "bg-warning-400 dark:bg-warning-500";
  if (percent <= 50) return "bg-warning-300 dark:bg-warning-200";
  if (percent <= 70) return "bg-red-400";
  return "bg-red-600";
};

const VerticalCard: React.FC = () => {
  const mapFixedWidth = 224;

  return (
    <div className="flex flex-col w-full max-w-[272px] p-4 sm:p-6 gap-4 rounded-[16px] dark:bg-[#121418] dark:border-gray-800 dark:text-white">
      {/* Title */}
      <div className="flex flex-col w-full">
        <span className="text-sm sm:text-base font-semibold">
          Global Threat Map
        </span>
      </div>

      {/* Map Container (fixed size) */}
      <div className="relative w-[224px] h-[82px] rounded-[8px] overflow-hidden self-center">
        <img
          src={WorldMap}
          alt="World Map"
          className="w-[224px] h-[82px] object-cover"
        />
        {countryData.map((country, index) => {
          const { x, y } = geoToPixel(country.latitude, country.longitude);
          return (
            <div
              key={index}
              className="absolute w-[6px] h-[6px] bg-red-600 border border-white rounded-full"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          );
        })}
      </div>

      {/* Country Bars */}
      {countryData.map((country, index) => {
        const width = `${
          (Math.min(country.percent, 100) / 100) * mapFixedWidth
        }px`;
        const colorClass = getColorClass(country.percent);

        return (
          <div key={index} className="flex flex-col w-full gap-[4px]">
            <div className="flex flex-row items-center justify-between h-[22px]">
              <div className="text-xs sm:text-sm ">
                {country.name} {country.percent}%
              </div>
            </div>
            <div className="relative w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-[2px] rounded-full ${colorClass}`}
                style={{ width }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalCard;
