// export default async function handler(req, res) {
//     const { method } = req;
  
//     const apiUrl = 'https://service.pace-unv.cloud/api/notes';
  
//     try {
//       let response;
//       switch (method) {
//         case 'POST':
//           response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req.body),
//           });
//           break;
//         case 'GET':
//           response = await fetch(apiUrl, {
//             method: 'GET',
//           });
//           break;
//         default:
//           res.setHeader('Allow', ['POST', 'GET']);
//           return res.status(405).end(`Method ${method} Not Allowed`);
//       }
  
//       const data = await response.json();
//       return res.status(response.status).json(data);
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }