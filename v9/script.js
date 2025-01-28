let nome = document.getElementById("nome");
let labelNome = document.getElementById("labelNome");
let email = document.getElementById("email");
let labelEmail = document.getElementById("labelEmail");
let senha = document.getElementById("senha");
let labelSenha = document.getElementById("labelSenha");
let confSenha = document.getElementById("confSenha");
let labelConfSenha = document.getElementById("labelConfSenha");
let msgErro = document.getElementById("msgErro")
let msgBom = document.getElementById("msgBom")
let emailLabel = document.getElementById("emailLabel");
let emailLog = document.getElementById("emailLog");
let senhaLog = document.getElementById("senhaLog")
let erroLog = document.getElementById("erroLog")
let loginBtn = document.querySelector('.login');
let perfilBtn = document.querySelector('.perfil');
let sair = document.querySelector('.sair')
let logado = document.getElementById('menu-logado')
let nLog = document.getElementById('menu-naologado')


function validarNome() {
    if (nome.value.length < 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *insira no minimo 2 caracteres';
        return false;
    } else {
        labelNome.style.color = "";
        labelNome.innerHTML = 'Nome';
        return true;
    }
}

function validarSenha() {
    if (senha.value.length < 8) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *insira no minimo 8 caracteres';
        return false;
    } else {
        labelSenha.style.color = "";
        labelSenha.innerHTML = 'Senha';
        return true;
    }
}

function validarConfSenha() {
    if (senha.value !== confSenha.value) {
        labelConfSenha.setAttribute('style', 'color: red');
        labelConfSenha.innerHTML = 'Confirmar Senha *As senhas devem ser iguais';
        return false;
    } else {
        labelConfSenha.style.color = "";
        labelConfSenha.innerHTML = 'Confirmar Senha';
        return true;
    }
}

function validaEmail() {
    let parteEmail = email.value.split("@");

    if (email.value.trim().length == 0) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'O email nao pode ser em branco';
        return false;
    }

    if (parteEmail.length !== 2) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = "O email deve conter apenas um '@'";
        return false;
    }

    let partesDepois = parteEmail[1].split(".");
    if (partesDepois.length < 2) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = "O email deve conter pelo menos um domínio válido.";
        return false;
    }


    labelEmail.style.color = "";
    labelEmail.innerHTML = 'Email';
    return true;
}

nome.addEventListener('keyup', validarNome);
senha.addEventListener('keyup', validarSenha);
confSenha.addEventListener('keyup', validarConfSenha);
email.addEventListener('keyup', validaEmail);

function cadastrar(e) {
    e.preventDefault(); 

    if (validarNome() && validaEmail() && validarSenha() && validarConfSenha()) {

        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

        listaUsuario.push({
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value
        })

        localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario))

        msgBom.setAttribute('style', 'display: block')
        msgBom.innerHTML = 'Registro feito!'
        msgErro.setAttribute('style', 'display: none')
        msgErro.innerHTML = ''
        

        setTimeout(() =>{
            let modalReg = document.getElementById('modalReg')
            modalReg.classList.add('d-none');
            let modalLogin = document.getElementById('modalLog')
            modalLogin.classList.remove('d-none');
        }, 1500)

        

    } else {
        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = 'Confira os campos novamente'
        msgBom.setAttribute('style', 'display: none')
        msgBom.innerHTML = ''
    }
}

function entrar(e){
    e.preventDefault();

    let lista = []
    let userValid = {
        nome: '', 
        email: '',
        senha: ''
    }

    lista = JSON.parse(localStorage.getItem('listaUsuario'))

    lista.forEach((item) => {

        if(emailLog.value == item.emailCad && senhaLog.value == item.senhaCad){
            userValid = {
                email: item.emailCad,
                nome: item.nomeCad,
                senha: item.senhaCad
            }
        }
    });

    if(emailLog.value == userValid.email && senhaLog.value == userValid.senha){
        setTimeout(() =>{
        modalLogin = document.getElementById('modalLog')
        modalLogin.classList.add('d-none');
        }, 500)

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
        logado.classList.remove('d-none')
        nLog.classList.add('d-none')
        //sair.classList.remove('d-none');

    }else{
        emailLabel.setAttribute('style', 'color: red')
        senhaLog.setAttribute('style', 'color: red')
        erroLog.setAttribute('style', 'display: block')
        erroLog.innerHTML = 'Usuario ou senha incorretos'
        emailLog.focus()
    }
}

//esta logado?
function usuarioLogado() {

    let token = localStorage.getItem('token');
    
    if (token) {
        return true; 
    } else {
        return false; 
    }
}

//mostrar o formulário de adicionar receita
function mostrarFormularioAdicionar() {
    if (!usuarioLogado()) {
        alert('Você precisa estar logado para adicionar receitas!');
        return;
    }

    document.getElementById('formAdicionar').classList.remove('d-none');
}

