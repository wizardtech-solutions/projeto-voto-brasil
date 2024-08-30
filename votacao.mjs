document.addEventListener('DOMContentLoaded', async () => {
    const municipio = document.querySelector('#municipio'); 
    const loading = document.querySelector('#loading'); // Seleciona o áudio
    
    const codeVoto = document.getElementById('codeVoto'); 
    const votoVereador = document.getElementById('votoVereador'); 

    const btnBranco = document.querySelector('#tecla_branca_vereador')
    const btnLaranja = document.querySelector('#tecla_laranja_vereador')
    const somTecla = document.querySelector('#somTecla_vereador'); // Seleciona o áudio
    const somVotou = document.querySelector('#somVotou_vereador'); // Seleciona o áudio
    const formVereador = document.querySelector('#form-vereador');

    const inputs = document.querySelectorAll('#box_number_vereador .content_item');
    const numbers = document.querySelectorAll('#content_number_vereador .box_number');

    let currentInputIndex = 0; // Índice do input atual
    
    let dataCand = [];
    await fetch('/data/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(async data => { 
        dataCand= await data.filter(candidate => candidate.NM_UE == municipio.value && candidate.DS_CARGO == "VEREADOR")
        loading.style.display = "none";
    })
    // Função para preencher todos os inputs com zeros
    function preencherBranco() {
        inputs.forEach(input => input.value = '0');
        currentInputIndex = inputs.length; // Todos os inputs estão preenchidos
    }

    // Função para corrigir (apagar o último valor digitado)
    function corrigir() {
        if (currentInputIndex > 0) {
            currentInputIndex--;
            inputs[currentInputIndex].value = '';
        }

    }

    // Função para confirmar a votação (mostrar alert)
    async function confirmar() {
        const voto = Array.from(inputs).every(input => input.value !== '');
        if (voto) {
            somVotou.play()
            let votos = Array.from(inputs).map(input => input.value).join('');
            setTimeout(async () => {
                votoVereador.value = votos
                formVereador.submit()
            }, 1000);
        } else {
            alert('Por favor, preencha todos os campos antes de confirmar.');
            return
        }
    }
    formVereador.addEventListener("submit",(event)=>{
        event.preventDefault();
        confirmar();
    });

    // Função para verificar se todos os inputs estão preenchidos e criar um alerta
    async function verificarPreenchimentoCompleto() {
        document.getElementById('voto-nulo').textContent = "";
        document.getElementById('img-cand').src = "";
        document.getElementById('nome-cand').textContent = "";
        document.getElementById('cargo-cidade').textContent = "";
        document.getElementById('partido-sigla').textContent = "";
      
        const todosPreenchidos = Array.from(inputs).every(input => input.value !== '');
        if (todosPreenchidos) {
            let votos = Array.from(inputs).map(input => input.value).join('');

            // Filtrar apenas os candidatos que são vereadores
            const candidato = await dataCand.find(cand => cand.DS_CARGO == "VEREADOR" && cand.NR_CANDIDATO == votos);
            if (candidato) {
                // Preenche os dados do candidato
                document.getElementById('nome-cand').textContent = candidato.NM_URNA_CANDIDATO;
                document.getElementById('cargo-cidade').textContent = `${candidato.DS_CARGO} - ${candidato.NM_UE}/${candidato.SG_UF}`;
                document.getElementById('partido-sigla').textContent = `${candidato.NM_PARTIDO} - ${candidato.SG_PARTIDO}`;

                // Atualiza o caminho da imagem (certifique-se que o caminho esteja correto)
                // document.getElementById('img-cand').src = `/img/${candidato.NM_URNA_CANDIDATO.toLowerCase().replace(/ /g, '-')}.jpg`;
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
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            // Verifica se ainda há inputs disponíveis
            if (currentInputIndex < inputs.length) {
                // Insere o número no input atual
                inputs[currentInputIndex].value = number.textContent;
                currentInputIndex++; // Avança para o próximo input

                somTecla.play(); // Toca o som da tecla

                // Verifica se todos os inputs estão preenchidos
                verificarPreenchimentoCompleto();
            }
        });
    });


    btnBranco.addEventListener('click', preencherBranco);
    btnLaranja.addEventListener('click', corrigir);
});