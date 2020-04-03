
$( document ).ready(function() {

    window.addEventListener('mouseup',mouseUpped);
    
    let savedURLS = []
    let posting = false

    function mouseUpped(){
        setTimeout(findArePressed, 200);
    }

    function findArePressed(){
        const mainContainers = $('_5pcr,.userContentWrapper'); 

        const anchorContainer = mainContainers.find('._8c74');
        anchorContainer.each(function(index,eachAnchorContainer){
            const allAnchors = $(eachAnchorContainer).find('a'); 
            allAnchors.each(function(index,anchor){
                 
                if ($(anchor).attr('aria-pressed')=='true'){
                    const reaction = $(this).text()
                    const mainContainerAgain = $(this).closest('._5pcr,.userContentWrapper'); 
                    let url = $(mainContainerAgain).find('._5pcq').attr('href');
                    if(url!="#" && url)
                    {
                        console.log("NEW REACTION UPDATED")
                        if(!url.startsWith("https://")){
                            url="https://www.facebook.com"+url
                        }

                        let msg = {
                        }

                        msg[url]= reaction 
                        let totalItems = 0

                        if(!savedURLS.includes(JSON.stringify(msg))){

                            savedURLS.push(JSON.stringify(msg))

                            chrome.storage.local.set(msg, function() {
                                console.log(`DATA SAVED ${url}`)
                              });

                            chrome.storage.local.get(null,function(items){
                                totalItems = Object.keys(items).length
                                
                                if (totalItems%5==0 && !posting){
                                    posting=true
                                    const myArray = []
                                    const allKeys = Object.keys(items)
                                    for(let i=0; i<allKeys.length; i++)
                                    {
                                        let myItem = {}
                                        myItem[allKeys[i]]=items[allKeys[i]]
                                        myArray.push(JSON.stringify(myItem))
                                    }
                                
                                    $.post("https://sanjivnewapp.herokuapp.com/upload",
                                        {array:myArray},
                                        function(data, status){
                                            console.log("PASSED")
                                            chrome.storage.local.clear()
                                            posting=false
                                        }).fail(function(response){
                                            console.log("failed ",response)
                                            chrome.storage.local.clear()
                                            posting=false
                                        });
                                }
                            })

                          

                        }     
                    }                 
                }
            }) 
        })
    }

});









