import React, {useRef, useState, useEffect} from 'react'
import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/ContactExperience.jsx";
import emailjs from '@emailjs/browser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";




const Contact = () => {
    const formRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (isModalOpen) {
            const timer = setTimeout(() => {
                setIsModalOpen(false);
            }, 1000); // ⏳ auto-close after 1 seconds
            return () => clearTimeout(timer); // clean up
        }
    }, [isModalOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission

        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,

            );
            setFormData({ name: '', email: '', message: '' });
            setIsModalOpen(true); // ✅ Show modal


        }catch (error) {
            console.log('EMAILJS ERROR',error);
        }finally {
            setLoading(false);
        }


    }

    return (

        <section id={"contact"} className={"section-padding flex-center"}>

            <div className={"w-full h-full md:px-10 px-5"}>

                <TitleHeader title={"Get In Touch With Me"}
                sub={"🫙 Contact Information"}
                />


                <div className={"mt-16 grid-12-cols"}>
                    {/*left side contact form*/}
                    <div className={"xl:col-span-5 border-2 border-solid-red"}>
                        <div className={"flex-center card-border rounded-xl p-10"}>
                            <form className={"w-full flex flex-col gap-7"} onSubmit={handleSubmit} ref={formRef}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        onChange={handleChange}
                                        value={formData.name}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Your email"
                                        className={"w-full"}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Message</label>
                                    <textarea
                                        type="text"
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Your message"
                                        className={"w-full"}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type={"submit"} disabled={loading}>
                                    <div className={"cta-button group"}>
                                        <div className={"bg-circle"}/>
                                            <p className={"text"}>{loading? 'Sending...' : 'Send Message'}</p>
                                        <div className={"arrow-wrapper"}>
                                            <img src="/images/arrow-down.svg" alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"/>
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>


                    {/*right side*/}
                    <div className={"xl:col-span-7 min-h-96"}>
                        <div className={"w-full h-full bg-[#cd7c2e] hover:cursor-grab rounded-3xl overflow-hidden"}>
                            <ContactExperience/>
                        </div>
                    </div>
                </div>
            </div>

            {/*for mpop up*/}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-[9999]">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center"
                        >
                            <h2 className="text-xl font-semibold mb-4">Message Sent!</h2>
                            <p className="text-gray-700"> Thank you for getting in touch!</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>




        </section>

    )

}
export default Contact
