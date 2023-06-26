import {useStores} from "@app/stores";
import {useServices} from "@app/services/index";

export const useShowAuthFlow = () => {
    const {auth} = useStores();
    const {navio,api} = useServices();

    return () => {
        if (auth.state === 'logged-in')
            auth.logout(api);
        navio.setRoot('stacks', 'AuthFlow');
    };
};
