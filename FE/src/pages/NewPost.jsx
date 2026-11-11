import { useState } from "react"
import { useForm } from 'react-hook-form'
export function NewPost() {
    const [newPost, setNewPost] = useState("")
    const {register, handleSubmit, formState: {errors}} = useForm()
    const onSubmit = async(data)=>{
        const post = JSON.stringify(data)
        try {
            const response = await fetch("http://localhost:3000/posts",{
                method: "post",
                headers: {
                    'Accept': 'application /json',
                    'Content-Type': 'application/json'
                },
                body: post
            })
            if(response.ok) setNewPost("Them post thanh cong.")
        } catch (error) {
            console.log("loi them post", error)
            setNewPost("Them post that bai.")
        }
    }

    return (
        <>
            <h3>Day la trang tao bai dang</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Slug: </label>
                <input type="text" {...register("slug", {required: true})} />
                <br />
                {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
                <br />
                <label>Title: </label>
                <input type="text" {...register("title", {required: true})}/>
                <br />
                {errors.title && <div style={{ color: "red" }}>Title is required</div>}
                <br />
                <label>Description: </label>
                <input type="text" {...register("description", {required: true})}/>
                <br />
                {errors.description && <div style={{ color: "red" }}>Description is required</div>}
                <br />
                <button type="submit">Add post</button>
                <p>{newPost}</p>
            </form>
        </>
    )
}