import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from '../components/Navigation';
import HomePageLinks from "../components/home/HomePageLinks";
import HomePageReminders from "../components/home/HomePageReminders";

function HomePage(){

  const name = useSelector((state) => state.user.value.name);
  
  return (
    <div>
      <Navigation />
      <p> hello {name}</p>
      <HomePageReminders />
      <HomePageLinks />
    </div>
  );
}

export default HomePage;