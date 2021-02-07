// elements
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meals');
let notFound = document.querySelector('.not-found');
let ingredientArea = document.getElementById('card-area')


// for searchBtn event-listeners
searchBtn.addEventListener('click',()=>{
    getMealList();
})


// for getMealList
const getMealList = ()=>{
    let meal = '';
    let inputValue = document.getElementById('input-field').value ;
   if(inputValue === ''){
       alert('Please fill and find your meal!')
   }else{
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.meals){
            showMealList(data, meal);
            notFound.style.display = 'none';
        }else{
            meal = `Sorry, Didn't find any meal name of ${inputValue}`
            notFound.innerHTML = meal ;
            notFound.style.display = 'block';
        }
    })
    let input = document.getElementById('input-field');
    input.value = '';
   }
}


// for showMealList
const showMealList = (mealItems, meal)=>{
    console.log(mealItems);
 
    mealItems.meals.forEach((mealItem)=>{
        meal += `
        <div onClick='getMealRecipe("${mealItem.idMeal}")' class='meal-items'>
            <img src="${mealItem.strMealThumb}"/>
            <h4>${mealItem.strMeal}</h4>
            
        </div>
        `
    })
    mealList.innerHTML = meal ;
}


// for getMealRecipe
const getMealRecipe = (id)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` ;
    fetch(url)
    .then(res => res.json())
    .then(data => getIngredients(data))
}


// for getIngredients
const getIngredients = (mealData)=>{
    const meal = mealData.meals[0];
    //for destructuring
    const {strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,
        strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient16,strIngredient17,strIngredient18,strIngredient19,strIngredient20
    } = meal ;

    // make an array with all ingredient
    const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,
        strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient16,strIngredient17,strIngredient18,strIngredient19,strIngredient20];
    
    generateIngredients(ingredients, meal);
}


// for displayIngredients
const generateIngredients = (ingredients, meal)=>{
    const newIngredients = [];
    ingredients.forEach((item) => {
        if(item !== ""){
            newIngredients.push(item);
        }
    });
    let ingredientsAndIcon = '';
    newIngredients.map((item) => {
        ingredientsAndIcon += `
        <div class="display-flex">
         <i class="fas fa-angle-double-right"></i>
        <h5>${item}</h5>
        </div>
        `
    });

    displayData(meal,ingredientsAndIcon);
}


// for display data
const displayData  = (meal, ingredientsAndIcon)=>{
    let data = `
    <div class="card">
    <img src="${meal.strMealThumb}" alt="">
        <div class="card-info">
        <h3>${meal.strMeal}</h3>
        <p>Ingredients</p>
        <div class='ingredients-group'>${ingredientsAndIcon}</div>
        </div>
    </div>
    `
    ingredientArea.innerHTML = data ;
}


// ======================= End =================================================================================================================