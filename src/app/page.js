import { cookies, headers } from "next/headers";
import PortfolioApp from "../PortfolioApp";
import { resolveInitialLang } from "../lib/resolveLang";

export default async function Home() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const initialLang = resolveInitialLang(cookieStore, headerList);

  return <PortfolioApp initialLang={initialLang} />;
}
