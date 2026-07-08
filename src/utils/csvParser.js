/**
 * Parses raw CSV text into an array of objects based on header row.
 * Safely handles quoted fields containing commas.
 */
export function parseCSV(csvText) {
  if (!csvText) return [];
  
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      currentField += '"';
      i++; // skip next quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField);
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentLine.push(currentField);
      lines.push(currentLine);
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Push the last field/line if not empty
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField);
    lines.push(currentLine);
  }
  
  if (lines.length < 2) return []; // Only header or empty
  
  const headers = lines[0].map(h => h.trim().toLowerCase());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    // Skip completely empty rows
    if (row.length === 1 && !row[0].trim()) continue;
    
    const obj = {};
    headers.forEach((header, index) => {
      let val = row[index] ? row[index].trim() : '';
      
      // If this is the link or image field, clean up potential markdown formatting like [link](url)
      if ((header === 'link' || header === 'image') && val.match(/\[.*\]\((.*)\)/)) {
        val = val.match(/\[.*\]\((.*)\)/)[1];
      } 
      
      // For links specifically, ensure http protocol is present to avoid relative path navigation
      if (header === 'link' && val && !val.startsWith('http') && !val.startsWith('/')) {
        val = 'https://' + val;
      }
      
      obj[header] = val;
    });
    
    // Ensure we have the required keys based on criteria
    data.push(obj);
  }
  
  return data;
}
