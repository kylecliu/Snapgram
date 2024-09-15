import { useState } from "react"
import useDisplayToast from "./useDisplayToast";

const usePreviewImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useDisplayToast();
    const maxSize = 1024 * 1024 * 3 //3MiB

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file) {

            if(file.size > maxSize) {

                toast("Error", "File size must be less than 3MB", "error");
                setSelectedFile(null);
                return;

            } 

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                
                setSelectedFile(reader.result) 

            }

        } else {

            toast("Error", "Error loading file!", "error");
            setSelectedFile(null);
            
        }

    }

    return { selectedFile, handleImageChange, setSelectedFile }

}

export default usePreviewImage
