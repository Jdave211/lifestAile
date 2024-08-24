import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Define paths to your JSON files
const file1 = path.resolve('C:/Users/HP/Desktop/lifestAile/ai-tools-scraper/ai-tools-desp-data.json');
const file2 = path.resolve('C:/Users/HP/Desktop/lifestAile/ai-tools-scraper/ai-hunt-tools/ai-hunt-tools-details.json');

// Read JSON data from the two files
let data1, data2;

try {
  data1 = JSON.parse(readFileSync(file1, 'utf8'));
  data2 = JSON.parse(readFileSync(file2, 'utf8'));
} catch (err) {
  console.error(`Error reading one of the JSON files: ${err.message}`);
  process.exit(1); // Exit the script with an error code
}

// Function to combine and remove duplicates
const combineAndRemoveDuplicates = (arr1, arr2) => {
  const combined = [...arr1, ...arr2];
  const unique = Array.from(new Set(combined.map(tool => tool.name))).map(name => {
    return combined.find(tool => tool.name === name);
  });
  return unique;
};

// Combine the data and remove duplicates
const mergedData = combineAndRemoveDuplicates(data1, data2);

// Write the merged data to a new file
const outputFilePath = path.resolve('C:/Users/HP/Desktop/lifestAile/ai-tools-scraper/dataBase.json');

try {
  writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2), 'utf8');
  console.log(`Data has been merged and duplicates removed. Check ${outputFilePath}`);
} catch (err) {
  console.error(`Error writing to file ${outputFilePath}: ${err.message}`);
}
