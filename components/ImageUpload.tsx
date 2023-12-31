import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';


interface ImageUploadProps {
    onChange: (base64: string) => void;
    label?: string;
    disabled?: boolean;
    value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, disabled, onChange, value }) => {

  const [base64, setBase64] = useState(value || "");

  const handleChange = useCallback((base64: string) => {
    onChange(base64)
  }, [onChange]);

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
        if(reader.readyState === 2) {
            // setBase64(reader?.result as string)
            setBase64(event.target.result)
            handleChange(event.target.result)
        }
    }

    reader.readAsDataURL(file);

  }, [handleChange]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled: disabled,
    accept: {
        'image/jpg': [],
        'image/png': [],
    },
    
  });

  return (
    <div 
    {...getRootProps({
        className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
    })}
    >
        <input {...getInputProps()} />
        {
            base64 
            ? (<div className='flex items-center justify-center '>
                    <Image 
                    src={base64}  
                    height="100"
                    width="100"
                    alt="Upload Image"
                    />
                </div>
            )
            : ( <p className='text-white'>{label}</p> )
        }
    </div>
  )
}

export default ImageUpload