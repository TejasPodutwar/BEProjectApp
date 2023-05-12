import Header from './components/Header';
import WebcamvVideo from './components/WebcamVideo';
import './styles/styles.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import TextToVideo from './components/TextToVideo';
import ASLToISL from './components/ASLToISL';


function App() {
  const [selectedSection, setSelectedSection] = useState("VdoToText");

  const changeSectionHandler = (val)=>{
    setSelectedSection(val);
  }

  return (
    <div className="App">
      <Header />
      
      <Navbar 
        section={selectedSection}
        changeSection={changeSectionHandler}
      />

      {selectedSection==="VdoToText" && <WebcamvVideo />}
      {selectedSection==="GetVdoASL" && <TextToVideo />}
      {selectedSection==="ASLToISL" && <ASLToISL />}
      
    </div>
  );
}

export default App;
