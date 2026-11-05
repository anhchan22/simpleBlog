import { useState } from "react";

export function Contact(){

    const [formData, setFormData] = useState({name:"", phone:"", address:""})
    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        alert(`Cam on ${formData.name}`)
        setFormData({name:"", phone:"", address:""})
    }

    return(
        <div>
            <h3>Form lien he</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Ten: </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>So dien thoai: </label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                                <div>
                    <label>Dia chi: </label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <button type="submit">Gui thong tin</button>
            </form>
        </div>
    )
}