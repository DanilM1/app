import { useSelector, useDispatch } from 'react-redux';
import { setStep } from '../../app/data';

export default function StepsProgressBar() {
    const dispatch = useDispatch();
    const { step } = useSelector((state) => state.data);

    return (
        <div className='w-full lg:w-[40vw] mb-[4.3vw] flex flex-col items-center'>
            <div className='flex justify-between w-full steps'>
                <p
                    className={`${step === 1 ? 'previous_step' : step > 1 ? 'active' : 'next_step'}`}
                    onClick={() => dispatch(setStep(1))}
                >
                    Step 1
                </p>
                <p
                    className={`${step === 2 ? 'previous_step' : step > 2 ? 'active' : 'next_step'}`}
                    onClick={() => dispatch(setStep(2))}
                >
                    Step 2
                </p>
                <p
                    className={`${step === 3 ? 'previous_step' : step > 3 ? 'active' : 'next_step'}`}
                    onClick={() => dispatch(setStep(3))}
                >
                    Step 3

                </p>
                <p
                    className={`${step === 4 ? 'previous_step' : step > 4 ? 'active' : 'next_step'}`}
                    onClick={() => dispatch(setStep(4))}
                >
                    Step 4
                </p>
                <p
                    className={`${step === 5 ? 'previous_step' : step > 5 ? 'active' : 'next_step'}`}
                    onClick={() => dispatch(setStep(5))}
                >
                    Step 5
                </p>
            </div>
            <svg width='93%' viewBox='0 0 718 10' className='block'>
                <circle cx='5' cy='5' r='5' fill={`${step === 1 ? '#fff' : step > 1 ? '#F2B75B' : '#B4B4B4'}`} />
                <line x1='15' y1='5' x2='172' y2='5' stroke={`${step === 1 ? '#fff' : step > 1 ? '#F2B75B' : '#B4B4B4'}`} />
                <circle cx='182' cy='5' r='5' fill={`${step === 2 ? '#fff' : step > 2 ? '#F2B75B' : '#B4B4B4'}`} />
                <line x1='192' y1='5' x2='349' y2='5' stroke={`${step === 2 ? '#fff' : step > 2 ? '#F2B75B' : '#B4B4B4'}`} />
                <circle cx='359' cy='5' r='5' fill={`${step === 3 ? '#fff' : step > 3 ? '#F2B75B' : '#B4B4B4'}`} />
                <line x1='369' y1='5' x2='526' y2='5' stroke={`${step === 3 ? '#fff' : step > 3 ? '#F2B75B' : '#B4B4B4'}`} />
                <circle cx='536' cy='5' r='5' fill={`${step === 4 ? '#fff' : step > 4 ? '#F2B75B' : '#B4B4B4'}`} />
                <line x1='546' y1='5' x2='703' y2='5' stroke={`${step === 4 ? '#fff' : step > 4 ? '#F2B75B' : '#B4B4B4'}`} />
                <circle cx='713' cy='5' r='5' fill={`${step === 5 ? '#fff' : step > 5 ? '#F2B75B' : '#B4B4B4'}`} />
                Sorry, your browser does not support inline SVG.
            </svg>
        </div>
    );
}