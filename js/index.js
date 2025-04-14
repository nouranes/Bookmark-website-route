// & HTML Elements
var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
tableContainer =document.getElementById("tableContainer")
var nameRegex =/^[A-Z][a-z]{3,}$/
var urlRegex=/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}([\/\w.-]*)*\/?$/
var customModal =document.getElementById("customModal")
// var closeDialogBtn =document.getElementById("closeDialogBtn")



// *App variables
var siteList =JSON.parse(localStorage.getItem("sites"))||[]
displayAllSites()

// ^functions
function addSite() {
    if (Validate(nameRegex,nameInput)&&Validate(urlRegex,urlInput)){
        var site ={
            name : nameInput.value,
            url: urlInput.value,
        }
        siteList.push(site);
        localStorage.setItem("sites",JSON.stringify(siteList))
        displaySite(siteList.length - 1);
        // console.log(siteList)
        clearInput()

    }else{
        customModal.classList.remove("d-none") 
    }
    

}
function displaySite (index){
    var siteHTML=`
     
        <tr>
            <th scope="row">${index+1}</th>
            <td>${siteList[index].name}</td>
            <td ><a href="${siteList[index].url}" target="_blank" class="btn btn-info"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteSite()"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
                      
                    
    `
    tableContainer.innerHTML+=siteHTML
}
function displayAllSites (){
    for (var i =0 ;i<siteList.length ;i++){
        displaySite(i);
    }
}
function deleteSite(index) {
    siteList.splice(index ,1);
    localStorage.setItem("sites",JSON.stringify(siteList));
    
    tableContainer.innerHTML=""
    displayAllSites()


}
function Validate(regex ,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none")

        return true ;
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.remove("d-none")
        return false ;

    }
}
function closeBtn(){
    customModal.classList.add("d-none")

}
function clearInput(){
    nameInput.value = "";
    urlInput.value = "";
}


