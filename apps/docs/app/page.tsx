import { css } from "@styled-system/css/css";

export default function Home() {
  return (
    <>
      <main
        className={css({
          color: "blue.800",
          backgroundColor: "red.200",
        })}
      >
        <p>docs</p>
      </main>
    </>
  );
}
