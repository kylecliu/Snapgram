import { useState } from "react"
import useDisplayToast from "./useDisplayToast";

const usePreviewImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useDisplayToast();
    const maxSize = 1024 * 1024 * 2 //2MB

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file) {

            if(file.size > maxSize) {

                toast("Error", "File size must be less than 2MB", "error");
                setSelectedFile(null);
                return;

            } 

            const reader = new FileReader();

            reader.onloadend = () => {
                
                setSelectedFile(reader.result)

            }

            reader.readAsDataURL(file);


        } else {

            toast("Error", "Error loading file!", "error");
            setSelectedFile(null);
            
        }

    }

    return { selectedFile, handleImageChange, setSelectedFile }


}

export default usePreviewImage
