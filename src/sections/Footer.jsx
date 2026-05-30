import React from 'react'
import {socialImgs} from "../constants/index.js";

const Footer = () => {
    return (
        <footer className={"footer"}>
            <div className={"footer-container"}>
                <div className={"flex flex-col justify-center items-center md:items-start md:gap-10 gap-5"}>
                    <a
                        href={"https://medium.com/@kenpatrickgarcia/about"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                    >
                        Visit my Blog
                    </a>
                </div>
                    <div className={"socials"}>
                        {socialImgs.map((img)=>(
                            <a
                                className={"icon"}
                                target={"_blank"}
                                rel={"noopener noreferrer"}
                                href={img.url}
                                key={img.url}
                                aria-label={`Visit my ${img.name} profile`}
                            >
                                <img src={img.imgPath} alt={`${img.name} icon`} loading="lazy" />
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
