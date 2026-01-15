import React from 'react';
import { BounceLoader } from "react-spinners";


const LoadingPage = () => {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <BounceLoader color="#03373d" size={70} loading speedMultiplier={1.5} />
      </div>
    );
};

export default LoadingPage;