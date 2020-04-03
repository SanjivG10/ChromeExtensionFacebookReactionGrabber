chrome.runtime.onMessage.addListener(receiver); 


var theWord = ''; 


function receiver(message,sender,sendResponse){
    theWord = message.url; 
}


