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

document.getElementById('favoritarBtn').addEventListener('click', function() {
    let favoritoBtn = document.getElementById('favoritarBtn');
    
    // Recupera a lista de favoritos do localStorage ou cria uma nova se não existir
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Checa se a receita já está nos favoritos
    let receitaFavorita = "Molho de Ervas Frescas"; // Você pode adicionar o nome ou ID da receita
    let index = favoritos.indexOf(receitaFavorita);

    if (index === -1) {
        // Se não estiver, adiciona aos favoritos
        favoritos.push(receitaFavorita);
        favoritoBtn.classList.add('favorito'); // Marca o botão como favorito
        favoritoBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Remover dos Favoritos';
    } else {
        // Se já estiver, remove dos favoritos
        favoritos.splice(index, 1);
        favoritoBtn.classList.remove('favorito');
        favoritoBtn.innerHTML = '<i class="bi bi-heart"></i> Adicionar aos Favoritos';
    }

    // Salva a lista atualizada de favoritos no localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
});



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

// Função de registro de usuário
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

        // Exibe a mensagem de sucesso com animação
        msgBom.style.display = 'block'; 
        msgBom.classList.remove('hidden');
        msgBom.innerHTML = 'Registro feito!'

        // Esconde a mensagem de erro
        msgErro.classList.add('hidden');
        msgErro.innerHTML = ''

        setTimeout(() => {
            let modalReg = document.getElementById('modalReg')
            modalReg.classList.add('d-none');
            let modalLogin = document.getElementById('modalLog')
            modalLogin.classList.remove('d-none');
        }, 1500)

    } else {
        // Exibe a mensagem de erro com animação
        msgErro.style.display = 'block'; 
        msgErro.classList.remove('hidden');
        msgErro.innerHTML = 'Confira os campos novamente'

        // Esconde a mensagem de sucesso
        msgBom.classList.add('hidden');
        msgBom.innerHTML = ''
    }
}

// Função de login
function entrar(e) {
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
            let modalLogin = document.getElementById('modalLog')
            modalLogin.classList.add('d-none');
        }, 500)

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
        localStorage.setItem("usuario", JSON.stringify(userValid.nome));
        logado.classList.remove('d-none')
        nLog.classList.add('d-none')

    } else {
        // Exibe a mensagem de erro no login com animação
        erroLog.style.display = 'block'; 
        erroLog.classList.remove('hidden');
        erroLog.innerHTML = 'Usuario ou senha incorretos'

        emailLabel.setAttribute('style', 'color: red')
        senhaLog.setAttribute('style', 'color: red')

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

sair.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem("usuario");  // Remover o usuário logado
    logado.classList.add('d-none');
    nLog.classList.remove('d-none');

});

// Fechar o modal de usuário não logado
function fecharModal() {
    document.getElementById('modalNaoLogado').classList.add('d-none');
}


function obterUsuarioLogado() {
    let token = localStorage.getItem("token"); // Verifica se há um token de autenticação
    let usuario = localStorage.getItem("usuario"); // Obtém o nome do usuário armazenado

    if (token && usuario) {
        return usuario; // Retorna o nome do usuário se ele estiver logado
    }
    return null; // Retorna null se não houver usuário logado
}


function carregarComentarios() {
    // Recupera os comentários do localStorage
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};

    // Pega o URL da receita atual
    let urlReceita = window.location.pathname;

    // Seleciona o elemento onde os comentários serão exibidos
    let listaComentarios = document.getElementById("comentariosList");

    // Verifica se o elemento da lista existe
    if (!listaComentarios) return;

    // Limpa os comentários existentes
    listaComentarios.innerHTML = "";

    // Verifica se há comentários para a receita atual
    if (comentarios[urlReceita] && comentarios[urlReceita].length > 0) {
        // Exibe os comentários
        comentarios[urlReceita].forEach(c => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");

            // Exibe o nome e o comentário
            li.innerHTML =`
                <strong>${c.nome || "Anônimo"}:</strong> ${c.texto} 
                <em>(${new Date(c.data).toLocaleString()})</em>`;
            listaComentarios.appendChild(li);
        });
    } else {
        // Exibe uma mensagem se não houver comentários
        listaComentarios.innerHTML = "<p>Nenhum comentário ainda.</p>";
    }
}


