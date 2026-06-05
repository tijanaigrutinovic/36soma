import { THEME_STORAGE_KEY } from "../lib/theme";

/** Runs before paint to avoid light flash when user chose light mode. */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light")document.documentElement.setAttribute("data-theme","light");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
