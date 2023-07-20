import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useState, lazy, Suspense} from "react";
/*
import Details from "./Details";
import SearchParams from "./SearchParams";
*/

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, //los datos en caché nunca caducarán y siempre se utilizarán si están disponibles
      cacheTime: Infinity, //los datos en caché nunca serán eliminados y permanecerán en caché hasta que la aplicación se cierre o se elimine
    },
  },
});
//BrowserRouter ¿me povee el contexto para que yo pueda escribir todo lo de adentro?
const App = () => {
  return (
    <div className="p-0 m-0" style={{background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)"}}> {/* -m-7(para m negativo, mr-1 (margin right por ej)) */}
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div className="loading-pane">
          <h2 className="loader">🐶</h2>
          </div>
        }
        >
        <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500" >  {/* bg-gradient-to-b: background gradient to bottom*/}
          <Link className="text-6xl text-white hover:text-gray-200" to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          {/*La primera prop, path, indica la URL que activará esta ruta. La segunda prop, element, indica el componente de React que se debe renderizar cuando la ruta es activada. En este caso, es el componente <Details />.*/}
          <Route path="/" element={<SearchParams />} />
        </Routes> 
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
    </div>
  );
};

/* Todo este codigo lo usabamos para .js y teniamos que importar react
  return React.createElement(
    "div", //le indicamos el elemento q va crear
    {}, //los atributos del div
    [
      React.createElement("h1", {}, "Adopt Me!"), //lo q va adentro del div - el children
      React.createElement(Pet, {
        name: "Luna",
        animal: "dog",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "bird",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "cat",
        breed: "Mixed",
      }),
    ]
  );*/

const container = document.getElementById("root");
const root = createRoot(container); //toma como argumento el elemento HTML donde se montará la aplicación.
//root.render(React.createElement(App)); //le pedimos que muestre el componente App
root.render(<App />); //ahora con jsx lo pedimos así
