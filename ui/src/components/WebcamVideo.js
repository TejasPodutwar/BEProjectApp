import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Col, Container,Row } from "react-bootstrap";
import Webcam from "react-webcam";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [predWord, setPredWord] = useState("");

  const words = ["book","drink","computer","before","chair","go","clothes","who","candy","cousin","deaf","fine","help","no","thin"]


  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };


  //BlobEvent :- data property
  const handleDataAvailable = useCallback(
    ({ data }) => {
      console.log(data);
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );

    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleReset = ()=>{
    if(recordedChunks.length>0){
      setRecordedChunks([]);
      setPredWord("");
      alert("Video Reset succcessful");
    }
    else 
      alert("No video recorded!")
  }

  const handlePredict = ()=>{

    if(recordedChunks.length===0){
      alert('No video recorded to predict');
      return
    }

    const myFile = new File(
      recordedChunks,
      "demo.mp4",
      { type: 'video/mp4' }
    );

    console.log(myFile);

    const sendRequest = async()=>{
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost:8000/uploadfile/",
          data: {
            file: myFile
          },
          headers: { "Content-Type": "multipart/form-data" },
        })

        setPredWord(res.data.predicted_class[0])
      } catch (err) {
        console.log(err);
        alert("Error: Predicting")
      }
    }

    sendRequest();

  }

  
 
  return (
    <>  
      <Container className='mt-5'>
        <Row className="justify-content-md-center">
          <div className="Container">

              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <ul className="wordList flex-center">
                    {words.map((word,idx)=>{
                      return  <li key={idx}>{word}</li>
                    })}
                  </ul>
                </Col>
              </Row>

            <div className="flex-center">
              <Webcam
                  audio={false}
                  mirrored={true}
                  ref={webcamRef}
                  videoConstraints={videoConstraints}
                  // className={`${capturing ? "purple-border" : ""}`}
                />
            </div>
            
            <div className="flex-center mt-4"> 
              {capturing ? (
                  <div
                    onClick={handleStopCaptureClick}
                    className="n-btn"
                  >
                      Stop Capture
                  </div>
                ) : (
                  <div
                    onClick={handleStartCaptureClick}
                    className="n-btn"
                  >
                    Start Capture
                  </div>
                )}

                  <div
                    onClick={handleReset}
                    className="n-btn"
                  >
                      Reset
                  </div>

                  <div
                    onClick={handlePredict}
                    className="n-btn"
                  >
                      Predict 
                  </div>
            </div>

            <div className="flex-center mt-4"> 
                  {predWord && (
                    <p>{predWord}</p>
                  )}
            </div>
      
          </div>
        </Row>
      </Container>
      
    </>
    
  );
}