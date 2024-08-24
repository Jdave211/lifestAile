import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Initialize Supabase client with the correct API key
const supabaseUrl = 'https://fzkoyglygkwptbdxqete.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a295Z2x5Z2t3cHRiZHhxZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NDE0MDEsImV4cCI6MjAzNDIxNzQwMX0.wJPR9Bk3nE_kSt8To6IBA-8q_R9MQRvN2uVqaMdsyi4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to validate and format data
function validateData(toolsData) {
  return toolsData.map(tool => {
    // Remove id if it's empty or not provided
    if (!tool.id || tool.id === '' || isNaN(tool.id)) {
      delete tool.id;
    } else {
      tool.id = tool.id.toString();
    }

    if (tool.rating === '' || isNaN(tool.rating)) {
      tool.rating = null;
    } else {
      tool.rating = tool.rating.toString();
    }

    // Ensure subcategory is an array
    if (!Array.isArray(tool.subcategory)) {
      tool.subcategory = [];
    }

    return tool;
  });
}

// Function to insert data
async function insertData() {
  try {
    // Read the JSON file
    const filePath = join(__dirname, 'dataBase.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    let toolsData = JSON.parse(jsonData);

    // Validate and format the data
    toolsData = validateData(toolsData);

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('tools')
      .insert(toolsData);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully');
    }
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }
}

insertData();
