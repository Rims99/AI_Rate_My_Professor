// pages/api/chat.js
//import { GenerativeLanguageServiceClient } from '@google-cloud/generativelanguage';

//const client = new GenerativeLanguageServiceClient();

//export default async function handler(req, res) {
  //if (req.method === 'POST') {
    //const { input } = req.body;
    //try {
      //const response = await client.embedText({
        //contents: [{ text: input }],
        //model: 'text-embedding-3-small',
      //});
      //res.status(200).json(response);
    //} catch (error) {
      //res.status(500).json({ error: 'Error processing request' });
    //}
  //} else {
    //res.setHeader('Allow', ['POST']);
    //res.status(405).end(`Method ${req.method} Not Allowed`);
  //}
//}