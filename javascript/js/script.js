function calcularMedia( notas ) {

    let soma = 0;
    for( c = 0; c < notas.length; c++) {
        soma += notas[c];
    }

    media = soma / notas.length;

    return media;

}

let media; // escopo global

function aprovacao( notas ) {

    let media = calcularMedia( notas ); // escopo da função

    let condicao = media >= 8 ? "aprovado" : "reprovado";

    return 'Média: ' + media + ' - Resultado: ' + condicao;

}


// Função Recursivas

function contagemRegressiva(numero){

    console.log(numero);  
    
    let proximoNumero = numero - 1;

    if(proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

// contagemRegressiva(50);

/* 
 * Formulário envio de dados para cálculo da média 
 */
const formulario1 = document.getElementById('formulario-01');

if(formulario1)
    formulario1.addEventListener('submit', function( evento ){

        evento.preventDefault();
        evento.stopPropagation();

        if( this.getAttribute('class').match(/erro/) ) {
            return false;
        }
        
        let dados = new FormData(this);

        let notas = [];

        for(let key of dados.keys()) {

            let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número

            if(!isNaN(numero)) {
                notas.push(numero);
            }

        }

        console.log(notas);

        texto = aprovacao(notas)

        document.getElementById('resultado').innerHTML = texto;

    });


/* 
 * Formulário envio de dados para cadastro
 */
const formulario2 = document.getElementById('formulario-02');

if(formulario2)
    formulario2.addEventListener('submit', function( evento ){
        document.getElementById('mensagem').innerHTML = "Iniciando envio!";

        evento.preventDefault();
        evento.stopPropagation();

        let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
        let camposEmail = document.querySelectorAll('input.email');
        let camposTelefone = document.querySelectorAll('input.telefone');
        let camposCEP = document.querySelectorAll('input.cep');
        let camposUF = document.querySelectorAll('input.uf');

        for( let campo of camposObrigatorios) {
            validaCampoObrigatorio(campo);
        }
        
        if( formulario2.getAttribute('class').match(/erro/) ) {
            return false;
        }

        for( let campo of camposEmail) {
            validaEmail(campo);
        }

        for( let campo of camposTelefone) {
            validaTelefone(campo);
        }

        for( let campo of camposCEP) {
            validaCEP(campo);
        }

        for( let campo of camposUF) {
            validaUF(campo);
        }

        if( formulario2.getAttribute('class').match(/erro/) ) {
            return false;
        }

        document.getElementById('mensagem').innerHTML = "Cadastro realizado com sucesso!";
    });

/*validação do campo obrigatorio*/
function validaCampoObrigatorio(campo){
    if(campo.value == ""){
        document.getElementById('mensagem').innerHTML = "Preencha os campos em destaque";
        campo.classList.add('erro');
        formulario2.classList.add('erro');
        return false;
    } else {
        document.getElementById('mensagem').innerHTML = "";
        campo.classList.remove('erro');
        formulario2.classList.remove('erro');
    }
}

/*validação do campo Email*/
function validaEmail(campo){
    const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
    if(campo.value.match(emailValido)) {
        document.getElementById('mensagem').innerHTML = "";
        campo.classList.remove('erro');
        formulario2.classList.remove('erro');
    } else {
        document.getElementById('mensagem').innerHTML = "Preencha o email conforme o exemplo: email@dominio.exemplo";
        campo.classList.add('erro');
        formulario2.classList.add('erro');
        return false;
    }
}

/*validação do campo telefone sigla do estado*/
function validaTelefone(campo){
    if(campo.value.match(/\([\d]2\)[\d]5-[\d]4/) || campo.value == ""){
        document.getElementById('mensagem').innerHTML = "";
        campo.classList.remove('erro');
        formulario2.classList.remove('erro');
    } else {
        document.getElementById('mensagem').innerHTML = "Preencha o telefone conforme o exemplo: (99)99999-9999";
        campo.classList.add('erro');
        formulario2.classList.add('erro');
        return false;
    }
}

/*validação do campo CEP sigla do estado*/
function validaCEP(campo){
    let numero = campo.value.match(/[\d]5-[\d]3/) ? campo.value.replace(/-/, "") : campo.value; 

    if((numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10) || campo.value == ""){
        document.getElementById('mensagem').innerHTML = "";
        campo.classList.remove('erro');
        formulario2.classList.remove('erro');
    } else {
        document.getElementById('mensagem').innerHTML = "Preencha o CEP conforme o exemplo: 99999-999";
        campo.classList.add('erro');
        formulario2.classList.add('erro');
        return false;
    }
}

/*validação do campo UF sigla do estado*/
function validaUF(campo){
    if(campo.value.match(/[A-Z]2/) || campo.value == ""){
        document.getElementById('mensagem').innerHTML = "";
        campo.classList.remove('erro');
        formulario2.classList.remove('erro');
    } else {
        document.getElementById('mensagem').innerHTML = "Preencha a UF conforme o exemplo: MG";
        campo.classList.add('erro');
        formulario2.classList.add('erro');
        return false;
    }
}
