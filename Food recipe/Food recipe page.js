// By Degod and Flavy Esso (the boss of this project)
//Page link : file:///D:/VS%20Code%20Programs/Code%20from%20phone/Webpage/Project/Food%20recipe%20page.html

let body = document.body;
let recipesInfoList = [];
let bodyPages = [];
let displayPageList = [];

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", getInformation);
submitButton.addEventListener("click", addDisplayPage);


function getInformation() {
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    let email = document.getElementById("email");
    let recipeName = document.getElementById("recipeName");
    let cookingTime = document.getElementById("cookingTime");
    let noOfPeople = document.getElementById("noOfPeople");
    let ingredientsList = document.getElementById("ingredientsList");
    let cookingDirections = document.getElementById("cookingDirections");
    let inputPage = document.getElementById("inputPage");
    
    let recipeInfo = {
        id : `${recipesInfoList.length}`,
        rating : "No rating yet",
        name : name.value,
        age : age.value,
        gender : gender.value,
        email : email.value,
        recipeName : recipeName.value,
        cookingTime : cookingTime.value,
        noOfPeople : noOfPeople.value,
        ingredientsList : ingredientsList.value,
        cookingDirections : cookingDirections.value,
        inputPage : inputPage
    };
    recipesInfoList.push(recipeInfo);
    
    
    function saveInputPage() {
        let formList = [name, age, gender, email, recipeName, cookingTime, noOfPeople, ingredientsList, cookingDirections];
        for (let i=0; i<formList.length; i++) {
            if (formList[i].tagName === "SELECT") {
                formList[i].value = formList[i].children[0];
            } else {
                formList[i].value = "";
            }
        }
    }
    
    saveInputPage();

    if (bodyPages.length === 0) {
        bodyPages.push(inputPage)
    }
    
    clearPage();
};



function clearPage() {
    body.innerHTML = "";
}

function addDisplayPage() {
    if (bodyPages.length === 1) {
        let displayPage = document.createElement("div");
        displayPage.id = "displayPage";
        
        let createRecipeButton = document.createElement("button");
        createRecipeButton.innerHTML = "Add a new recipe";
        createRecipeButton.id = "createRecipeButton";
        createRecipeButton.addEventListener("click", addInputPage);
        displayPage.appendChild(createRecipeButton);

        bodyPages.push(displayPage);
    }
    let displayPage = bodyPages[1];
    let recipe = recipesInfoList[recipesInfoList.length-1];
    let recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipeItem");
    recipeContainer.id = `recipe${recipe.id}`;
    recipeContainer.addEventListener("dblclick", function () {showDisplayButton(this);});

    let H_recipeName = document.createElement("h2");
    let P_cookingTime = document.createElement("p");
    let P_noOfPeople = document.createElement("p");
    let P_rating = document.createElement("p");
    let P_name = document.createElement("p");

    H_recipeName.innerHTML = recipe.recipeName;
    P_cookingTime.innerHTML = `Cooking time : ${recipe.cookingTime} minutes`;
    if (recipe.noOfPeople === 1) {
        P_noOfPeople.innerHTML = `For : ${recipe.noOfPeople} Person`;    
    } else {
        P_noOfPeople.innerHTML = `For : ${recipe.noOfPeople} People`;
    }
    if (recipe.rating === "No rating yet") {
        P_rating.innerHTML = `Rating : ${recipe.rating}`;
    } else {
        P_rating.innerHTML = `Rating : ${recipe.rating}/10`;
    }
    P_name.innerHTML = `By ${recipe.name}`;

    H_recipeName.classList.add("center");
    P_name.classList.add("center");

    recipeContentList = [H_recipeName, P_cookingTime, P_noOfPeople, P_rating, P_name];
    recipeContentList.forEach(element => {
        recipeContainer.appendChild(element);
    });

    displayPageList.push(recipeContentList);
    displayPage.appendChild(recipeContainer);
    body.appendChild(displayPage);


}


function addInputPage() {
    clearPage();
    body.appendChild(bodyPages[0]);
}

function showDisplayButton(recipeContainer) {
    let displayButton = document.createElement("button");
    displayButton.innerHTML = "Display";
    displayButton.addEventListener("click", function () {addRecipePage(this.parentElement)})
    
    let cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.addEventListener("click", function () {cancelDisplay(this.parentElement)});
    cancelButton.id = "cancel";

    recipeContainer.innerHTML = "";

    recipeContainer.appendChild(displayButton);
    recipeContainer.appendChild(cancelButton);
}

function cancelDisplay(recipeContainer) {
    let displayPage = bodyPages[1];
    let id = recipeContainer.id;
    recipeContainer.innerHTML = "";
    for (let i = 0; i < displayPage.children.length; i++) {
        if (displayPage.children[i].id === id) {
            let recipeContainer = displayPage.children[i];
            let initialContent = displayPageList[i-1];
            for (let j = 0; j < initialContent.length; j++) {
                recipeContainer.appendChild(initialContent[j]);    
            }
            clearPage();
            body.appendChild(bodyPages[1]);
        }   
    }
}

