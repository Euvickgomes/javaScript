let nome = document.getElementById("nome");
let labelNome = document.getElementById("labelNome");
let email = document.getElementById("email");
let labelEmail = document.getElementById("labelEmail");
let senha = document.getElementById("senha");
let labelSenha = document.getElementById("labelSenha");
let confSenha = document.getElementById("confSenha");
let labelConfSenha = document.getElementById("labelConfSenha");
let msgErro = document.getElementById("msgErro");
let msgBom = document.getElementById("msgBom");
let emailLabel = document.getElementById("emailLabel");
let emailLog = document.getElementById("emailLog");
let senhaLog = document.getElementById("senhaLog");
let erroLog = document.getElementById("erroLog");
let loginBtn = document.querySelector('.login');
let perfilBtn = document.querySelector('.perfil');
let sair = document.querySelector('.sair');
let logado = document.getElementById('menu-logado');
let nLog = document.getElementById('menu-naologado');

// Validações
function validarNome() {
    if (nome.value.length < 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *insira no mínimo 2 caracteres';
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
        labelSenha.innerHTML = 'Senha *insira no mínimo 8 caracteres';
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
        labelEmail.innerHTML = 'O email não pode ser em branco';
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

if (nome != null) {
    nome.addEventListener('keyup', validarNome);
}

if (senha != null) {
    senha.addEventListener('keyup', validarSenha);
}

if (confSenha != null) {
    confSenha.addEventListener('keyup', validarConfSenha);
}

if (email != null) {
    email.addEventListener('keyup', validaEmail);
}
// Cadastrar usuário
function cadastrar(e) {
    e.preventDefault();

    if (validarNome() && validaEmail() && validarSenha() && validarConfSenha()) {

        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]');

        listaUsuario.push({
            usuario: nome.value,  // Salvar com a chave 'usuario' ao invés de 'nomeCad'
            emailCad: email.value,
            senhaCad: senha.value,
            logado: false
        });
        localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario));
        localStorage.setItem('usuario', nome.value);  // Armazena o nome com a chave 'usuario'
        
        msgBom.setAttribute('style', 'display: block');
        msgBom.innerHTML = 'Registro feito!';
        msgErro.setAttribute('style', 'display: none');
        msgErro.innerHTML = '';

        setTimeout(() => {
            let modalReg = document.getElementById('modalReg');
            modalReg.classList.add('d-none');
            let modalLogin = document.getElementById('modalLog');
            modalLogin.classList.remove('d-none');
        }, 1500);
    } else {
        msgErro.setAttribute('style', 'display: block');
        msgErro.innerHTML = 'Confira os campos novamente';
        msgBom.setAttribute('style', 'display: none');
        msgBom.innerHTML = '';
    }
}

// Função para entrar no sistema
function entrar(e) {
    e.preventDefault();

    let lista = JSON.parse(localStorage.getItem('listaUsuario')) || [];
    let userValid = null;  // Declare a variável userValid

    console.log("Lista de usuários:", lista);  // Verifique o conteúdo da lista

    lista.forEach((item) => {
        console.log(item.emailCad, emailLog.value, item.senhaCad, senhaLog.value);  // Verifique as comparações
        if (emailLog.value === item.emailCad && senhaLog.value === item.senhaCad) {
            userValid = item;
        }
    });

    console.log("userValid:", userValid); // Verifique o valor de userValid

    if (userValid) {
        // Marcar o usuário como logado
        userValid.logado = true;

        // Atualizar lista no localStorage
        let updatedLista = lista.map(item => item.emailCad === userValid.emailCad ? userValid : item);
        localStorage.setItem('listaUsuario', JSON.stringify(updatedLista));

        // Salvar o nome do usuário logado no localStorage
        localStorage.setItem("usuario", userValid.nomeCad);

        setTimeout(() => {
            let modalLogin = document.getElementById('modalLog');
            modalLogin.classList.add('d-none');
        }, 500);

        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

        logado.classList.remove('d-none');
        nLog.classList.add('d-none');
    } else {
        emailLabel.setAttribute('style', 'color: red');
        senhaLog.setAttribute('style', 'color: red');
        erroLog.setAttribute('style', 'display: block');
        erroLog.innerHTML = 'Usuário ou senha incorretos';
        emailLog.focus();
    }
}


// Fechar modal de Login
function fechar(e) {
    e.preventDefault();

    let modalLogin = document.getElementById('modalLog');
    modalLogin.classList.add('d-none');
}

