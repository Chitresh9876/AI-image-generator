import React,{useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name : '',
    prompt : '',
    photo : '',
  });
  const [generatingImage, setGenerationImage] = useState(false)
  const [loading, setLading]  = useState(false);

  const generatingImg = async() => {
    if(form.prompt){
      try {
        setGenerationImage(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: "POST",
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg:base64,${data.photo}`})
      } catch (error) {
        alert(error);
      }
      finally{
        setGenerationImage(false);
      }
    } else{
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = () => {

  }
  const handleChange = (e) => {
    console.log(e.target.value);
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  }

  return (
    <section className='max-w-7xl mx-auto'>
    <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Create imagination and visually stunning images generated by DALL-E AI and share them with community</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
          LableName = 'Your Name'
          type = 'text'
          name = 'name'
          placeholder = 'John Doe'
          value = {form.name}
          handleChange = {handleChange}
          />

          <FormField
          LableName = 'Prompt'
          type = 'text'
          name = 'prompt'
          placeholder = 'a sea otter with a pearl earring" by Johannes Vermeer'
          value = {form.prompt}
          handleChange = {handleChange}
          isSupriseMe
          handleSurpriseMe = {handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {
            form.photo ? (
              <img src={form.photo} 
              alt={form.prompt}
              className='w-full h-full object-contain'
              />
            ) : (
              <img src={preview} 
              alt='Preview'
              className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {
              generatingImage && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader/>
                </div>
              )
            }

          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
          type = 'button'
          onClick={ generatingImg }
          className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImage ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created  the image you want, you can share it in the community</p>
          <button
          type = 'submit'
          className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            Share with the community
          </button>
        </div>
      </form>
      </section>
  )
}

export default CreatePost
