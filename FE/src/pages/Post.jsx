import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BlogPosts } from "../data/blogPosts";
export function Post() {
    const { slug } = useParams()
    const post = BlogPosts[slug]
    if (!post) {
        return <h2>The blog post you've requested doesn't exist.</h2>;
    }

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
        </div>
    )
}
// export function Post() {
//   const [showForm, setShowForm] = useState(true);
//   const { register, handleSubmit, reset } = useForm();

//   function onSubmit(data) {
//     alert(`Bài viết "${data.title}" đã được tạo!`);
//     reset();
//   }

//   return (
//     <>
//       <h3>Tạo bài viết mới</h3>
//       <button onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Ẩn form" : "Hiện form"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <p>
//             <label>Tiêu đề: </label>
//             <input {...register("title", { required: true })} />
//           </p>

//           <p>
//             <label>Danh mục: </label>
//             <select {...register("category")}>
//               <option>Công nghệ</option>
//               <option>Học tập</option>
//               <option>Đời sống</option>
//             </select>
//           </p>

//           <p>
//             <label>Nội dung: </label>
//             <textarea {...register("content", { required: true })} />
//           </p>

//           <button type="submit">Tạo bài viết</button>
//         </form>
//       )}
//     </>
//   );
// }

// export function Post() {
//   const [showForm, setShowForm] = useState(true);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("Công nghệ");
//   const [content, setContent] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     alert(`Bài viết "${title}" đã được tạo!`);
//     setTitle("");
//     setContent("");
//   }

//   return (
//     <>
//       <h3>Tạo bài viết mới</h3>
//       <button type="button" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Ẩn form" : "Hiện form"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <p>
//             <label>Tiêu đề: </label>
//             <input
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               required
//             />
//           </p>

//           <p>
//             <label>Danh mục: </label>
//             <select
//               value={category}
//               onChange={(event) => setCategory(event.target.value)}
//             >
//               <option>Công nghệ</option>
//               <option>Học tập</option>
//               <option>Đời sống</option>
//             </select>
//           </p>

//           <p>
//             <label>Nội dung: </label>
//             <textarea
//               value={content}
//               onChange={(event) => setContent(event.target.value)}
//               required
//             />
//           </p>

//           <button type="submit">Tạo bài viết</button>
//         </form>
//       )}
//     </>
//   );
// }
