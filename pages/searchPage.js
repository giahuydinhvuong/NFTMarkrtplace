import React, {useContext, useState, useEffect} from "react";
import { NFTMarketplaceContext } from "../Context/NTFMarketplaceContext";
import { Brand, Filter, Loader, NFTCard, Slider } from "../components/componentsindex";
import NFTCardTwo from "../collectionPage/NFTCardTwo/NFTCardTwo";
import Banner from "../collectionPage/Banner/Banner";

//INTRNAL IMPORT

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

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  const onHandSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name })=>
      //bug
      name.toLowerCase().includes(value.toLowerCase()));
    if(filteredNFTS.length == 0 ){
      setNfts(nftsCopy);
    }
    else{
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () =>{
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy)
    }
  }

  return (
    <div >
      <Banner  />
       {/* <searchPage onHandSearch = {onHandSearch} onClearSearch = {onClearSearch}/>  */}
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} /> }
      
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
