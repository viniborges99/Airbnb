import React from "react";
import CasaDeCampo from "../uploads/CasaDeCampo.jpeg";

const item = () => {
  return (
    <a href="/" className="flex flex-col gap-3">
      <img
        src={CasaDeCampo}
        alt="Casa no campo"
        className="aspect-square rounded-2xl object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold">Cabo frio, Rio de janeiro</h3>
        <p className="truncate text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita vero
          eius natus id cum reprehenderit dolor animi voluptatem iusto, minima
          ut pariatur sapiente? Reprehenderit quis quasi dignissimos,
          repudiandae consequatur ab. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Deleniti adipisci soluta odit nihil nam quisquam
          porro consequuntur nostrum omnis minus similique vitae quos, harum
          debitis nulla ex quis facilis dignissimos? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Incidunt, cum unde beatae iste adipisci
          nemo voluptatibus aliquam hic sunt laudantium deserunt, debitis in
          omnis esse commodi, fuga cumque impedit excepturi!
        </p>
      </div>
      <p>
        <span className="font-semibold">R$ 550 por noite</span>
      </p>
    </a>
  );
};

export default item;
