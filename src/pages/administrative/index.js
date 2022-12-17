import { useSelector } from 'react-redux';

import SignIn from './signIn';
import SignUp from './signUp';


export default function Administrative() {
    const { page } = useSelector((state) => state.data);

    return (
        <main>
            {page === 'Sign in' ? <SignIn /> : null }
            {page === 'Sign up' ? <SignUp /> : null }
        </main>
    );
}