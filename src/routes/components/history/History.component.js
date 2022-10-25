import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';

const History = props => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    return (
        props.onRender({...props, params, navigate, location, searchParams})
    );
};

export {History}