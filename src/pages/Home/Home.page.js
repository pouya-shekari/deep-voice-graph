import {Helmet} from "react-helmet";
import {UserLayout} from "../../layouts";

const Home = ()=>{
    return (
        <>
            <Helmet>
                <title>صفحه اصلی</title>
            </Helmet>
            <UserLayout children={<h1>Home</h1>} />
        </>
    )
}

export {Home};