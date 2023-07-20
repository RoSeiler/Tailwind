import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12 ">{/*my: margin top and bottom */}
      <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input type="text" className="search-input" name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select className="search-input grayed-out-disabled" id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map(
              (
                breed //En este caso, la función toma cada "breed" del arreglo y lo transforma en una opción de HTML. El parámetro "breed" representa el valor actual del arreglo que se está iterando.
              ) => (
                <option key={breed}>{breed}</option> //crear un elemento "option" para cada valor del arreglo "breeds". El valor del atributo "key" se establece en "breed", lo que asegura que cada opción tenga un identificador único en la lista de opciones.
              )
            )}
          </select>
        </label>
        <button className="rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
