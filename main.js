
const fs = require("fs");
fs.readFile("heartrate.json", (error, data) => 

{

  if (error) {

    console.error(error);

    throw err;
  }
  const user = JSON.parse(data);

 // console.log(user);

    const processedData = user.reduce((acc, item) => 
  {
      const user = item["timestamps"]["startTime"].split("T")[0];
      const existingDate = acc.find((d) => d.user === user);
    
      if (existingDate) 
      {
        existingDate.min = Math.min(existingDate.min, item["beatsPerMinute"]);
        existingDate.max = Math.max(existingDate.max, item["beatsPerMinute"]);

        existingDate.latestDataTimestamp = Math.max
        (
          existingDate.latestDataTimestamp,
          item["timestamps"]["startTime"]
        );
      } else 
      {
        acc.push
        ({
          user,
          min: item["beatsPerMinute"],
          max: item["beatsPerMinute"],
          median: 0,
          latestDataTimestamp: item["timestamps"]["startTime"],
        });
      }
    
      return acc;
    }, []);
    
    processedData.forEach((item) => 
    {
      const bpmData = user.filter((d) => d["timestamps"]["startTime"].split("T")[0] === item.user);
      item.median = bpmData.sort((a, b) => a["beatsPerMinute"] - b["beatsPerMinute"])[
        Math.floor(bpmData.length / 2)
      ]["beatsPerMinute"];
    });
    

   // console.log(processedData);   

   //fs.writeFile('report.text',processedData)
     
          //processedData.parse('output.json');
   // const jsonString = JSON.stringify(processedData);
   // console.log(jsonString);



    fs.writeFile('./output.json',JSON.stringify(processedData),err =>
    {

if(err) 
{
console.log(err);

}
else
{
console.log('finally i have done it I do not have javascript experinace but i have learn concept which were far differnt from java in term of syntax and yes output.json  file is also generated');
}

  });

   // const obj = JSON.parse(json);


});