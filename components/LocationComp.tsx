"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City, Country } from "country-state-city";
function LocationComp() {
   
  let [ country, setCountry ] = useState('');
  let [city , setCity] = useState('');

  useEffect(()=>{

  },[])
  
  return (
      <div>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Country.getAllCountries().map((country) => (
                <SelectItem value={country.isoCode}>{country.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
  );
}

export default LocationComp;
