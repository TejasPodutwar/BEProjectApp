import Header from './components/Header';
import WebcamvVideo from './components/WebcamVideo';
import './styles/styles.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import TextToVideo from './components/TextToVideo';


function App() {
  const [selectedSection, setSelectedSection] = useState(true);

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

      {selectedSection && <WebcamvVideo />}
      {!selectedSection && <TextToVideo />}
      
    </div>
  );
}

export default App;
