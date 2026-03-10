import GlobalStyle from "../styles";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} events={events} />
    </>
  );
}
