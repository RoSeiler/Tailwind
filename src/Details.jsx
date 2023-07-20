import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import { lazy } from "react";

const Details = () => {
  const { id } = useParams(); //hook proporcionado por React Router que se utiliza para acceder a los parámetros de la URL. Lo usamos para mostrar información específica según el valor del parámetro de la URL
  const results = useQuery(["details", id], fetchPet); //si no tenes details id, corré fetchPet

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">❤</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pet.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Pet Image ${index + 1}`}
            className="w-full h-auto rounded-md shadow-md shadow-black"
          />
        ))}
      </div>

      <div className="absolute p-2 text-white bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 pr-2 pt-2 bg-orange-400">
        <h1 className="text-3xl font-mono">{pet.name}</h1>
        <h2 className="mb-5">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        
        <p className="text-xl">{pet.description}</p>
      <div className="flex justify-center items-center">
        <button className="mt-5 px-4 py-2 text-lg text-white font-semibold rounded-md border border-orange-200 hover:text-white hover:bg-yellow-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2">
         Adopt {pet.name}
        </button>
     </div>
 
    </div>
    </div>
  );
  
  
  
};

export default Details;
