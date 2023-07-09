import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {useServices} from "@app/services";
import {useStores} from "@app/stores/index";
import {AuthApi} from "@app/services/api/auth";
import {ApiService} from "@app/services/api";

type AuthState = 'logged-in' | 'logged-out' | 'checking';
export class AuthStore implements IStore {
  state: AuthState = 'logged-out';
  email = '';
  name='';
  image='';
  password= '';
  isAdmin= false;

  // getters
  get stateStr() {
    return this.state === 'logged-in' ? `Email: ${this.email}\nPress to logout` : 'Press to login';
  }


  // methods
  async checkLoginStatus(api: ApiService) {
    try {
      const response = await api.auth.IsLogin(this);
      // @ts-ignore
      if (response.status === 'success') {
        // marking that we are logged in
        this.set('state', 'logged-in');
      }
      else {
        this.logout(api);
      }
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  logout(api: ApiService) {
    this.setMany({
      state: 'logged-out',
      email: '',
      name: '',
      password: '',
      image: '',
    });
    api.auth.logout();
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: AuthStore.toString(),
      properties: ['email', 'state', 'name', 'password', 'image', 'isAdmin'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<AuthStore>>(what: T, value: AuthStore[T]) {
    (this as AuthStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<AuthStore>>(obj: Record<T, AuthStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as AuthStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
