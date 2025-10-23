import React, { useEffect, useState } from "react";
import HomePlaceholder from "./HomePlaceholder";
import FormList from "./FormList";
import { useNavigate } from "react-router-dom";

import {getAllForms} from "../api/formService";


export default function FormBuilderHome() {
   const navigate = useNavigate();

  const [forms, setForms] = useState([
   
  ]);
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(()=>{
    getForms();
  },[]);

  const handleCreateForm = () => {
    //console.log('Navigate to Create Form Page');
     navigate("/create-form"); //  navigate to Create Form page
  };
  
  const getForms = async() =>{
    const response = await getAllForms();
    //console.log(response)
     console.log('Forms data:', response.data); // Check the actual structure
    console.log('First form:', response.data[0]); // Check first form details
    setForms(response.data)
  }

  const handleDelete = (id) => {
       setForms(forms?.filter((form) => form.id !== id));
       setOpenMenuId(null);
  };

  return forms?.length === 0 ? (
    <HomePlaceholder onCreate={handleCreateForm} />
  ) : (
    <FormList
      forms={forms}
      search={search}
      setSearch={setSearch}
      openMenuId={openMenuId}
      setOpenMenuId={setOpenMenuId}
      handleCreateForm={handleCreateForm}
      handleDelete={handleDelete}
    />
  );
}
