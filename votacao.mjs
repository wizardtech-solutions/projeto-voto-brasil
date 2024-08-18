document.addEventListener('DOMContentLoaded', () => {
    const municipio = document.querySelector('#municipio'); 
    
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
    // const dataCand1 = [{
    //     SG_UF: "PI",
    //     SG_UE: "12190",
    //     NM_UE: "TERESINA",
    //     CD_CARGO: "11",
    //     DS_CARGO: "PREFEITO",
    //     NR_CANDIDATO: "13",
    //     NM_CANDIDATO: "FABIO NUNEZ NOVO",
    //     NM_URNA_CANDIDATO: "FABIO NOVO",
    //     TP_AGREMIACAO: "COLIGAÇÃO",
    //     NR_PARTIDO: "13",
    //     SG_PARTIDO: "PT",
    //     NM_PARTIDO: "PARTIDO DOS TRABALHADORES",
    //     NM_COLIGACAO: "Juntos por Teresina",
    //     DS_COMPOSICAO_COLIGACAO: "Juntos por Teresina [AGIR - AGIR, Democracia Cristã - DC, Federação BRASIL DA ESPERANÇA - FE BRASIL (PT/PC do B/PV), Federação PSDB CIDADANIA (PSDB/CIDADANIA), Movimento Democrático Brasileiro - MDB, Partido Democrático Trabalhista - PDT, Partido Social Democrático - PSD, Partido Socialista Brasileiro - PSB, Podemos - PODE, Solidariedade - SOLIDARIEDADE] - TERESINA - PI",
    //     SG_UF_NASCIMENTO: "PI",
    //     DT_NASCIMENTO: "20/07/1974",
    //     NR_TITULO_ELEITORAL_CANDIDATO: "019604241562",
    //     DS_GENERO: "MASCULINO",
    //     DS_GRAU_INSTRUCAO: "SUPERIOR COMPLETO",
    //     DS_ESTADO_CIVIL: "SOLTEIRO(A)",
    //     DS_COR_RACA: "BRANCA",
    //     DS_OCUPACAO: "DEPUTADO"
    // }, {
    //     SG_UF: "PI",
    //     SG_UE: "12190",
    //     NM_UE: "TERESINA",
    //     CD_CARGO: "13",
    //     DS_CARGO: "VEREADOR",
    //     NR_CANDIDATO: "15456",
    //     NM_CANDIDATO: "LUCY DE FARIAS CARVALHO SOARES",
    //     NM_URNA_CANDIDATO: "LUCY SOARES",
    //     TP_AGREMIACAO: "PARTIDO ISOLADO",
    //     NR_PARTIDO: "15",
    //     SG_PARTIDO: "MDB",
    //     NM_PARTIDO: "MOVIMENTO DEMOCRÁTICO BRASILEIRO",
    //     NM_COLIGACAO: "PARTIDO ISOLADO",
    //     DS_COMPOSICAO_COLIGACAO: "Movimento Democrático Brasileiro - MDB - TERESINA - PI",
    //     SG_UF_NASCIMENTO: "PE",
    //     DT_NASCIMENTO: "11/06/1967",
    //     NR_TITULO_ELEITORAL_CANDIDATO: "020408421503",
    //     DS_GENERO: "FEMININO",
    //     DS_GRAU_INSTRUCAO: "SUPERIOR COMPLETO",
    //     DS_ESTADO_CIVIL: "VIÚVO(A)",
    //     DS_COR_RACA: "PARDA",
    //     DS_OCUPACAO: "ADVOGADO"
    // }]
    let dataCand = [];
    fetch('/data/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => { 
        dataCand= data.filter(candidate => candidate.NM_UE == municipio.value)
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
    function verificarPreenchimentoCompleto() {
        document.getElementById('voto-nulo').textContent = "";
        document.getElementById('img-cand').src = "";
        document.getElementById('nome-cand').textContent = "";
        document.getElementById('cargo-cidade').textContent = "";
        document.getElementById('partido-sigla').textContent = "";
      
        const todosPreenchidos = Array.from(inputs).every(input => input.value !== '');
        if (todosPreenchidos) {
            let votos = Array.from(inputs).map(input => input.value).join('');

            // Filtrar apenas os candidatos que são vereadores
            const candidato = dataCand.find(cand => cand.DS_CARGO == "VEREADOR" && cand.NR_CANDIDATO == votos);
            if (candidato) {
                // Preenche os dados do candidato
                document.getElementById('nome-cand').textContent = candidato.NM_URNA_CANDIDATO;
                document.getElementById('cargo-cidade').textContent = `${candidato.DS_CARGO} - ${candidato.NM_UE}/${candidato.SG_UF}`;
                document.getElementById('partido-sigla').textContent = `${candidato.NM_PARTIDO} - ${candidato.SG_PARTIDO}`;

                // Atualiza o caminho da imagem (certifique-se que o caminho esteja correto)
                // document.getElementById('img-cand').src = `/img/${candidato.NM_URNA_CANDIDATO.toLowerCase().replace(/ /g, '-')}.jpg`;
                console.log("candidato.SQ_CANTIDATO",candidato.SQ_CANDIDATO)
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