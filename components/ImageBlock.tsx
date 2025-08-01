import Image from "next/image";

const ImageBlock = ({ src, alt }: { src: string; alt: string }) => {
   return (
      <div className="my-6 rounded-lg overflow-hidden shadow-md">
         <Image 
            src={src} 
            alt={alt} 
            width={400} 
            height={300} 
            className="w-full h-auto object-cover"
         />
      </div>
   );
};

export default ImageBlock;