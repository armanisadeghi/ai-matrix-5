import { MatrixUser } from '@/types';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from "next/headers";

const Home = () => {
    const cookieStore = cookies();

    //console.log("matrixUserCookie", matrixUserCookie);



    /*
        console.log("cookieStore", cookieStore);
        const cookieNames = cookieStore.getAll();
        console.log("cookieNames", cookieNames);
        const userId = cookieStore.getAll("user_id");
        console.log("userId", userId);
    */
    const matrixUser = cookieStore.getAll("matrix_user");
    console.log("matrixUser", matrixUser);

    return (
        <>
            {matrixUser.length > 0 &&
                matrixUser.map((cookie) => (
                    <div key={cookie.name}>
                        <p>Name: {cookie.name}</p>
                        <p>Value: {cookie.value}</p>
                    </div>
                ))}
        </>
    );
};

export default Home;
