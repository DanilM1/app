import { useState } from 'react';

import { useSelector } from 'react-redux';

export default function Home() {
    const { imagesOfApp } = useSelector((state) => state.data);

    const [buffaloesObjs, onBuffaloesObjs] = useState([1, 2, 3, 4, 5].map(i => <img key={Math.random().toString()} src={imagesOfApp.img3} alt={`Buffalo ${i}`} />));

    return (
        <main>
            <article className='home_background p-5 md:pt-[24.2vw] flex flex-col items-center' style={{backgroundImage: `url(${imagesOfApp.img1})`}}>
                <h2 className='bold mb-[2.1vw]'>
                    WELCOME TO THE SWO TAX OFFICE ON-LINE!
                </h2>
                <p className='bold lg:mx-[22.5vw] mb-[6vw] text-center'>
                    Through this webpage, new and currently licensed vendors may request and submit their
                    application to
                    the SWO Tax Office for processing.
                </p>
            </article>
            <img src={imagesOfApp.img2} alt='decor' />
            <div className='px-5 section lg:mx-[15.4vw] mt-[6.6vw]'>
                <p>The SWO Tax Office is able to receive your application on-line and will process through your
                    application
                    in accordance with the Sisseton Wahpeton Oyate Tribal Code and regulations.</p>
                <p>A tribal business license is required for all businesses doing business with the Sisseton Wahpeton
                    Oyate
                    in Indian County within the Lake Traverse Reservation.</p>
                <p>Without such license, no payment shall be made by the Tribe for goods or services.</p>
                <p>Submission of the annual business license fee may be sent to the SWO Tax Office by check or money
                    order
                    sent through the U.S. Mail to the following address: SWO Tax Office, P.O. Box 776, Agency Village,
                    S.D.
                    57262.</p>
                <p>If you wish, you may bring your check or cash payment to the SWO Tax Office to pay for your annual
                    business license fee.</p>
                <p className='mt-[1.5vw] mb-[1.23vw]'>No license will be issued until the check clears the bank.</p>
                <p className='bold'>PLEASE PUT YOUR APPLICATION NUMBER ON YOUR CHECK OR MONEY ORDER.
                </p>
            </div>
            <div className='px-5 buffaloes my-[7vw] flex justify-center'>{buffaloesObjs}</div>
            <article className='px-5 mb-[3vw]'>
                <h2 className='bold mb-[4.5vw] text-center '>BENEFITS TO BEING A LICENSED SWO VENDOR:</h2>
                <div className='section lg:mx-[15.7vw]'>
                    <p>Being a SWO licensed vendor entitles you to do business with all SWO programs, businesses and
                        organizations.</p>
                    <p>Once approved, your business contact information is on a master vendor listing which is accessed
                        by
                        all program managers.</p>
                    <p className='my-[1.4vw]'>Your tribal business license is good for twelve months from the date of
                        issue.</p>
                    <p>To read the current SWO Business License Ordinance, Chapter 53, please
                        contact the Tax Officce at
                        (605)698-3541.</p>
                </div>
            </article>
        </main>
    );
}