// Fechar modal de Registro
function fecharReg(e) {
    let modalReg = document.getElementById('modalReg');
    modalReg.classList.add('d-none');
}

// Mostrar modal de login
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalLogin = document.getElementById('modalLog');
    modalLogin.classList.remove('d-none');
});

// Mostrar modal de registro
perfilBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalReg = document.getElementById('modalReg');
    modalReg.classList.remove('d-none');
});

// Função de sair
sair.addEventListener('click', (e) => {
    e.preventDefault();

    let lista = JSON.parse(localStorage.getItem('listaUsuario') || '[]');
    lista.forEach((item) => {
        if (item.logado) {
            item.logado = false;
        }
    });

    localStorage.setItem('listaUsuario', JSON.stringify(lista));
    localStorage.removeItem("usuario");
    localStorage.removeItem('token');

    logado.classList.add('d-none');
    nLog.classList.remove('d-none');
    window.location.href = "index.html"; // Redireciona para a home
});

// Função para carregar receitas do localStorage
function carregarReceitasUsuario() {
    let receitasSalvas = JSON.parse(localStorage.getItem("receitasUsuario")) || [];
    return receitasSalvas;
}

// Função de busca
function pesquisarReceitas(termo) {
    let todasReceitas = JSON.parse(localStorage.getItem("recipes")) || [];
    let receitasFiltradas = todasReceitas.filter(receita => receita.nome.toLowerCase().includes(termo.toLowerCase()));
    
    // Exibir resultados na interface (implementar exibição dinâmica)
    console.log("Resultados da pesquisa:", receitasFiltradas);
}

// Função para mostrar os resultados
function mostrarResultados(resultados) {
    let listaDeReceitas = document.getElementById("listaReceitas");
    listaDeReceitas.innerHTML = "";

    if (resultados.length === 0) {
        listaDeReceitas.innerHTML = "<li class='list-group-item'>Nenhuma receita encontrada</li>";
    } else {
        resultados.forEach(receita => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `<a href="${receita.link}">${receita.titulo}</a>`;
            listaDeReceitas.appendChild(li);
        });
    }
}

// Verificar se o usuário está logado ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    let token = localStorage.getItem('token');
    let usuario = localStorage.getItem('usuario'); // Nome do usuário logado

    if (token && usuario) {
        logado.classList.remove('d-none');  // Exibe o menu de usuário logado
        nLog.classList.add('d-none');       // Esconde o menu de usuário não logado
    } else {
        logado.classList.add('d-none');    // Esconde o menu de usuário logado
        nLog.classList.remove('d-none');   // Exibe o menu de usuário não logado
    }
});

// Simulando um array de receitas disponíveis
let receitas = [
    { nome: "Limonada com Hortelã e Gengibre", url: "receitas/limonada.html" },
    { nome: "Limonada", url: "receitas/limonada.html" },
    { nome: "Risoto de Funghi com Parmesão", url: "receitas/risoto.html" },
    { nome: "Risoto", url: "receitas/risoto.html" },
    { nome: "Molho de Queijo com Alho Torrado", url: "receitas/molhoQueijo.html" },
    { nome: "Molho de Queijo", url: "receitas/molhoQueijo.html" },
    { nome: "Dadinho de Tapioca com Molho Agridoce", url: "receitas/dadinho.html" },
    { nome: "Bolo de Cenoura", url: "receitas/bolo.html" },
    { nome: "Molho de Ervas Frescas", url: "receitas/molhoErvas.html" },
    { nome: "Molho de Ervas", url: "receitas/molhoErvas.html" },
    { nome: "Pavê de Docê de Leite e Nozes", url: "receitas/pave.html" },
    { nome: "Pão Caseiro", url: "macarrao_ao_molho_branco.html" },
    { nome: "Filé ao Molho de Mostarda", url: "receitas/carne.html" }
  ];

  function buscarReceitas(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  
    // Obtém o valor da busca
    let termoBusca = document.getElementById('campoBusca').value.trim().toLowerCase();
  
    // Verifica se a receita existe no array de receitas
    let receita = receitas.find(receita => receita.nome.toLowerCase() === termoBusca);
  
    if (receita) {
      // Se encontrar a receita, redireciona para a página da receita
      window.location.href = receita.url;
    } else {
      // Caso não encontre, redireciona para a página de erro
      window.location.href = "erro.html"; // Redireciona para a página de erro
    }
  }