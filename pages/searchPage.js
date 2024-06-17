import React, {useContext, useState, useEffect} from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NTFMarketplaceContext";
const searchPage = () => {
  const {fetchNFTs, fetchNFTsByPinata} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
   

  const handleSetNft = (value) => {
    setNfts(value)
  }

  useEffect(()=>{
    // fetchNFTs().then((item) => {
    //   // setNfts(item.reverse());
    //   // setNftsCopy(item);
    //   console.log(item)
      
    // })
    fetchNFTsByPinata().then(items => handleSetNft(items))
    
  })
  console.log(nfts)
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
