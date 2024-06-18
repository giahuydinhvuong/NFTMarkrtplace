import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";

import { getTopCreator } from "../topCreater/TopCreater";
import { NFTMarketplaceContext } from "../Context/NTFMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected()
  }, []);
  const {fetchNFTs, fetchNFTsByPinata,connectWallet} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
   
  const creators = getTopCreator();
  const handleSetNft = (value) => {
    setNfts(value)
  }

  useEffect(()=>{
    // fetchNFTs().then((item) => {
    //   // setNfts(item.reverse());
    //   // setNftsCopy(item);
    //   console.log(item)
      
    // })
    connectWallet()
    fetchNFTsByPinata().then(items => handleSetNft(items))
    
  },[])

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      { creators && creators.length == 0 ? <Loader /> :  <FollowerTab topCreator={creators}/>}
     
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      { nfts.length == 0 ? <Loader /> :<NFTCard  NFTData = {nfts}/>}
      
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
