//evento para carregar apenas quanto terminar de carregar todo o documento
document.addEventListener('DOMContentLoaded', function(){ //callback
    //Acessa o form pelo id no momento do evento de submit
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){ //callback
        evento.preventDefault();
        //retorna o número máximo informado e coloca em uma variável
        let numeroMaximo = document.getElementById('numero-maximo').value;
        //transforma a variável em inteiro
        numeroMaximo = parseInt(numeroMaximo);

        //cria uma variável para receber o númeroMaximo multiplicado pelo random
        let numeroAleatorio = Math.random() * numeroMaximo;
        
        //arredondando um número.
        numeroAleatorio = Math.floor(numeroAleatorio + 1);

        //Insere o valor no html de numeroAleatorio ao elemento com id "resultado-valor" que é um span.
        document.getElementById('resultado-valor').innerText = numeroAleatorio;

        //Selecionando o seletor .resultado e alterando o style display para block
        document.querySelector('.resultado').style.display = 'block';
    })
} )