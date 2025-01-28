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
    const receitaFavorita = "Molho de Ervas Frescas"; // Você pode adicionar o nome ou ID da receita
    const index = favoritos.indexOf(receitaFavorita);

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

