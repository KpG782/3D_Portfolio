import React from 'react'
import {socialImgs} from "../constants/index.js";

const Footer = () => {
    return (
        <footer className={"footer"}>
            <div className={"footer-container"}>
                <div className={"flex flex-col justify-center items-center md:items-start md:gap-10 gap-5"}>
                    <a href={"https://medium.com/@kenpatrickgarcia/about"}>
                        Visit my Blog
                    </a>
                </div>
                    <div className={"socials"}>
                        {socialImgs.map((img)=>(
                            <a className={"icon"} target={"_blank"} href={img.url} key={img.url}>
                                <img src={img.imgPath}/>
                            </a>
                        ))}
                    </div>


                <div className={"flex flex-col justify-center"}>
                    <p className={"text-center md:text-end"}>
                    ©️ {new Date().getFullYear()} Ken | Garcia. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
