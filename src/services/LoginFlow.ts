import {useStores} from "@app/stores";
import {useServices} from "@app/services/index";
import {getNavio} from '@app/navio';

export const useShowAuthFlow = () => {
    const {auth} = useStores();
    const {api} = useServices();
    const navio = getNavio();

    return () => {
        if (auth.state === 'logged-in')
            auth.logout(api);
        navio.setRoot('stacks', 'AuthFlow');
    };
};
