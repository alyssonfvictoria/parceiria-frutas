# CRUD de Frutas com Flask e SQLite

Este projeto é um CRUD simples de frutas utilizando Flask e SQLite. Além disso, há uma página frontend simples na raiz do projeto que pode ser aberta diretamente no navegador.

## 📌 Requisitos
- Python instalado (versão 3.8 ou superior)
- Git instalado

## 🚀 Instalação e Execução

1. **Clone o repositório**
   ```sh
   git clone https://github.com/alyssonfvictoria/parceiria-frutas.git
   cd parceiria-frutas
   ```

2. **Crie e ative um ambiente virtual**
   - No Windows (PowerShell):
     ```sh
     python -m venv venv
     venv\Scripts\Activate.ps1
     ```
   - No Linux/Mac:
     ```sh
     python -m venv venv
     source venv/bin/activate
     ```

3. **Instale as dependências**
   ```sh
   pip install -r requirements.txt
   ```

4. **Execute a aplicação**
   ```sh
   python app.py
   ```
   O servidor Flask rodará em [http://127.0.0.1:5000](http://127.0.0.1:5000).

## 🌐 Acessando o Frontend
O frontend é um arquivo estático `index.html`, localizado na raiz do projeto. Para acessá-lo:

1. Abra o arquivo `index.html` diretamente no navegador.
2. Ele permitirá interagir com a API, exibindo as frutas cadastradas.

## 📌 Endpoints da API

| Método  | Rota               | Descrição                     |
|---------|--------------------|--------------------------------|
| `POST`  | `/frutas`          | Adiciona uma nova fruta       |
| `GET`   | `/frutas`          | Lista todas as frutas         |
| `PUT`   | `/frutas/<id>`     | Edita uma fruta existente     |
| `DELETE`| `/frutas/<id>`     | Remove uma fruta do sistema   |

## 📝 Observação
- O banco de dados `frutas.db` será criado automaticamente na primeira execução.
- Caso faça alterações, reinicie o servidor para aplicar as mudanças.

---

Agora seu projeto está pronto para uso! 🚀

