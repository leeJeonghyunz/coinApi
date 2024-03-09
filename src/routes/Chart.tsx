import { useQuery } from "@tanstack/react-query";
import { fetchCoinChart } from "./api";
import ApexCharts from "react-apexcharts"; // 이미 chart 컴포넌트를 갖고 있기 때문에 이름 변경
import styled from "styled-components";

const ChartDiv = styled.div`
  margin-top: 15px;
`;

interface IChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Ca({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinChart(coinId),
  });

  const ms = data?.map((price) => new Date(price.time_open * 1000)); // 밀리세컨드를 구함

  // map을 이용하여 카테고리 생성
  const date = ms?.map((date) => {
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate();
    const formattedDate = ` ${month}월 ${day}일`;

    return formattedDate;
  });

  return (
    <ChartDiv>
      <ApexCharts
        type="line"
        width="500"
        series={[
          {
            name: "price",
            data: data ? data?.map((price) => price.close) : [], // data를 못받아 오면 빈 배열 []
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          xaxis: {
            categories: date,
          },
        }}
      />
    </ChartDiv>
  );
}

export default Ca;
