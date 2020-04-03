
let backgroundPage = chrome.extension.getBackgroundPage(); 
let url = backgroundPage.theWord
let answers = []

async function callURL (url){
    const response = await fetch(url, {
        method: 'GET',
      });
    const myJson = await response.json(); 
    if (myJson.title){
        console.log('SOme Error Occured ',myJson.title)
    }
    else {
        let topMostJson = myJson[0]; 
        let meanings = topMostJson["meaning"]; 
        let keys = Object.keys(meanings)
        
        for (let i=0; i<keys.length; i++)
        {
            let differentMeaningOfOne = meanings[keys[i]]
            for (eachMeaning of differentMeaningOfOne)
            {
                answers.push(eachMeaning.definition)
            }
        }
        let list = document.createElement('ol');

        answers.forEach(function(element){
            let entry = document.createElement('li');
            entry.appendChild(document.createTextNode(element));
            list.appendChild(entry);
        })

        document.getElementById("myList").appendChild(list);


    }
}

callURL(url)







