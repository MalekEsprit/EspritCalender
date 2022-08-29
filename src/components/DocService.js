import { savePDF } from '@progress/kendo-react-pdf';


const random = (length = 8) => {
    // Declare all characters
    let chars = '0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

}

const label = random(10)
class DocService {
  createPdf = (html) => {
    savePDF(html, { 
      paperSize: 'auto',
      fileName: label+'temp.pdf',
      margin: 3
    })
  }
}

const Doc = new DocService();
export default Doc;