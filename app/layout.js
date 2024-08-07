import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./_components/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./_components/Footer";
import AuthRedirect from "./_components/AuthRedirect";
import ScrollToTop from "./_components/ScrollToTop";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "WandwerWave",
  description:
    "Welcome to our travel blog, your ultimate destination for exploring the world's most beautiful places! Discover top travel tips, breathtaking destinations, and inspirational journeys.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <ScrollToTop>
          <AuthRedirect>
            <Providers>
              <div className="flex min-h-screen flex-col">
                {children}
                <Footer />
              </div>
              <ToastContainer />
            </Providers>
          </AuthRedirect>
        </ScrollToTop>
      </body>
    </html>
  );
}
