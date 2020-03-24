import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadData from './container/DownloadData';
import Heading from "./components/Heading"
import './App.css';


function App() {
  return (
    <div className="App">
      <Heading />
      <DownloadData />
    </div>
  );
}

export default App;
