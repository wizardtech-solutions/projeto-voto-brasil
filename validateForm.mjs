// validateForm.mjs
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Obtenha os valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const numberTelefone = document.getElementById('number_telefone').value.trim();
            const cep = document.getElementById('cep').value.trim();
            const cidade = document.getElementById('cidade').value;

            // Valide o nome
            if (nome === '') {
                alert('O nome é obrigatório.');
                event.preventDefault(); // Impede o envio do formulário
                return; // Saia da função após exibir o erro
            }

            // Valide o número de telefone (deve ter pelo menos 10 dígitos)
            const numberTelefoneRegex = /^\d{10,11}$/;
            if (!numberTelefoneRegex.test(numberTelefone)) {
                alert('O número de telefone deve ter entre 10 e 11 dígitos.');
                event.preventDefault(); // Impede o envio do formulário
                return; // Saia da função após exibir o erro
            }

            // Valide o CEP (deve ter exatamente 8 dígitos)
            const cepRegex = /^\d{8}$/;
            if (!cepRegex.test(cep)) {
                alert('O CEP deve ter exatamente 8 dígitos.');
                event.preventDefault(); // Impede o envio do formulário
                return; // Saia da função após exibir o erro
            }

            // Valide a seção
            if (cidade === '') {
                alert('Você deve selecionar a cidade.');
                event.preventDefault(); // Impede o envio do formulário
                return; // Saia da função após exibir o erro
            }
        });
    }
});
