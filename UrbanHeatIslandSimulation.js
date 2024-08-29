import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const UrbanHeatIslandSimulation = () => {
  const [greenRoofCoverage, setGreenRoofCoverage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const simulateTemperature = () => {
      const baseTemp = 30; // Base temperature in Celsius
      const coolingEffect = greenRoofCoverage * 0.05; // Assume each 1% of green roof coverage reduces temperature by 0.05°C
      
      return Array.from({ length: 24 }, (_, hour) => {
        const timeOfDay = hour % 24;
        const temperatureVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 5;
        const temperature = baseTemp + temperatureVariation - coolingEffect;
        return {
          hour: timeOfDay,
          temperature: temperature.toFixed(2),
          baseTemperature: (baseTemp + temperatureVariation).toFixed(2),
        };
      });
    };

    setData(simulateTemperature());
  }, [greenRoofCoverage]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Urban Heat Island Effect Simulation</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2">Green Roof Coverage (%): {greenRoofCoverage}</label>
          <Slider
            value={[greenRoofCoverage]}
            onValueChange={(value) => setGreenRoofCoverage(value[0])}
            max={100}
            step={1}
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="baseTemperature" stroke="#ff7300" name="Without Green Roofs" />
            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="With Green Roofs" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UrbanHeatIslandSimulation;
