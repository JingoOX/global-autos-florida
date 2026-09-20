import fs from "fs";
import path from "path";

const landingDir = path.join(process.cwd(), "src", "landing");

function readLanding(file: string): string {
  // Normalize CRLF/CR to LF to avoid React hydration mismatches
  return fs
    .readFileSync(path.join(landingDir, file), "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

// Read content once at module load (cached across requests in dev/prod)
const cssContent = readLanding("styles.css");
const bodyContent = readLanding("body.html");
const scriptContent = readLanding("script.js");

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} suppressHydrationWarning />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} suppressHydrationWarning />
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} suppressHydrationWarning />
    </>
  );
}
