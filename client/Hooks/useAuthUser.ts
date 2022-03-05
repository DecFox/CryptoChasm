import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"

declare let window: any;
const useAuthUser = () => {
    const { walletAddress } = useContext(UserContext).user;

    interface UserDetails {
        nonce: string
    }

    useEffect(() => {
        async function authenticate() {
            try {
                const { nonce } = await <UserDetails>(await <any>fetch(`http://localhost:5050/user/nonce/${walletAddress}`)).json();
                const signature = <string>await window.ethereum.request({
                    method: 'personal_sign',
                    params: [nonce, walletAddress]
                })

                const authObject = { walletAddress, signature };

                fetch(`http://localhost:5050/auth/${walletAddress}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(authObject)
                })
                    .then((response) => response.json())
                    .then((resp) => { console.log(resp); })
                    .catch((err) => { console.log(err); });

            } catch (err) {
                console.log(err);
            }
        }

        authenticate();
    }, [walletAddress])
}

export default useAuthUser;