import { Chart, ChartProps } from '@antv/g2';
import React, { FC, useRef } from 'react';
import { useMount, useUnmount, useUpdateEffect } from 'react-use';

export type Axes = Record<
  string,
  {
    position?: 'start' | 'center' | 'end';
    textStyle?: {
      rotate: number;
      textBaseline: 'top' | 'middle' | 'bottom';
    };
  }
>;

export type LineShape = 'line' | 'smooth' | 'dot' | 'dash' | 'shpline';

export type Spec = Partial<Omit<ChartProps, 'container'>> & {
  options: unknown;
};

const ReactG2: FC<{
  spec: Spec;
  initialWidth?: string;
}> = ({ spec, initialWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  useMount(() => {
    try {
      const div = containerRef.current as HTMLElement;
      if (getComputedStyle(containerRef.current as HTMLElement, null).width === 'auto' && initialWidth) {
        div.style.width = initialWidth;
      }
      const chart = new Chart({
        container: containerRef.current as HTMLDivElement,
        ...spec,
      });
      chart.render();
      chartRef.current = chart;
      div.style.width = '100%';
    } catch (e) {
      console.log('grammer:', spec);
    }
  });
  useUpdateEffect(() => {
    try {
      (chartRef.current as Chart).repaint();
    } catch {}
  }, [chartRef.current]);
  useUnmount(() => {
    try {
      (chartRef.current as Chart).destroy();
    } catch {}
  });
  return <div ref={containerRef} />;
};

export default ReactG2;
