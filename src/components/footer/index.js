export default function Footer() {
    return (
        <footer className='px-5 py-[1.8vw] md:sticky md:bottom-0 w-full'>
            <div className='md:flex md:justify-evenly'>
                <p>Sisseton Wahpeton Oyate Tax & Revenue Department</p>
                <div className='md:flex'>
                    <p>Site created by Dakota Programming</p>
                    <p className='md:ml-[2vw]'>Build: {new Date().toDateString()}</p>
                </div>
            </div>
        </footer>
    );
}