import { SpinnerRoundOutlined } from "spinners-react";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
      <SpinnerRoundOutlined size={50} color="#0070f3" />
    </div>
  );
}
