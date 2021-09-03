import React from 'react';
import {Route, Switch} from 'react-router-dom';

import "antd/dist/antd.css";
import './App.css';
import Cover from './components/Cover/cover';
import Main from './components/MainPage/Main';
import {
  RecoilRoot,
} from 'recoil';


function App() {
  return (
    <>
    <RecoilRoot>
      <Cover></Cover>
      <Main></Main>
    </RecoilRoot>
      
    </>
  );
}

export default App;
