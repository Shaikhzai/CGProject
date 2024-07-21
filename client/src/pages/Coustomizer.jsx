import React, {useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import {useSnapshot} from 'valtio';
import { Route, Routes } from 'react-router-dom';

import config from '../config/config';
import Order from './Order';
import state from '../store';
import {download} from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import {fadeAnimation, slideAnimation} from '../config/motion';
import { AIPicker, ColorPicker, FilePicker, Tab, CustomButton  } from '../components';

const Coustomizer = () => {

  const snap = useSnapshot(state);
  

  //upload file
  const [file, setFile]= useState('');

  //AI prompt
  const [prompt, setPrompt]= useState('');

  //loading state when generating prompt
  const [generatingImg, setGeneratingImg]= useState(false);

  const [activeEditorTab, setActiveEditorTab]= useState("");
  const [activeFilterTab, setActiveFilterTab]= useState({
    logoShirt: true,
    stylishShirt: false,
  })

  //show tab content depending on the activeTab
  const generateTabContent= () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />

      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
    
      default:
        return null;
    }
  };

  //ai generater error check
  const handleSubmit= async (type)=> {
    if(!prompt) return alert("Please enter a prompt");

    try{
      //call our backend to generate an ai image
    }catch (error){
      alert(error)
    } finally{
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  //ONCLICK COMPLETE PAYMENT
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleCompletePayment = async () => {

    try {
      const response = await fetch('http://localhost:8080/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name, // Replace with actual user input
          address: address, // Replace with actual user input
          email: email, // Replace with actual user input
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed successfully:', result);
        // Handle success, e.g., show confirmation message, redirect, etc.
      } else {
        console.error('Failed to place order:', response.statusText);
        // Handle error, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle unexpected errors
    } 
  };

  const handleCompletePayment1 = (event) => {
    event.preventDefault(); // Prevent default behavior of anchor tag
  // Redirect to the Orders component using window.location.href
  window.location.href = '/order';
  console.log('handlecompletepayment clicker')
  
  }
  


  const handleDecals= (type, result)=> {
    const decalType= DecalTypes[type];

    state[decalType.stateProperty]= result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab= (tabName)=> {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture= !activeFilterTab[tabName];        
        break;
      
      case "stylishShirt":
        state.isFullTexture= !activeFilterTab[tabName];
        break;
        
        default:
          state.isFullTexture= true;
          state.isLogoTexture= false;
        break;
     }

     // after setting tthe state, activefilterTab is updated ie toggle on and off the logo

     setActiveFilterTab((prevState)=> {
      return{
        ...prevState,
        [tabName]: !prevState[tabName]
      }
     })
  }

  const readFile= (type)=> {
    reader(file)
      .then((result)=> {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
//checkibg orderpage
  useEffect(() => {
    console.log("Coustomizer re-rendered");
  }, [snap.order]);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        {/* side tab with three option */}
         <motion.div
          key="custom"
          className="absolute top-0 left-0 z-0"
          {...slideAnimation('left')}
         >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab)=> (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={()=> setActiveEditorTab(tab.name)}
                  />
                ))}

                {/*invoke generate function */}
                {generateTabContent()}
              </div>
            </div>
         </motion.div>

         {/* back button */}
         <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
         >
            <CustomButton
              type="filled"
              title="Home"
              handleClick={()=> state.intro= true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
         </motion.div>
        

         {/* bottom tab */}
         <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
         >
            {FilterTabs.map((tab)=> (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={()=> handleActiveFilterTab(tab.name)}
                  />
             ))}
         </motion.div>
         
        </>
      )}
    </AnimatePresence>
  )
}

export default Coustomizer