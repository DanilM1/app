import { useSelector } from 'react-redux';

import StepsProgressBar from '../../components/stepsProgressBar';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

export default function Application() {
    const { step } = useSelector((state) => state.data);

    return (
        <main className='px-5 my-5 flex flex-col items-center'>
            <StepsProgressBar />
            {step === 1 ? <Step1 /> : null }
            {step === 2 ? <Step2 /> : null }
            {step === 3 ? <Step3 /> : null }
            {step === 4 ? <Step4 /> : null }
            {step === 5 ? <Step5 /> : null }
        </main>
    );
}