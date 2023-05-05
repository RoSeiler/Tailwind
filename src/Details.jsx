import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

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
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city},{pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;
