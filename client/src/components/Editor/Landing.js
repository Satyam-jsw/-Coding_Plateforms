
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";


const cppDefault = `#include<bits/stdc++.h>
using namespace std;
int main(){
  cout<<"Hello World";
  return 0;
}`;


const Landing = () => {
  const navigate=useNavigate();
  const [code, setCode] = useState(cppDefault);
  const [customInput, setInput] = useState("");
  const [outputDetails, setOutput] = useState(null);
  const [processingRun, setProcessingrun] = useState(null);
  const [processingSubmit, setProcessingsubmit] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(76);
  const { number } = useParams();
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  let [user_name,setName]=useState();
     const  user=async ()=>{
      const response=await fetch('https://coding-platform-bitcode.vercel.app/home',{
       method:"GET",
       headers:{
        'Content-Type':'Application/json',
        'Access-Control-Allow-Origin':'*'
       }
   });

   let data=await response.json();
    setName(data.name);
    };
     useEffect(()=>{
      user();
     },[]);

  const onSelectChange = (sl) => {
   
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      Run();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const Data = {
    id: language,
    no:number,
    code: code,
    input:customInput,
  };
    let Run=async(val)=>{
      val.preventDefault();
      if(user_name)
      {
      setProcessingrun(true);
      // console.log(Data);
      let response=await fetch('https://coding-platform-bitcode.vercel.app/test',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(Data)
      });
      let output=await response.json();
      // console.log(output);
      setOutput(output.OutputPerTest);
      setProcessingrun(false);
      showSuccessToast(`Compiled Successfully!`);
    }
    else
    {
      window.alert('You are not login !');
      navigate('/login');
    }
     }


     let submitCode=async (val)=>{
      val.preventDefault();
      setProcessingsubmit(false);
      if(user_name)
      {
    
      let response=await fetch('https://coding-platform-bitcode.vercel.app/submit',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(Data)
      });
      let output=await response.json();
  
      // console.log(output);
      setOutput(output.OutputPerTest);
      if(output.ok==1){
        const jsonString = JSON.stringify(output.result);
         const str = btoa(jsonString);
        //  console.log(str);
        navigate('/accp/:str');
      }
      setProcessingsubmit(false);
      showSuccessToast(`Compiled Successfully!`);
        
      }
      else
      {
        window.alert('You are not login !');
        navigate('/login');
      }
     }
    


    
  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(()  => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className="w-50 overflow-auto" style={{maxHeight:"100vh"}}>
        <div className="d-flex">
          <div className="px-4 py-2 " >
            <LanguagesDropdown setLanguage={setLanguage} />
          </div>
          <div className="px-4 py-2 " >
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>
        </div>
        <div className="d-flex flex-column space-x-4 items-start px-4 py-4 w-100">
          <div className="flex flex-col w-full h-full justify-start">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language.value}
              theme={theme.value}
            />
          </div>

          <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
            {outputDetails ? <OutputWindow outputDetails={outputDetails} />:''}
            <div className="flex flex-col items-end">
              <CustomInput
                customInput={customInput}
                setCustomInput={setInput}
              />
              <button
                onClick={Run}
                disabled={!code}
              >
                {processingRun ? "Processing..." : "Run"}
              </button>
              <button
                onClick={submitCode}
                disabled={!code}
              >
                {processingSubmit ? "Processing..." : "Submit"}
              </button>
            </div>
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <useKeyPress/>
    </>
  );
};
export default Landing;
