const cards = document.getElementById('cards');
const header = document.getElementById('header');
/* const modalComponent = document.getElementById('modalComponent'); */
header.innerHTML = Header();
/* modalComponent.innerHTML = Modal(); */


/* for (let i = 0; i < 5; i++) {
  cardneja.innerHTML += Card('Titulo', '', 'ola mundooooooo');
} */
/* console.log(fruits);
for(fruit of fruits.fruitState){
  cardneja.innerHTML += Card(fruit?.nome, '', fruit?.descricao);
} */







function Header() {
  return (
    `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <button onclick="" type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Adcionar fruta
          </button>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>`
  );
}

function Card(id, nome, imagem, descricao, valor) {
  let url = 'http://localhost:5000';
  let imagemFinal = imagem;
  if (imagem === '/assets/') {
    url = "";
    imagemFinal = "assets/img/fruta.jpg";
  }
  console.log(url + imagemFinal)
  return `
    <div class="card col-3 mb-4" style="width: 18rem; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <img src="${url + imagemFinal}" class="card-img-top object-fit-cover" alt="${nome}" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"/>
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="card-title">${nome}</h5>
          <div>
            <button type="button" class="btn-close"  onclick="deleteFruit(${id})"></button>
            <button onclick="updateFruit(${id})" class="btn btn-sm btn-warning";" title="Editar">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <p class="card-text">${descricao}</p>
        <p class="card-text font-weight-bold">Preço: R$ ${parseFloat(valor).toFixed(2)}</p>
        <button onclick="" type="button" class="btn btn-primary">
          Comprar
        </button>
      </div>
    </div>
  `;
}

function Modal() {
  return `
  <div class="modal fade" id="modalComponent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Nova fruta</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">  
          <div class="mb-3">
            <label for="basic-url" class="form-label">Nome da fruta</label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon3">Nome</span>
              <input type="text" class="form-control" id="form-nome" aria-describedby="basic-addon3 basic-addon4">
            </div>
            <div class="form-text" id="basic-addon4">Nome da fruta</div>
          </div>
          
          <div class="input-group mb-3">
            <span class="input-group-text">R$</span>
            <input type="text" class="form-control" id="form-valor" aria-label="Amount">
          </div>
          
          <div class="input-group">
            <span class="input-group-text">Descrição</span>
            <textarea class="form-control" aria-label="With textarea" id="form-descricao"></textarea>
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">Imagem</label>
            <input type="file" class="form-control" id="inputGroupFile01">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sair</button>
          <button type="button" class="btn btn-primary" onclick="createFruit(event)">Adcionar fruta</button>
        </div>
      </form>
    </div>
  </div>
  `;
}
