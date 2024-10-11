const showPopup = document.querySelector('.show-popup');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.closebtn');
const form = document.getElementById('form-contatos');
const imgFavorito = new Image(24, 24)
imgFavorito.src = "./fav.jpg"
const nomes = [];
const numeros = [];
const contatoContagem = document.getElementById('contagem');
let contagemContatos = 0;

showPopup.onclick = () => {
    popupContainer.classList.add('active');
}

closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}

let linhas = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();
    adicionaLinha();
    atualizarContagem();
})

function adicionaLinha() {
    const inputNomeContato = document.getElementById('nome');
    const inputNumeroTel = document.getElementById('tel');
    const checkboxFavorito = document.getElementById('checkbox');

    if (numeros.includes(inputNumeroTel.value)) {
        alert(`Você já adicionou o número ${(inputNumeroTel.value)}!`);
        document.getElementByClass('.addRowBtn').disabled = true;
    } else {
        nomes.push(inputNomeContato.value);
        numeros.push(parseFloat(inputNumeroTel.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeContato.value}</td>`;
        linha += `<td>${inputNumeroTel.value}</td>`;

        if (checkboxFavorito.checked) {
            linha += `<td><img src="${imgFavorito.src}" alt="Favorito" width="24" height="24"></td>`;
        } else {
            linha += `<td></td>`;
        }
        
        linha += '</tr>';

        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML += linha;

        inputNomeContato.value = '';
        inputNumeroTel.value = '';
        checkboxFavorito.checked = false;

        contagemContatos++;
    }}

function atualizarContagem() {
    contatoContagem.textContent = `${contagemContatos} Contatos Salvos`;
}

//todo Formatando o núemro de telefone!
const inputNumeroTel = document.getElementById('tel');

inputNumeroTel.addEventListener('input', function (e) {
    let tel = e.target.value;

    tel = tel.replace(/\D/g, '');

    if (tel.length > 10) {
        tel = tel.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (tel.length > 5) {
        tel = tel.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (tel.length > 2) {
        tel = tel.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        tel = tel.replace(/^(\d*)/, '($1');
    }

    e.target.value = tel;
});