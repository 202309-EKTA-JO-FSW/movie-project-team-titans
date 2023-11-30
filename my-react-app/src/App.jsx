import React from "react";
import Footer from "./Footer";
import Movies from "./Movies";

export default function App() {
  return (
    <div className="App-body ">
      <body className="container  mx-auto max-w-screen-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, sit!
        Vel rem, voluptas officia hic, exercitationem at tenetur, laudantium
        repellendus accusantium doloribus facere labore. Delectus expedita
        explicabo repellat sapiente eius.
      </body>
      {/*Other Components*/}
      <Movies />
      <Footer />
    </div>
  );
}
