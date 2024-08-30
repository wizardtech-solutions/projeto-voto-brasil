document.addEventListener('DOMContentLoaded', async() => {
    const municipio = document.querySelector('#municipio'); 
    const loadingPrefeito = document.querySelector('#loadingPrefeito'); // Seleciona o áudio
    
    const codeVoto = document.getElementById('codeVoto'); // Seleciona o áudio
    const votoVereador = document.getElementById('votoVereador'); // Seleciona o áudio
    const votoPrefeito = document.getElementById('votoPrefeito');

    const btnBranco = document.querySelector('#tecla_branca_prefeito')
    const btnLaranja = document.querySelector('#tecla_laranja_prefeito')
    const btnVerdePrefeito = document.querySelector('#tecla_verde_prefeito')
    const somTeclaPrefeito = document.querySelector('#somTecla_prefeito'); // Seleciona o áudio
    const somVotouPrefeito = document.querySelector('#somVotou_prefeito'); // Seleciona o áudio
    const formVereador = document.querySelector('#form-vereador'); // Seleciona o áudio
    const formPrefeito = document.querySelector('#form-prefeito'); // Seleciona o áudio

    const inputsPrefeito = document.querySelectorAll('#box_number_prefeito .content_item');
    const numbersPrefeito = document.querySelectorAll('#content_number_prefeito .box_number');

    let currentInputIndex = 0; // Índice do input atual
   
    let dataCandPrefeito = [];
    await fetch('/data/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(async (data) => { 
        dataCandPrefeito= await data.filter(candidate => candidate.NM_UE == municipio.value && candidate.DS_CARGO == "PREFEITO" )
        loadingPrefeito.style.display = "none";
    })
    // Função para preencher todos os inputsPrefeito com zeros
    function preencherBranco() {
        inputsPrefeito.forEach(input => input.value = '0');
        currentInputIndex = inputsPrefeito.length; // Todos os inputsPrefeito estão preenchidos
    }

    // Função para corrigir (apagar o último valor digitado)
    function corrigir() {
        if (currentInputIndex > 0) {
            currentInputIndex--;
            inputsPrefeito[currentInputIndex].value = '';
        }

    }

    // Função para confirmar a votação (mostrar alert)
    async function confirmarPrefeito() {
        const voto = Array.from(inputsPrefeito).every(input => input.value !== '');
        if (voto) {
            somVotouPrefeito.play()
            let votos = Array.from(inputsPrefeito).map(input => input.value).join('');
            setTimeout(async () => {
                votoPrefeito.value = votos
                formPrefeito.submit()
            }, 1000);
        } else {
            alert('Por favor, preencha todos os campos antes de confirmar.');
        }
    }
    formPrefeito.addEventListener("submit",(event)=>{
        event.preventDefault();
        confirmarPrefeito();
    });
   

    // Função para verificar se todos os inputsPrefeito estão preenchidos e criar um alerta
    async function verificarPreenchimentoCompletoPrefeito() {
        document.getElementById('voto-nulo').textContent = "";
        document.getElementById('img-cand').src = "";
        document.getElementById('nome-cand').textContent = "";
        document.getElementById('cargo-cidade').textContent = "";
        document.getElementById('partido-sigla').textContent = "";

        const todosPreenchidosPrefeito = await Array.from(inputsPrefeito).every(input => input.value !== '');
        if (todosPreenchidosPrefeito) {
            let votos = await Array.from(inputsPrefeito).map(input => input.value).join('');

            // Filtrar apenas os candidatos que são vereadores
            const candidato = await dataCandPrefeito.find(cand => cand.DS_CARGO == "PREFEITO" && cand.NR_CANDIDATO == votos);
            if (candidato) {
                // Preenche os dados do candidato
                document.getElementById('nome-cand').textContent = candidato.NM_URNA_CANDIDATO;
                document.getElementById('cargo-cidade').textContent = `${candidato.DS_CARGO} - ${candidato.NM_UE}/${candidato.SG_UF}`;
                document.getElementById('partido-sigla').textContent = `${candidato.NM_PARTIDO} - ${candidato.SG_PARTIDO}`;

                // Atualiza o caminho da imagem (certifique-se que o caminho esteja correto)
                document.getElementById('img-cand').src = `/img/FPI${candidato.SQ_CANDIDATO}_div.jpeg`;

                // document.getElementById('img-cand').src = `/img/${candidato.NM_URNA_CANDIDATO}.jpg`;
            } else {
                // Preenche com "Voto Nulo" se não houver candidato correspondente
                document.getElementById('voto-nulo').textContent = 'VOTO NULO';
                document.getElementById('cargo-cidade').textContent = '';
                document.getElementById('partido-sigla').textContent = '';

                // Caminho para uma imagem de "Voto Nulo", se houver
                document.getElementById('img-cand').src = '';

                // alert('Voto nulo');
            }
        }
    }

    // Adiciona evento de clique para cada número
    numbersPrefeito.forEach(number => {
        number.addEventListener('click', () => {
            // Verifica se ainda há inputsPrefeito disponíveis
            if (currentInputIndex < inputsPrefeito.length) {
                // Insere o número no input atual
                inputsPrefeito[currentInputIndex].value = number.textContent;
                currentInputIndex++; // Avança para o próximo input

                somTeclaPrefeito.play(); // Toca o som da tecla

                // Verifica se todos os inputsPrefeito estão preenchidos
                verificarPreenchimentoCompletoPrefeito();
            }
        });
    });


    btnBranco.addEventListener('click', preencherBranco);
    btnLaranja.addEventListener('click', corrigir);
    // btnVerdePrefeito.addEventListener('click', confirmarPrefeito);
    
})