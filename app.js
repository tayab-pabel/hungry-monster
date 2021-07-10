const mainAPI = "https://www.themealdb.com/api/json/v1/1/search.php";

// Data Loading Spinner
const toggleSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("d-none");
};

// Keyboard Enter Button Event Handler
document.getElementById("meal")
    .addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("search").click();
        }
});

// Search Button Handler
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function () {
    const meal = document.getElementById("meal").value;
    const url = `${mainAPI}?s=${meal}`;
    toggleSpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => mealMenu(data.meals));
    const mealMenu = (food) => {
        if (food == null) {
            document.getElementById("notice").innerText =
                  "Sorry, No Results Found!";
            toggleSpinner();
        } else {
            const menuList = document.getElementById("menuList");
            food.forEach(foods => {
                const foodDiv = document.createElement("div");
                foodDiv.className = "col-md-3 foods mt-4";
                const foodInfo = `
                    <div class="card" onclick="foodDetail('${foods.strMeal}')">
                        <img src="${foods.strMealThumb}" class="" alt="...">
                        <div class="card-body text-center">
                            <h3 class="card-title">${foods.strMeal}</h3>
                        </div>
                    </div>
                `;
                foodDiv.innerHTML = foodInfo;
                menuList.appendChild(foodDiv);
                toggleSpinner();
                });
        }
    }
    document.getElementById("menuList").innerHTML = "";
    document.getElementById("foodDetailInfo").innerHTML = "";
    document.getElementById("notice").innerText = "";
})

// Show Food Item Detail Info
const foodDetail = (foodname) => {
    const url = `${mainAPI}?s=${foodname}`;
    fetch(url)
        .then(res => res.json())
        .then(data => foodInfo(data.meals[0]));
}

const foodInfo = food => {
    const menuList = document.getElementById("menuList");
    menuList.style.display = "none";
    const inputArea = document.getElementById("input-area");
    inputArea.style.display = "none";
    const foodFullDetail = document.getElementById("foodDetailInfo");
    foodFullDetail.innerHTML = `
        <div class="col-lg-6 card m-auto food-detail">
            <img class="img-fluid" src="${food.strMealThumb}">
            <h1 class="mt-4">${food.strMeal}</h1>
            <h2 class="mt-3">Ingredients</h2>
            <p>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient1} <br/>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient2} <br/>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient3} <br/>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient4} <br/>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient5} <br/>
                <i class="fas fa-check-square"></i>
                ${food.strIngredient6}
            </p>
        </div>
    `;
}



