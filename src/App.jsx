import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
import SearchParams from "./SearchParams";

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          {/*La primera prop, path, indica la URL que activará esta ruta. La segunda prop, element, indica el componente de React que se debe renderizar cuando la ruta es activada. En este caso, es el componente <Details />.*/}
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
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
