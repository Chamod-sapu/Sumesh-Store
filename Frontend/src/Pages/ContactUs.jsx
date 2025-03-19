import React from 'react'
import { PhoneTwoTone, MailTwoTone, HomeTwoTone, FacebookOutlined } from '@ant-design/icons';

function ContactUs() {
  return (
    <div>
        <div className='mb-16 flex flex-col lg:flex-row justify-start px-4 sm:px-8 md:px-16 lg:px-28 xl:mx-40 mt-10 sm:mt-16 lg:mt-28'>
            <div className="w-full lg:w-1/2"> 

                <p className='font-mono font-bold text-3xl sm:text-4xl lg:text-5xl'> Contact Us </p>

                <p className='pt-4 sm:pt-7'>Feel free to drop us an email. Old-fashioned phone calls work too</p>

                <div className='pt-5 sm:pt-7 pl-2 sm:pl-10'>
                    <PhoneTwoTone twoToneColor="#ea580c" className='text-2xl sm:text-3xl '/> <span className='pl-2 text-lg sm:text-xl'>+91 1234567890</span>
                </div>
                <div className='pt-5 sm:pt-7 pl-2 sm:pl-10'>
                    <MailTwoTone twoToneColor="#ea580c" className='text-2xl sm:text-3xl '/> <span className='pl-2 text-base sm:text-xl break-all'>sumeshliyanarachci@gmail.com</span>
                </div>
                <div className='pt-5 sm:pt-7 pl-2 sm:pl-10 flex justify-start relative'>
                    <HomeTwoTone twoToneColor="#ea580c" className='text-2xl sm:text-3xl pl-2 sm:pl-10 absolute top-6 sm:top-8 left-0'/> 
                    <span className='pl-8 sm:pl-11'>
                            <p className='text-lg sm:text-xl'>No.500</p>
                            <p className='text-lg sm:text-xl'>Welagane Store</p>
                            <p className='text-lg sm:text-xl'>Alawwa</p>
                            <p className='text-lg sm:text-xl'>Sri Lanka</p>
                    </span>
                </div>
                <div className='mb-6 sm:mb-[70px]'>
                <FacebookOutlined style={{ fontSize: '30px', color: '#ea580c' }} className='pt-5 sm:pt-7 pl-2 sm:pl-10'/> <span className='pl-2 text-lg sm:text-xl'>WS online store</span>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.7784294193489!2d80.2384084!3d7.291152200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae319006bbd824b%3A0xdf3e3fcebe299744!2sEMINENCE%20ELECTRONIC%20%26%20MARKETING%20SERVICE!5e0!3m2!1sen!2slk!4v1742301547710!5m2!1sen!2slk"
                frameborder="0"
                className='w-full sm:w-[450px] md:w-[500px] lg:w-[550px] xl:w-[600px] h-[300px] sm:h-[350px] md:h-[400px] lg:ml-4 xl:ml-8'
                allowfullscreen=""
                loading="lazy"
                ></iframe>
            </div>
        </div>

    </div>
  )
}

export default ContactUs