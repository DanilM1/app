import { Spin } from '../../assets/images/icons';

export default function Spinner(props) {
    return <div className={`m-5 text-center ${props.color}`}><Spin /></div>;
}