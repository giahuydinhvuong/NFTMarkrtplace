import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import {NFTMarketplaceProvider} from "../Context/NTFMarketplaceContext"
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;
