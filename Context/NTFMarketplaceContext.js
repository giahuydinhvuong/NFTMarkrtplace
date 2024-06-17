import React, {useState, useEffect, useContext, Children} from "react";
import wenb3Modal from "web3modal"
// import Wenb3Modal from "web3modal"
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create, create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
// const client = ipfsHttpClient("http://ipfs.infura.io:5001/api/v0")

const projectId = "7e0dde80af3145a4a751be2be205499fe";
const projectSecretKey = "KFCIW/I961GWnheK1yxhLuLHsubanm2LW56cRtPf9FDhLE7HS/NZFA";
const auth = `Basis ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;
const subdomain = "7e0dde80af3145a4a751be2be205499f";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    }
})

const API_KEY_PINATA = "9ba2a1f6f5fe6172ab04"
const API_SECRET = "487d2289d36784decf358585931d7bef4ccaf38fe3f9f5f429850d8d9f574865"
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1Y2E5MWQ2Yi0wYWM4LTRmYzItYjkxNC05NWQyNTk2MDdmMTgiLCJlbWFpbCI6Imh1eWh1bmdoYW5nMTk5NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWJhMmExZjZmNWZlNjE3MmFiMDQiLCJzY29wZWRLZXlTZWNyZXQiOiI0ODdkMjI4OWQzNjc4NGRlY2YzNTg1ODU5MzFkN2JlZjRjY2FmMzhmZTNmOWY1ZjQyOTg1MGQ4ZDlmNTc0ODY1IiwiaWF0IjoxNzE4NTcyMTE2fQ.4wDyTo4cBPAIFDHx336Bv3mh5tv8mYqVSzHPO5DVNnU'
const GateWayDoman = "https://turquoise-given-kiwi-99.mypinata.cloud"

//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./Constants";
import { TbArrowAutofitContent } from "react-icons/tb";




    //CONECTING WITH SMART CONTRACT
    const connectingWithSmartContract = async()=> {
        try {
            const web3Modal = new wenb3Modal({
                cacheProvider: true, // optional
                providerOptions: {}  // required
              });
            
              // Connect to the wallet
              const provider = await web3Modal.connect();
            
              // Wrap the provider with ethers.js
              const ethersProvider = new ethers.BrowserProvider(provider);
            
              // Get the signer (an abstraction of an Ethereum account)
              const signer = await ethersProvider.getSigner();

                // Log signer address for debugging
        console.log("Signer address:", await signer.getAddress());
            
              const contract = new ethers.Contract( NFTMarketplaceAddress,
                NFTMarketplaceABI, signer);
              return contract;
              

        } catch (error) {
            console.log(error)
            console.log("Some thing went wrong while connecting smart contractttt")
        }
    }


export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children})=> {
    const titleData = "Discover, collect, and sell NFTs"


    //---------USESTATE

    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter()
    //------CHECK ID WALLET IS CONNECTED
    const checkIfWalletConnected = async() => {
        try{
            if(!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length > 0){
                setCurrentAccount(accounts[5])
                console.log(accounts[5])
            }else{
                console.log("No account found");
            }

            // console.log(currentAccount);

        } catch(error){
            console.log("Something wrong while connecting wallet");
        }
    };

    useEffect(() => {
        checkIfWalletConnected()
    }, []);

   //-------CONNECT WALLET FUNCTION
   const connectWallet = async() => {
    try{
        if(!window.ethereum) return console.log("Install MetaMask");
        
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[5]);
        // window.location.reload();
    } catch (error){
        console.log("Error while connect to wallet");
    }
   }

   //-------UPLOAD TO IPFS FUNCTION
   const uploadToIPFS = async(file) => {
    if(file){
    try {
        const formData = new FormData()
        formData.append("file", file)
        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                pinata_api_key: `${API_KEY_PINATA}`,
                pinata_secret_api_key: `${API_SECRET}`,
                "Content-Type": "multipart/form-data",
            },
        })
        const url = `${GateWayDoman}/ipfs/${resFile.data.IpfsHash}`;
        console.log(url)
        return url;

    } catch (error){
        // console.log("Error Uploading to IPFS")
        console.log(error)
    }
}
   }

   //------CREATENFT FUNCTION
   const createNFT = async(name, price, image, description ) => {
        
        if (!name || !description || !price || !image) 
            // return setError("Data is missing"), setOpenError(true);
            return console.log("Data is miss")

            const data = JSON.stringify({ name, description, image, price});        

            try {
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: data,
                    headers: {
                        pinata_api_key: `${API_KEY_PINATA}`,
                        pinata_secret_api_key: `${API_SECRET}`,
                        "Content-Type": "application/json",
                    },
                });
                const url = `${GateWayDoman}/ipfs/${resFile.data.IpfsHash}`;
                console.log(url);
                await createSale(url, price);
                router.push("/searchPage");
            }catch(error){
                // console.log("data is miss")

            }
   };

   //------CRAETE SALE FUNCTION

   const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
        console.log("Starting createSale function");
        
        // Parsing the input price to Ether
        const price = ethers.parseUnits(formInputPrice, "ether");
        console.log("Parsed price:", price.toString());

        // Connecting to the smart contract
        const contract = await connectingWithSmartContract();
        console.log("Connected to contract:", contract);

        // Getting the listing price from the contract
        const listingPrice = await contract.getListingPrice();
        console.log("Listing price:", listingPrice.toString());

        // Determining the transaction type (new sale or resell)
        let transaction;
        if (!isReselling) {
            console.log("Creating a new token...");
            transaction = await contract.createToken(url, price, {
                value: listingPrice.toString(),
            });
            console.log(url, price, {
                value: listingPrice.toString(),
            })
            
        } else {
            console.log("Reselling a token...");
            transaction = await contract.reSellToken(id, price, {
                value: listingPrice.toString(),
            });
        }

        // Waiting for the transaction to be mined
        await transaction.wait();
        router.push('searchPage');
        console.log("Transaction successful:", transaction);

    } catch (error) {
        console.error("Error while creating sale:", error);
    }
};
    useEffect(() => {
        fetchMyNFTsOrListedNFT()
    }, [])

   //------FETCHNFTS FUNCTION

   const fetchNFTs = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = fetchContract(provider);

        const data = await contract.fetchMarketItem();

        // console
        const items = await Promise.all(
            data.map(async({ tokenId, seller, owner, price: unformattedPrice }) => {
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data: { image, name, description },
                } = await axios.get(tokenURI);
                const price = ethers.utils.formatUnits(
                    unformattedPrice.toString(),
                    "ether"
                );

                return {
                    price,
                    tokenId: tokenId.toNumber(),
                    seller,
                    owner,
                    image,
                    name, 
                    description,
                    tokenURI,
                }
            })
        );
        return items;
    }catch(error) {
        console.log("Error while fetching NFTs : "+error)
    }
   };

   //------FETCHING MY NFT OR LISTED NFTS
   const fetchMyNFTsOrListedNFT = async(type) => {
    try {
        const contract = await connectingWithSmartContract();
        const data = type == "fetchItemsListened" 
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFT()

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice}) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return {
                        price, 
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name, 
                        description,
                        tokenURI,
                    };
                })
            );
            return items;

    } catch (error){
        console.log("Error while fetching listed NFTs")
    }
   }


   const fetchNFTsByPinata = async (pageLimit, pageOffset) => {
    try {
        const response = await axios.get(`https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=${pageLimit}&pageOffset=${pageOffset}`, {
            headers: {
                pinata_api_key: API_KEY_PINATA,
                pinata_secret_api_key: API_SECRET,
            },
        });
      
        let datas = [];
        const dataUrls  = []
        const dataRows = response.data.rows;
        dataUrls=dataRows.map(dataRow => {
           return `${GateWayDoman}/ipfs/${dataRow.ipfs_pin_hash}`                  
        })
        
        const promises = dataUrls.map((patientData) => {
            return axios.get(patientData);
          });
       
          return Promise.all(promises)
          .then((response) => {
            //response handling    
            return response.map(res => {            
                return res.data
            })
          })
          .catch((error) => {
            //error handling
            console.log("error : " + error)
          });
         
        
          
        
    } catch (error) {
        console.error("Error while fetching NFTs:", error);
    }
};


   //------BUY NFTs FUNCTION
   const buyNFT = async (nft) => {
    try{
        const contract = await connectingWithSmartContract();
        const price = ethers.parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price, 
        });

       await transaction.wait();
    }catch (error) {
        console.log("Error while buying NFT")
    }
   }


    return (
        <NFTMarketplaceContext.Provider value={{
            checkIfWalletConnected, 
            connectWallet, 
            uploadToIPFS,
            createNFT,
            fetchNFTs,
            fetchMyNFTsOrListedNFT, 
            buyNFT,
            fetchNFTsByPinata,
            currentAccount,
            titleData}}>

            {children}
        </NFTMarketplaceContext.Provider>
    )
}