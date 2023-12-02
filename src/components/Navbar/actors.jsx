import React from "react";
import ActorsPage from "@/pages/Actors/index";
import Link from "next/link";

function ActorsLink() {
  return (
     <Link href={`/Actors/`}> Actors</Link> 
  ) 
}

export default ActorsLink;
