import fs from "fs";
import path from "path";

const landingDir = path.join(process.cwd(), "src", "landing");

function readLanding(file: string): string {
  // Normalize CRLF/CR to LF to avoid React hydration mismatches.
  // Read on each render so dev-mode edits to the landing files are picked up
  // without needing a full module re-evaluation.
  return fs
    .readFileSync(path.join(landingDir, file), "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

export default function Home() {
  const cssContent = readLanding("styles.css");
  const bodyContent = readLanding("body.html");
  const scriptContent = readLanding("script.js");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} suppressHydrationWarning />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} suppressHydrationWarning />
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} suppressHydrationWarning />
    </>
  );
}
