import Header from './components/Header';
import WebcamvVideo from './components/WebcamVideo';
import './styles/styles.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import TextToVideo from './components/TextToVideo';
import ASLToISL from './components/ASLToISL';


function App() {
  const [selectedSection, setSelectedSection] = useState("VdoToASL");

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

      {
        selectedSection === "VdoToASL"
        ? <WebcamvVideo />
        : selectedSection === "TextToVdo"
        ? <TextToVideo />
        : selectedSection === "ASLToISL"
        ? <ASLToISL />
        : <div>Hello</div>
      }
      
    </div>
  );
}

export default App;
