const CTA = ({ message, buttonText }: { message: string; buttonText: string }) => {
   return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg text-center border border-blue-100">
         <p className="text-gray-700 mb-6 text-lg">{message}</p>
         <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
            {buttonText}
         </button>
      </div>
   );
};

export default CTA;