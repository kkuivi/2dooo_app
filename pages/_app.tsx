import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "../app/globals.css";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.variable}>
            <Component {...pageProps} />
        </main>
    );
}
