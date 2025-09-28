import React from 'react'
import { useForm } from "react-hook-form"

function PostLost() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors ,isSubmitting ,isSubmitSuccessful},
      } = useForm();

     async function onSubmit(data){
        await new Promise((resolve) =>{
          setTimeout(resolve , 2000)
        });
        console.log("Data is: ",data);
      }

  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>First Name:  </label>
             <input {...register("firstName", { required: true, maxLength:{value:20,message:'Enter minimum 20 char'} })} />
             {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <br />
        <div>
            <label>Middle Name:  </label>
            <input {...register("middleName" , { required: true, maxLength: 20 })} />
        </div>
        <br />
        <div>
            <label>Last Name: </label>
            <input {...register("lastName", { required: true, maxLength: 20 })} />
        </div>
        <br />
        <input type="submit" 
        value={isSubmitSuccessful ? "Submitted" : "Submit"}
        disabled={isSubmitSuccessful}
        />
       
     </form>
      </>
  )
}

export default PostLost
