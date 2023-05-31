import { preload } from "swr";
import { cacheKey } from "../swr-example";
import { getCharacters } from "../swr-example/api";
import Link from "next/link";

export default function AnotherPage() {
  preload(cacheKey, getCharacters);
  return (
    <div>
      <h1>Här prefetchar vi data!</h1>
      <Link href="/swr-example">Klicka här</Link>
    </div>
  );
}
