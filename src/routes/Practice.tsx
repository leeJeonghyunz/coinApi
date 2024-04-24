import * as data from "../data/data.json";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Practice() {
  fetch("../data/data.json").then((res) =>
    res.json().then((json) => console.log(json))
  );

  return null;
}
