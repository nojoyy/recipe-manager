import { useState } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { Button } from "../components/Button.tsx";

export default function Home() {
  const [text, setText] = useState<string>("");
  const fetchDummy = () => {
    setText("oompa");
  };

  return (
    <div>
      <Button onClick={fetchDummy()}>TEST</Button>
      <h2>{text}</h2>
    </div>
  );
}
