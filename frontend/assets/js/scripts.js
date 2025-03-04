//import Card from "./card";

const fruitState = {
  value: false,
  setFruitState(newValue) {
    this.value = newValue;
  }
};

function openModal(){
  fruitState.setFruitState(!fruitState.value);
  console.log(fruitState.value)
}

async function getFruitData() {
  const url = "http://localhost:5000/frutas";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return JSON.parse(json);
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
  formData.append("valor", formValor.value);
  formData.append("descricao", formDescricao.value);
  formData.append("imagem", formImage.files[0]);

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
    return JSON.parse(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function updateFruit(id) {
  const url = "http://localhost:5000/frutas";
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: { id: id },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return JSON.parse(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteFruit(id) {
  const url = "http://localhost:5000/frutas";
  try {
    const response = await fetch(url, {
      method: "DELETE",
      body: { id: id }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return JSON.parse(json);
  } catch (error) {
    console.error(error.message);
  }
}