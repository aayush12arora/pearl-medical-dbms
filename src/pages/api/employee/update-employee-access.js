// pages/api/createEmployee.js
import supabase from '../sales/dbConnect';


export default async function handler(req,res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { employee_id,access_levels } = req.body;

  try {
    // Create a new employee in the employees table
    const { data: newAccess,error } = await supabase
      .from('employee_access')
      .insert([
        {

          access_levels,
        },
      ]).eq('employee_id',employee_id).select();

    if (error) {
      throw error;
    }

    // Fetch the created employee's ID
    const access_key_id = newAccess[0]?.access_key_id;


    res.status(200).json({ access_key_id: access_key_id,access_levels: access_levels,message: 'Updated Acess successfully' });


  } catch (error) {
    console.error('Error creating employee:',error);
    res.status(500).json({ message: 'Internal Server Error',error });
  }
}
