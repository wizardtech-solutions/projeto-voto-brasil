// loop de inserção do option de seçao tela de cadastro
const selectElement = document.getElementById('secao');

for (let i = 1; i <= 100; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Seção ${i}`;
    selectElement.appendChild(option);
}
