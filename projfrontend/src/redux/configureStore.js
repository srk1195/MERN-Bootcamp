import config from '../config';

import configureStoreProd from './configureStore.prod';
import configureStoreDev from './configureStore.dev';

// eslint-disable-next-line import/no-mutable-exports
let configureStore = configureStoreProd; // defaulting to prod

if (config.EXEC_ENV === 'production') {
    configureStore = configureStoreProd;
} else {
    configureStore = configureStoreDev;
}

export default configureStore;
