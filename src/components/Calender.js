import { useState } from 'react';


import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events from "./events";
import PdfContainer from './PdfContainer';
import Doc from './DocService';


// a calender test component ( check below line 62 where to add the pdf container)
export default function Calender() { 

 const [selectedClass, setSelectedClass] = useState(['']);

const [section, setSection] = useState([
    {id: 1, ref: "3A1"},
    {id: 2, ref: "3A2"},
  ])

function selectClass(id){
    const sections = section.find(sections => sections.ref === id)         
    setSelectedClass(sections) 

    
     
    
          
  }
  const list = section.map(sections => (sections.ref))
 

  return (  
    <div>
        <div>
       
         <Autocomplete
         disablePortal
         id="combo-box-demo" 
         options={list}
         sx={{ width: 300 }}
         renderInput={(params) => <TextField {...params} label="Classes" />}
         onChange={(event, value) => selectClass(value)} 
         
       />
         <h3> {" "}
        {selectedClass == null
        ? "Select a class"
        : <h>ready</h>
        }
        </h3>
       </div>
      <PdfContainer createPdf={(html) => Doc.createPdf(html)}> 
      <section className="flex-column">
              <h2 className="flex">Emploi du temp</h2>
              <section className="flex-row">
              </section>
        <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek"
        }}
        plugins={[timeGridPlugin]}
        events={events}
      />
      </section>
  </PdfContainer>
 </div>
  )
}
