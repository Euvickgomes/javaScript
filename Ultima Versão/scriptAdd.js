let sair = document.querySelector('.sair')

//esta logado?
function usuarioLogado() {

    let token = localStorage.getItem('token');
    
    if (token) {
        return true; 
    } else {
        return false; 
    }
}

// Função para carregar as receitas do localStorage e exibir na página
function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let recipesContainer = document.getElementById('recipes-container');
    if (!recipesContainer) return;
    recipesContainer.innerHTML = ''; // Limpa a área de receitas

    recipes.forEach((recipe, index) => {
        let recipeCard = document.createElement('div');
        recipeCard.className = 'col-md-4 mb-3';
        recipeCard.innerHTML = `
            <div class="card recipe-card">
                <img src="${recipe.image || 'imagens/erro.jpg'}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.ingredients}</p>
                    <p class="card-text">Categoria: ${recipe.category}</p>
                    <button class="btn btn-info" onclick="editRecipe(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteRecipe(${index})">Excluir</button>
                </div>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Exibir o formulário de adicionar receita
function showAddRecipeForm() {
    document.getElementById('recipe-form').style.display = 'block';
}

// Função para salvar a receita no localStorage
document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('add-recipe-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let title = document.getElementById('recipe-title').value;
            let ingredients = document.getElementById('ingredients').value;
            let instructions = document.getElementById('instructions').value;
            let cookingTime = document.getElementById('cooking-time').value;
            let image = document.getElementById('recipe-image').value;
            let category = document.getElementById('recipe-category').value;

            let recipe = { title, ingredients, instructions, cookingTime, image, category };

            let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            recipes.push(recipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            // Limpar o formulário e esconder
            document.getElementById('add-recipe-form').reset();

            loadRecipes(); // Recarregar as receitas na página
        });
    }
});

function salvarReceita(nome, imagem, categoria) {
    let receitas = JSON.parse(localStorage.getItem("recipes")) || [];
    receitas.push({ nome, imagem, categoria });
    localStorage.setItem("recipes", JSON.stringify(receitas));
}

// Função para editar uma receita
function editRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    let recipe = recipes[index];
        
    document.getElementById('recipe-title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('cooking-time').value = recipe.cookingTime;
    document.getElementById('recipe-image').value = recipe.image;
    document.getElementById('recipe-category').value = recipe.category;

    // Remover a receita antes de editar
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Função para excluir uma receita
function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes(); // Recarregar as receitas
}

// Carregar as receitas ao carregar a página
window.onload = loadRecipes;

sair.addEventListener('click', (e) => {
    e.preventDefault(); 

    localStorage.removeItem('token');

    window.location.href = "index.html";
});