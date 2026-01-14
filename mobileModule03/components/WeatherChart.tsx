import { LineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

const WeatherChart: React.FC<{
  chartData: LineChartData;
  width: number;
  height: number;
}> = ({ chartData, width, height }) => {
  return (
    <LineChart
      data={chartData}
      width={width}
      height={height}
      yAxisSuffix="°C"
      withShadow={false}
      formatYLabel={(yValue) => Number(yValue).toFixed(1).toString()}
      segments={5}
      withVerticalLines={false}
      chartConfig={{
        backgroundGradientFromOpacity: 0.7,
        backgroundGradientToOpacity: 0.7,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export default WeatherChart;