// Função para adicionar um novo comentário
function adicionarComentario(event) {
    event.preventDefault();

    let usuario = obterUsuarioLogado(); // Pega o nome do usuário logado
    let comentario = document.getElementById("comentarioTexto")?.value;  

    if (!usuario) {
        alert("Você precisa estar logado para comentar!");
        return;
    }

    if (!comentario || comentario.trim() === "") {
        alert("O comentário não pode estar vazio!");
        return;
    }

    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};  
    let urlReceita = window.location.pathname; 

    // Se não houver comentários para a receita atual, cria um array vazio
    if (!comentarios[urlReceita]) {
        comentarios[urlReceita] = [];
    }

    // Adiciona o novo comentário
    comentarios[urlReceita].push({ nome: usuario, texto: comentario, data: new Date().toISOString() });

    // Salva novamente no localStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    
    // Limpar o campo de comentário
    document.getElementById("comentarioTexto").value = "";

    // Recarregar os comentários
    carregarComentarios();
}


// Evento para carregar comentários e inicializar o botão de comentar
document.addEventListener("DOMContentLoaded", function () {
    carregarComentarios(); // Carrega os comentários ao carregar a página
    let btnEnviarComentario = document.getElementById("btnEnviarComentario"); 
    if (btnEnviarComentario) {
        btnEnviarComentario.addEventListener("click", adicionarComentario);
    }

    // Verifica se o usuário está logado
    let usuario = obterUsuarioLogado();
    let logado = document.getElementById("menu-logado");
    let nLog = document.getElementById("menu-naologado");

    if (usuario) {
        logado.classList.remove('d-none');
        nLog.classList.add('d-none');
    } else {
        logado.classList.add('d-none');
        nLog.classList.remove('d-none');
    }
});



document.getElementById('favoritarBtn').addEventListener('click', function() {
    let usuario = obterUsuarioLogado(); // Obtém o usuário logado

    if (!usuario) {
        alert("Você precisa estar logado para adicionar aos favoritos!");
        return;
    }

    let favoritoBtn = document.getElementById('favoritarBtn');
    let urlReceita = window.location.pathname; // Identifica a receita pela URL
    let nomeReceita = document.getElementById('tituloReceita').innerText; // Supondo que o nome da receita esteja nesse ID

    // Recupera a lista de favoritos do usuário logado
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};

    if (!favoritos[usuario]) {
        favoritos[usuario] = []; // Se o usuário não tiver favoritos, cria um array vazio
    }

    let index = favoritos[usuario].findIndex(r => r.url === urlReceita);

    if (index === -1) {
        // Adiciona a receita aos favoritos do usuário
        favoritos[usuario].push({ nome: nomeReceita, url: urlReceita });
        favoritoBtn.classList.add('favorito');
        favoritoBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Remover dos Favoritos';
    } else {
        // Remove a receita dos favoritos
        favoritos[usuario].splice(index, 1);
        favoritoBtn.classList.remove('favorito');
        favoritoBtn.innerHTML = '<i class="bi bi-heart"></i> Adicionar aos Favoritos';
    }

    // Salva a lista de favoritos no localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
});

// Verifica se a receita já está favoritada ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    let usuario = obterUsuarioLogado();

    if (usuario) {
        let urlReceita = window.location.pathname;
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};

        if (favoritos[usuario]) {
            let index = favoritos[usuario].findIndex(r => r.url === urlReceita);
            let favoritoBtn = document.getElementById('favoritarBtn');

            if (index !== -1) {
                favoritoBtn.classList.add('favorito');
                favoritoBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Remover dos Favoritos';
            }
        }
    }
});

function removerFavorito(nome) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(receita => receita.nome !== nome);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    carregarFavoritos();
}


// Carrega receitas favoritas na página "receitas favoritas"
function carregarFavoritos() {
    let listaFavoritos = document.getElementById("lista-favoritos");
    if (!listaFavoritos) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    listaFavoritos.innerHTML = favoritos.length === 0 ? "<p>Nenhuma receita favoritada ainda.</p>" : "";

    favoritos.forEach(receita => {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${receita.nome}</h3>
            <img src="${receita.imagem}" alt="${receita.nome}" style="max-width: 200px;">
            <button onclick="removerFavorito('${receita.nome}')">Remover</button>
            <hr>
        `;
        listaFavoritos.appendChild(div);
    });
}