//adicionar receita
function adicionarReceita() {
    let titulo = document.getElementById('tituloReceita').value;
    let descricao = document.getElementById('descricaoReceita').value;

    if (titulo && descricao) {
        let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
        receitas.push({ titulo, descricao });
        localStorage.setItem('receitas', JSON.stringify(receitas));
        
        alert('Receita adicionada com sucesso!');
        carregarReceitas();
        cancelarAdicionar();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

//carregar as receitas da memória
function carregarReceitas() {
    let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
    let listaReceitas = document.getElementById('listaReceitas');
    listaReceitas.innerHTML = ''; // Limpar a lista atual

    receitas.forEach((receita, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <h5>${receita.titulo}</h5>
            <p>${receita.descricao}</p>
            <button class="btn btn-warning" onclick="editarReceita(${index})">Editar</button>
            <button class="btn btn-danger" onclick="removerReceita(${index})">Excluir</button>
        `;
        listaReceitas.appendChild(li);
    });
}

// Função para cancelar o formulário de adicionar receita
function cancelarAdicionar() {
    document.getElementById('formAdicionar').classList.add('d-none');
}

// Função para editar uma receita
function editarReceita(index) {
    if (!usuarioLogado()) {
        alert('Você precisa estar logado para editar receitas!');
        return;
    }

    let receitas = JSON.parse(localStorage.getItem('receitas'));
    let receita = receitas[index];
    let titulo = prompt('Editar Título:', receita.titulo);
    let descricao = prompt('Editar Descrição:', receita.descricao);

    if (titulo && descricao) {
        receitas[index] = { titulo, descricao };
        localStorage.setItem('receitas', JSON.stringify(receitas));
        carregarReceitas();
    }
}

// Função para remover uma receita
function removerReceita(index) {
    if (!usuarioLogado()) {
        alert('Você precisa estar logado para excluir receitas!');
        return;
    }

    let confirma = confirm('Tem certeza que deseja excluir esta receita?');
    if (confirma) {
        let receitas = JSON.parse(localStorage.getItem('receitas'));
        receitas.splice(index, 1); // Remove o item da lista
        localStorage.setItem('receitas', JSON.stringify(receitas));
        carregarReceitas();
    }
}

// Carregar as receitas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarReceitas);



function fechar(e){
    e.preventDefault();

    modalLogin = document.getElementById('modalLog')
    modalLogin.classList.add('d-none');
    
}

function fecharReg(e){
    let modalReg = document.getElementById('modalReg')
    modalReg.classList.add('d-none');
}

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalLogin = document.getElementById('modalLog');
    modalLogin.classList.remove('d-none');
});

perfilBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalReg = document.getElementById('modalReg');
    modalReg.classList.remove('d-none');
});

sair.addEventListener('click', (e) =>{
    e.preventDefault();

    localStorage.removeItem('token')

    logado.classList.add('d-none')
    nLog.classList.remove('d-none')

})

// Função para carregar as receitas do localStorage e exibir na página
function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let recipesContainer = document.getElementById('recipes-container');
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
            <button class="btn btn-info" onclick="editRecipe(${index})">Editar</button>
            <button class="btn btn-danger" onclick="deleteRecipe(${index})">Excluir</button>
          </div>
        </div>
      `;
      recipesContainer.appendChild(recipeCard);
    });
  }

  // Função para mostrar o formulário de adicionar receita
  function showAddRecipeForm() {
    document.getElementById('recipe-form').style.display = 'block';
  }

  // Função para salvar a receita no localStorage
  document.getElementById('add-recipe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('recipe-title').value;
    let ingredients = document.getElementById('ingredients').value;
    let instructions = document.getElementById('instructions').value;
    let cookingTime = document.getElementById('cooking-time').value;
    let image = document.getElementById('recipe-image').value;

    let recipe = { title, ingredients, instructions, cookingTime, image };

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Limpar o formulário e esconder
    document.getElementById('add-recipe-form').reset();
    document.getElementById('recipe-form').style.display = 'none';

    loadRecipes(); // Recarregar as receitas na página
  });

  // Função para editar uma receita
  function editRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    let recipe = recipes[index];
        
    document.getElementById('recipe-title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('cooking-time').value = recipe.cookingTime;
    document.getElementById('recipe-image').value = recipe.image;

    // Remover a receita antes de editar
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Mostrar o formulário de adicionar receita
    document.getElementById('recipe-form').style.display = 'block';
  }

  // Função para excluir uma receita
  function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes(); // Recarregar as receitas
  }

  // Carregar as receitas quando a página carregar
  window.onload = loadRecipes;

//Buscas
let receitas = [
    { titulo: "Molho de Ervas Frescas", link: "receitas/molhoErvas.html" },
    { titulo: "Pavê de Doce de Leite e Nozes", link: "receitas/pave.html" },
    { titulo: "Filé ao Molho de Mostarda", link: "receitas/carne.html" },
    { titulo: "Bolo de Cenoura", link: "receitas/bolo.html" },
    { titulo: "Dadinho de Tapioca com Molho Agridoce", link: "receitas/dadinho.html" },
    { titulo: "Molho de Queijo com Alho Torrado", link: "receitas/molhoQueijo.html" },
    { titulo: "Risoto de Funghi com Parmesão", link: "receitas/risoto.html" },
    { titulo: "Limonada com Hortelã e Gengibre", link: "receitas/limonada.html" },
  ];

  // Função de busca
  function buscarReceitas(event) {
    event.preventDefault(); 

    let busca = document.getElementById("campoBusca").value.toLowerCase(); 
    let resultadoBusca = receitas.filter(receita => receita.titulo.toLowerCase().includes(busca)); 

    mostrarResultados(resultadoBusca); 
  }

// Função para mostrar os resultados
function mostrarResultados(resultados) {
let listaDeReceitas = document.getElementById("listaReceitas");
listaDeReceitas.innerHTML = ""; 

if (resultados.length === 0) {
    listaDeReceitas.innerHTML = "<li class='list-group-item'>Nenhuma receita encontrada</li>";
} else {
    resultados.forEach(receita => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `<a href="${receita.link}">${receita.titulo}</a>`;
    listaDeReceitas.appendChild(li);
    });
}
}
