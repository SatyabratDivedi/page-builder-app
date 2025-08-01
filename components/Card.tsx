const Card = ({ title, description }: { title: string; description: string }) => {
   return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
         <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
         <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
   );
};

export default Card;