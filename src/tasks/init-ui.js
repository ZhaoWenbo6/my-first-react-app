import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import AppRouter from '../routes';
// import { LocaleProvider } from 'antd';
// <LocaleProvider locale={zh_CN}>
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'moment/locale/zh-cn';

function renderApp(store, history) {
  console.log(store.getState(), history);
  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={AppRouter} />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

export default context => {
  renderApp(context.store, context.history);
  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('../containers/App', () => {
      // if you are using harmony modules ({modules:false})
      renderApp(context.store, context.history);
    });
  }
  return Promise.resolve(context);
};

// registerServiceWorker();
