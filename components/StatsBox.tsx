const StatsBox = ({ label, value }: { label: string; value: string }) => {
   return (
      <div className="border border-gray-300 p-6 text-center rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
         <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
         <div className="text-gray-600 text-sm uppercase tracking-wide">{label}</div>
      </div>
   );
};

export default StatsBox;