function addRecipePage(recipeContainer) {
    clearPage();
    let recipePage = document.createElement("div");
    recipePage.id = "recipePage";
    recipePage.addEventListener("dblclick", showEditButton);
        
    let goBackButton = document.createElement("button");
    goBackButton.innerHTML = "<- Back";
    goBackButton.id = "goBackButton";
    goBackButton.addEventListener("click", goBackDisplayPage)
    recipePage.appendChild(goBackButton);

    let recipeId = "";
    let digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i< recipeContainer.id.length; i++) {
        if (digit.includes(recipeContainer.id[i])) {
            recipeId += recipeContainer.id[i];
        }
    }
    recipeId = recipeId*1;

    let H_recipeName = document.createElement("h1");
    H_recipeName.innerHTML = recipesInfoList[recipeId].recipeName;
    H_recipeName.classList.add("center");
    
    let cookInfoFieldset = document.createElement("fieldset");
    let cookInfoLegend = document.createElement("legend");
    cookInfoLegend.innerHTML = "Cook Information";
    cookInfoFieldset.appendChild(cookInfoLegend);

    let P_name = document.createElement("p");
    let P_age = document.createElement("p");
    let P_gender = document.createElement("p");
    P_name.innerHTML = `Name : ${recipesInfoList[recipeId].name}`;
    P_age.innerHTML = `Age : ${recipesInfoList[recipeId].age}`;
    P_gender.innerHTML = `Gender : ${recipesInfoList[recipeId].gender}`;

    cookInfoFieldset.appendChild(P_name);
    cookInfoFieldset.appendChild(P_age);
    cookInfoFieldset.appendChild(P_gender);

    let P_cookingTime = document.createElement("p");
    let P_noOfPeople = document.createElement("p");
    let P_ingredientsList = document.createElement("p");
    let P_cookingDirections = document.createElement("p");

    P_cookingTime.innerHTML = `Cooking time : ${recipesInfoList[recipeId].cookingTime}`;
    P_noOfPeople.innerHTML = `No of People  : ${recipesInfoList[recipeId].noOfPeople}`;
    P_ingredientsList.innerHTML = `List of ingredients : 
    ${recipesInfoList[recipeId].ingredientsList}`;
    P_cookingDirections.innerHTML = `How to cook it : 
    ${recipesInfoList[recipeId].cookingDirections}`;

    let recipePageContent = [H_recipeName, cookInfoFieldset, P_cookingTime, P_noOfPeople, P_ingredientsList, P_cookingDirections];

    recipePageContent.forEach((element) => recipePage.appendChild(element));

    body.appendChild(recipePage);

    function goBackDisplayPage() {
        clearPage();
        body.appendChild(bodyPages[1]);
    }

    function showEditButton() {
        clearPage();
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", function () {editRecipe(recipeId)});

        let cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Cancel";
        cancelButton.addEventListener("click", cancelEdit);

        body.appendChild(editButton);
        body.appendChild(document.createElement("br"));
        body.appendChild(cancelButton);
    }

    function cancelEdit() {
        clearPage();
        body.appendChild(recipePage);
    }
}

function editRecipe(recipeId) {
    clearPage();

    body.appendChild(bodyPages[0]);

    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    let email = document.getElementById("email");
    let recipeName = document.getElementById("recipeName");
    let cookingTime = document.getElementById("cookingTime");
    let noOfPeople = document.getElementById("noOfPeople");
    let ingredientsList = document.getElementById("ingredientsList");
    let cookingDirections = document.getElementById("cookingDirections");

    let recipe = recipesInfoList[recipeId];

    name.value = recipe.name;
    age.value = recipe.age;
    gender.value = recipe.gender;
    email.value = recipe.email;
    recipeName.value = recipe.recipeName;
    cookingTime.value = recipe.cookingTime;
    noOfPeople.value = recipe.noOfPeople;
    ingredientsList.value = recipe.ingredientsList;
    cookingDirections.value = recipe.cookingDirections;

    function changeInformation() {
        recipe.name = name.value;
        recipe.age = age.value;
        recipe.gender = gender.value;
        recipe.email = email.value;
        recipe.recipeName = recipeName.value;
        recipe.cookingTime = cookingTime.value;
        recipe.noOfPeople = noOfPeople.value;
        recipe.ingredientsList = ingredientsList.value;
        recipe.cookingDirections = cookingDirections.value; 
    }
    
    function updateDisplay() {
        
        let H_recipeName = document.createElement("h2");
        let P_cookingTime = document.createElement("p");
        let P_noOfPeople = document.createElement("p");
        let P_rating = document.createElement("p");
        let P_name = document.createElement("p");

        H_recipeName.innerHTML = recipe.recipeName;
        P_cookingTime.innerHTML = `Cooking time : ${recipe.cookingTime} minutes`;
        if (recipe.noOfPeople === 1) {
            P_noOfPeople.innerHTML = `For : ${recipe.noOfPeople} Person`;    
        } else {
            P_noOfPeople.innerHTML = `For : ${recipe.noOfPeople} People`;
        }
        if (recipe.rating === "No rating yet") {
            P_rating.innerHTML = `Rating : ${recipe.rating}`;
        } else {
            P_rating.innerHTML = `Rating : ${recipe.rating}/10`;
        }
        P_name.innerHTML = `By ${recipe.name}`;

        H_recipeName.classList.add("center");
        P_name.classList.add("center");

        recipeContentList = [H_recipeName, P_cookingTime, P_noOfPeople, P_rating, P_name];

        displayPageList[recipeId] = recipeContentList;

        for (let i = 0; i < bodyPages[1].children.length; i++) {

            let displayPage = bodyPages[1];

            if (displayPage.children[i].id === `recipe${recipeId}`) {
                    let recipeContainer = displayPage.children[i];
                    recipeContainer.innerHTML = "";
                    displayPageList[recipeId].forEach(function (element) {recipeContainer.appendChild(element)});
            }
            
        }
        clearPage();
        body.appendChild(bodyPages[1]);
        
    }

    let submitButton = document.getElementById("submit");
    submitButton.removeEventListener("click", getInformation);   
    submitButton.removeEventListener("click", addDisplayPage);
    submitButton.addEventListener("click", changeInformation);
    submitButton.addEventListener("click", updateDisplay);
}