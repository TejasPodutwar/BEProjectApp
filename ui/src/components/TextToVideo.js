import React,{useState} from 'react'
import axios from 'axios';

const TextToVideo = () => {
  const [vdoSrc, setVdoSrc] = useState("");
  const [inputElem, setInputElem] = useState("");

  const getVdo = (word)=>{
    const sendRequest = async () =>{
      try {
        const url = `http://localhost:8000/get-video/${word}`;
        const res = await axios.get(url, {
          responseType: 'arraybuffer',
        });
        const vurl = window.URL.createObjectURL(new Blob([res.data],{
          type: "video/mp4"
        }));
        setVdoSrc(vurl);
      } catch (err) {
        alert("Error occurred fetching video");
        console.log(err);
      }
    }
    sendRequest();
  }

  return (
    <>
        <div className='textToVideo'>
            <form className='getVideoForm'>
                <input 
                    type="text" 
                    className='inputElem'
                    value={inputElem}
                    onChange={(e)=> {setInputElem(e.target.value)}}
                />
                <div 
                    className="get-btn"
                    style={{margin:"0"}}
                    onClick={() =>{getVdo(inputElem)}}
                >
                    Get Video
                </div>
            </form>
        </div>
        {vdoSrc && (
            <div className='flex-center'>
                <video 
                    className='videoPlayer'
                    controls
                    autoPlay
                    src={vdoSrc}
                >
                </video>
            </div>
        )}
    </>
  )
}

export default TextToVideo