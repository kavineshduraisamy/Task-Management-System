const generateHTMLRows = (results) => {
    const htmlRows = results.map((task,index) => `
    
      <tr>
        <th>${index + 1}</th>
        <td>${task.taskname}</td>
        <td>${task.username}</td>
      </tr>
    `).join('');
    
    return htmlRows;
  };
  
  const htmlTemplate =(results)=> `
  <h1>Assigned Tasks</h1>
  <table border="1">
    <tr><td>S.no</td><th>Task Name</th><th>Assigned To</th></tr>
    ${generateHTMLRows(results)}
  </table>
  `;
  
  module.exports = {
    generateHTMLRows,
    htmlTemplate,
    
  };
  