import styled from "styled-components";
import dynamic from "next/dynamic";

const EventsMap = dynamic(() => import("@/components/EventsMap/EventsMap"), {
  ssr: false,
});

export default function Map() {
  return <EventsMap />;
}
