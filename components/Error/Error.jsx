import React, {useContext, useState, useEffect} from "react";
import Image from "next/image";

import Style from "./Error.module.css";
import images from "../../img";

import { NFTMarketplaceContext } from "../../Context/NTFMarketplaceContext";

const Error = () =>{
    const {error , setOpenError} = useContext(NFTMarketplaceContext);
    return (
        <div className={Style.Error} onClick={() => setOpenError(false)}>
            <div className={Style.Error_box}>
                <div className={Style.Error_box_info}>
                    <Image 
                        alt="error"  
                        src={images.loading}
                        width={200} 
                        height={200}
                        objectFit="cover"
                        className={Style.Error_box_info_img}
                    />
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
};


export default Error;