import { Phone, Fax } from '../../assets/images/icons';

export default function Contact() {
    return (
        <main className='px-5 my-5'>
            <article className='contact px-5 sm:w-[51vw] py-[3.2vw] mx-auto text-center'>
                <h2 className='bold mb-[1.7vw] mx-auto'>
                    Thank you
                </h2>
                <p className='bold lg:px-[7.5vw]'>
                    for visiting the Sisseton Wahpeton Tax & Revenue Department Website
                </p>
                <p className='bold precontact pt-[3vw] pb-[.5vw]'>You may contact us by mail at:</p>
                <address>P.O.Box 776 Agency Village, SD 57262</address>
                <p className='or py-[1.2vw]'>or</p>
                <address className='flex flex-col items-center'>
                    <div className='pb-[.4vw] flex'><Phone />Phone: (605)698-3541</div>
                    <div className='flex'><Fax />Fax: (605)742-1025</div>
                </address>
            </article>
        </main>
    );
}