import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jsPDF from 'jspdf'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import html2canvas from 'html2canvas';
import { height, width } from '@mui/system';

import Calender from './Calender';



export default function Email() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(['']);
    const [attachment, setAttachment] = useState('')

 
    

    

    const [classes, setClasses] = useState([
      {id: 1, ref: "3A1", emails: ["mako.iva@gmail.com","makowin99@gmail.com"] , joint: "C:/Users/asus/Downloads/9827877442temp.pdf"},
      {id: 2, ref: "3A2", emails: ["makowin99@gmail.com"], joint: "C:/Users/asus/Downloads/8906961068temp.pdf"},
      {id: 3, ref: "3A3", emails: ["makowin99@gmail.com"], joint: "C:/Users/asus/Downloads/8906961068temp.pdf"},
    ])

    
    const looplist = classes.map(clasa => (clasa.emails.join(', ')))

    const [section, setSection] = useState([
      {id: 1, ref: "3A"},
      {id: 2, ref: "3B"},
    ])
    
   
   //Send emails in loop for each class in the section but its still buggy  
    const submitHandler = async (e) => {
      e.preventDefault();
        for(let i=0 ; i<selectedClass.length ; i++){   
          setEmail(selectedClass[i].emails)
          setAttachment(selectedClass[i].joint)
         

        if (!subject || !message || !attachment || !email){
          return toast.error('Please fill email, subject and message');
        }
      }
        try {
          setLoading(true);
          const { data } = await axios.post(`/api/email`, {
            email,
            subject,
            message,
            attachment,
          });
          setLoading(false);
          toast.success(data.message);
        } catch (err) {
          setLoading(false);
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        }
      
      console.log(email) 
      };

      function selectClass(id){
        const sections = section.find(sections => sections.ref === id)  
        const classList = classes.filter(name => name.ref.includes(sections.ref)).map(filteredName => (filteredName))       
        setSelectedClass(classList) 
        setEmail('')
        setAttachment('')
       // console.log(classList);
        
         
        
              
      }
     
      //Since i made a pdf component for the calender this part is not needed(only wehn testing the Email component separatly)
      function generatePDF(){
     /* const random = (length = 8) => {
          // Declare all characters
          let chars = '0123456789';
      
          // Pick characers randomly
          let str = '';
          for (let i = 0; i < length; i++) {
              str += chars.charAt(Math.floor(Math.random() * chars.length));
          }
      
          return str;
      
      };
       const label = random(10)

   var doc = new jsPDF();
        doc.html(document.getElementById('Calender'))
        doc.save(label+"temp.pdf");
         setAttachment("C:/Users/asus/Downloads/"+label+"temp.pdf")
      
        
        

      const input = document.getElementById('divToPrint');
        html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save(label+"temp.pdf");
       
      })
     setAttachment("C:/Users/asus/Downloads/"+label+"temp.pdf")*/
       


     
       }
   
   const list = section.map(sections => (sections.ref))
  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
    <header className="App-header" ip="forpdf">
    <h1>Send Email</h1>  
   
        <div>
       
<Autocomplete
  disablePortal
  id="combo-box-demo" 
  options={list}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Classes" />}
  onChange={(event, value) => selectClass(value)} 
  
/>
</div>
    

    <h3> {" "}
        {selectedClass == null
        ? "Select a class"
        : <h3>File ready <button id = "generate" onClick={() => generatePDF()} type="primary">Convert</button></h3>
        }
        </h3>
      
      
    
        
        
        <div id="divToPrint" className="mt4" >
        <div>Note: Here the dimensions of div are same as A4</div> 
        <div>You Can add any component here</div>
      </div>
     
      <form onSubmit={submitHandler}>
        
  
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label></label>
          <button disabled={loading} type="submit">
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </header>
    </div>
  )
}
