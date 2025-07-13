import React from "react";

// export default function Loader() {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 animate-fade">
//       <div className="flex items-center gap-6">
//         <div
//           className="inline-block h-20 w-20 animate-ping rounded-full bg-[#f46322] opacity-80"
//           role="status"
//         >
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     </div>
//   );
// }
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex mx-auto my-auto items-center justify-center bg-white/50 animate-fade">
      <RingLoader color="#f9172b" size={80} />
    </div>
  );
};

export default Loader;
