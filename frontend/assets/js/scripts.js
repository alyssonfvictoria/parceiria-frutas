const inputValor = document.getElementById('form-valor');
let valorFloat = 0.00;
function formatarReal(valor) {
    const numero = parseFloat(valor.replace(/[^0-9]/g, '')) / 100 || 0;
    valorFloat = numero;
    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

inputValor.addEventListener('input', function(e) {
    const cursorPosition = this.selectionStart;
    let valorNumerico = this.value.replace(/[^0-9]/g, '');
    this.value = formatarReal(valorNumerico);

    const novoCursor = cursorPosition + (this.value.length - valorNumerico.length);
    this.setSelectionRange(novoCursor, novoCursor);
});

inputValor.value = formatarReal(inputValor.value);
inputValor.addEventListener('blur', function() {
    this.value = formatarReal(this.value);
});

/* const fruitState = {
  value: false,
  setFruitState(newValue) {
    this.value = newValue;
  }
}; */
const fruits = {
  fruitState: [],
  setFruitState: (fruit) => this.fruitState = fruit    
}

async function listFruits(){
  fruits.fruitState = await getFruitData();
  console.log(fruits.fruitState)
  cards.innerHTML = '';
  for(fruit of fruits.fruitState){
    console.log(fruit);
    cards.innerHTML += Card(fruit?.id, fruit?.nome, fruit?.imagem, fruit?.descricao, fruit?.valor);
  }
}
listFruits()





/* function openModal(){
  fruitState.setFruitState(!fruitState.value);
  console.log(fruitState.value)
} */

async function getFruitData() {
  const url = "http://localhost:5000/frutas";
  try {
    console.log('iniciando')
    const response = await fetch(url, {
      method: "GET",
    });  
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data  = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

async function createFruit(event) {
  event.preventDefault();
  const formNome = document.getElementById('form-nome');
  const formValor = document.getElementById('form-valor');
  const formImage = document.getElementById('inputGroupFile01');
  const formDescricao = document.getElementById('form-descricao');
  console.log(formNome)
  
  const formData = new FormData();
  formData.append("nome", formNome.value);
  formData.append("valor", valorFloat);
  formData.append("descricao", formDescricao.value);
  formData.append("imagem", formImage.files[0]);
  console.log(formImage.files[0])
  const url = "http://localhost:5000/frutas";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
    listFruits();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateFruit(id) {
  const url = "http://localhost:5000/frutas/"+id;
  console.log('update')
  try {
    const response = await fetch(url, {
      method: "PUT",
      /* body: { id: id }, */
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    listFruits();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteFruit(id) {
  const url = "http://localhost:5000/frutas/"+id;
  console.log('delete')
  try {
    const response = await fetch(url, {
      method: "DELETE",
      /* body: { id: id } */
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    listFruits();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}