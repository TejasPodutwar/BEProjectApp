import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Col, Container,Row } from "react-bootstrap";
import Webcam from "react-webcam";

export default function ASLToISL() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
//   const [predictedWord, setPredictedWord] = useState("");
  
  const [vdoSrc, setVdoSrc] = useState("");


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
      setVdoSrc("");
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
        let res = await axios({
          method: "post",
          url: "http://localhost:8000/uploadfile/",
          data: {
            file: myFile
          },
          headers: { "Content-Type": "multipart/form-data" },
        })

        const predWord=res.data.predicted_class[0]


        if(predWord==="" && words.includes(predWord)){
            alert("Can't find the word");
            return;
        }

        const url = `http://localhost:8000/get-video-isl/${predWord}`;
        res = await axios.get(url, {
          responseType: 'arraybuffer',
        });

        console.log(url);

        const vurl = window.URL.createObjectURL(new Blob([res.data],{
          type: "video/mp4"
        }));
        setVdoSrc(vurl);


      } catch (err) {
        console.log(err);
        alert("Error: Predicting")
      }
    }

    // const getVideo = async (word) =>{
    //   try {
    //     const url = `http://localhost:8000/get-video-isl/${word}`;
    //     const res = await axios.get(url, {
    //       responseType: 'arraybuffer',
    //     });

    //     console.log(url);

    //     const vurl = window.URL.createObjectURL(new Blob([res.data],{
    //       type: "video/mp4"
    //     }));
    //     setVdoSrc(vurl);
    //   } catch (err) {
    //     if(err.response.status===400){
    //       alert('Invalid Word');
    //       return;
    //     }
    //     alert("Error occurred fetching video");
    //     console.log(err);
    //   }
    // }
    
    sendRequest();
    
    // getVideo (predWord);

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
                  className={`${capturing ? "purple-border" : ""}`}
                />

              
              {vdoSrc && (
                  <div className='flex-center ml'>
                      <video 
                          className='videoPlayer'
                          controls
                          autoPlay
                          src={vdoSrc}
                          width="550"
                          height="400"
                      >
                      </video>
                  </div>
              )}
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
      
          </div>
        </Row>
      </Container>
      
    </>
    
  );
}