//declaração de variaveis
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
let certoLog = document.getElementById("certoLog")
let loginBtn = document.querySelector('.login');
let perfilBtn = document.querySelector('.perfil');
let sair = document.querySelector('.sair')
let icones = document.querySelector('#icones')

//criacao de token oara saber quando o usuario esta logado
let token = Math.random().toString(16).substring(2)

//validaçoes dos formularios
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


//funcao para cadastro
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

//funcao para login
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
        certoLog.innerHTML = 'Login feito com sucesso!'
        setTimeout(() =>{
        modalLogin = document.getElementById('modalLog')
        modalLogin.classList.add('d-none');
        }, 750)

        localStorage.setItem('token', token)
        loginBtn.classList.add('d-none');
        perfilBtn.classList.add('d-none');
        sair.classList.remove('d-none');
        

    }else{
        emailLabel.setAttribute('style', 'color: red')
        senhaLog.setAttribute('style', 'color: red')
        erroLog.setAttribute('style', 'display: block')
        erroLog.innerHTML = 'Usuario ou senha incorretos'
        emailLog.focus()
    }
}

//fechar ao clicar no X - login
function fechar(e){
    e.preventDefault();

    modalLogin = document.getElementById('modalLog')
    modalLogin.classList.add('d-none');
    
}

//fechar ao clicar no X - Registro
function fecharReg(e){
    let modalReg = document.getElementById('modalReg')
    modalReg.classList.add('d-none');
}

//aparecer modal ao clicar em login
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalLogin = document.getElementById('modalLog');
    modalLogin.classList.remove('d-none');
});

//aparecer modal ao clicar em registrar
perfilBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let modalReg = document.getElementById('modalReg');
    modalReg.classList.remove('d-none');
});

//sair da sua conta
sair.addEventListener('click', (e) =>{
    e.preventDefault();

    localStorage.removeItem('token')

    sair.classList.add('d-none');
    icones.classList.add('d-none');
    loginBtn.classList.remove('d-none');
    perfilBtn.classList.remove('d-none');

})

