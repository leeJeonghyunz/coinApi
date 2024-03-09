const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`)
    .then((response) => response.json())
    .then((json) => json.slice(0, 100));
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinChart(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // ms단위의 현재 시각을 1000으로 나눈 후 소수점 버림
  const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전만큼 빼기
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}` // 코인파프리카 유료화..
  ).then((response) => response.json());
}
