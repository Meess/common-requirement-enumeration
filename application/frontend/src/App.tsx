import './app.scss';

import React, { FunctionComponent } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { MainContentArea } from './scaffolding';

interface IAppProps {}

const App: FunctionComponent<IAppProps> = () => {
  return (
    <div className="app">
        <BrowserRouter>
          <Toaster />
          <MainContentArea />
        </BrowserRouter>
    </div>
  );
};

export default App;
