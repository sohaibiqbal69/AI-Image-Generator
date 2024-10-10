// import React, { useState }from 'react'
// import { useNavigate } from 'react-router-dom'

// import { preview } from '../assets';
// import { getRandomPrompt } from '../utils';
// import { FormField, Loader } from '../components';

// const CreatePost = () => {

//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     prompt: '',
//     photo: '',
//   });
//   const [generatingImg, setGeneratingImg] = useState(false);
//   const [loading, setLoading] = useState(false);

//   //new function
//   const generateImage = async () => {
//     if (form.prompt) {
//         try {
//             setGeneratingImg(true); // Start loading
//             const response = await fetch('http://localhost:8080/api/v1/dalle', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ prompt: form.prompt }),
//             });

//             // Log the response status and check for errors
//             console.log("Response status:", response.status);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Response data:", data); // Log the complete response data

//             // Check if the photo exists in the response
//             if (data.photo) {
//                 console.log("Image data found:", data.photo);
//                 setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
//             } else {
//                 console.error('Image generation failed, no photo returned.');
//                 alert('Image generation failed, no photo returned.');
//             }

//         } catch (error) {
//             console.error("Error generating image:", error); // Log the error
//             alert(error.message); // Show the error message
//         } finally {
//             setGeneratingImg(false); // Stop loading
//         }
//     } else {
//         alert('Please enter a prompt');
//     }
// };



























// this is the old function //  const generateImage = async () => {
  //   if(form.prompt){
  //     try {
  //       setGeneratingImg(true); //START LOADING
  //       const response = await fetch('http://localhost:8080/api/v1/dalle', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ prompt: form.prompt }),
  //       });
        
  //       const data = await response.json();

  //       setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})


  //     } catch (error)  {
  //       alert(error);
  //     } finally {
  //       setGeneratingImg(false);
  //     }
  //   } else {
  //     alert('Please enter a prompt')
  //   }
  // }








//   const handleSubmit = () => {

//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSurpriseMe = () => {
//     const randomPrompt = getRandomPrompt(form.prompt);
//     setForm({ ...form, prompt: randomPrompt })
//   }


//   return (
//     <section className='max-w-7xl mx-auto'>
//       <div>
//       <h1 className='font-extrabold text-[#222328], text-[32px]'>Create</h1>
//       <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create imaginative and visually stunning images through AI and share them with the community</p>
//       </div>

//       <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
//         <div className='flex flex-col gap-5'>
//           <FormField 
//             labelName="Your name"
//             type="text"
//             name="name"
//             placeholder="John Doe"
//             value={form.name}
//             handleChange={handleChange}
//           />
//           <FormField 
//             labelName="Prompt"
//             type="text"
//             name="prompt"
//             placeholder="Spongebob Squarepants in the Blair Witch Project"
//             value={form.prompt}
//             handleChange={handleChange}
//             isSurpriseMe
//             handleSurpriseMe={handleSurpriseMe}
//           />

//           <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
//             {form.photo ?  (
//               <img 
//               src={form.photo} 
//               alt={form.prompt}
//               className='w-full h-full object-contain' 
//             />
//             ): (
//               <img src={preview} alt="preview" 
//               className='w-9/12 h-9/12 object-contain opacity-40'/>
//             )}

//             {generatingImg && (
//               <div className='absolute inset-0 z-0 flex justify-center items-center bg-rgba(0,0,0,0.5)] rounded-t-lg'>
//                 <Loader />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className='mt-5 flex gap-5'>
//             <button
//               type='button'
//               onClick={generateImage}
//               className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//             >
//               {generatingImg ? 'Generating...' : 'Generate'}
//             </button>
//         </div>
//         <div className='mt-10'>
//           <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with other in the community</p>
//           <button
//           type='submit'
//           className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
//           >
//             Share with community
//           </button>
//         </div>

//       </form>
//     </section>
//   )
// }

// export default CreatePost



// FOURTH ITERATION


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);

        // Assuming the API returns a URL to the image directly
        if (data.photo) {
          console.log("Image data found:", data.photo);
          setForm({ ...form, photo: data.photo }); // Use the direct URL from the response
        } else {
          console.error('Image generation failed, no photo returned.');
          alert('Image generation failed, no photo returned.');
        }
      } catch (error) {
        console.error("Error generating image:", error);
        alert(error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission
  
  //   if (form.prompt && form.photo) {
  //     setLoading(true);
  
  //     try {
  //       const response = await fetch('http://localhost:8080/api/v1/post', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(form),
  //       });
  
  //       // Check if the response is okay before parsing
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  
  //       const data = await response.json(); // Parse response as JSON
  //       console.log("Response data:", data); // Log the parsed response data
  //       navigate('/'); // Redirect to home page or desired route
  
  //     } catch (err) {
  //       console.error("Error submitting form:", err); // Log the error
  //       alert(err.message); // Show the error message
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   } else {
  //     alert('Please enter a prompt and generate an image');
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Handle the form submission logic
    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        });
        await response.json();
        navigate('/');
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning images through AI and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Spongebob Squarepants in the Blair Witch Project"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img 
                src={form.photo} 
                alt={form.prompt}
                className='w-full h-full object-contain' 
              />
            ) : (
              <img 
                src={preview} 
                alt="preview" 
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-t-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            { loading ? 'Sharing...' : 'Share with community' }
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
