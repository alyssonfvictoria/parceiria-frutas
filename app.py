from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///frutas.db'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'assets')
db = SQLAlchemy(app)
CORS(app)

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

class Fruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    imagem = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Fruta {self.nome}>'

def criar_tabelas():
    with app.app_context():
        db.create_all()

criar_tabelas()

@app.route('/frutas', methods=['POST'])
def criar_fruta():
    nome = request.form['nome']
    valor = float(request.form['valor'])
    descricao = request.form.get('descricao', '')
    imagem = request.files.get('imagem')

    imagem_filename = ''
    if imagem:
        imagem_filename = imagem.filename
        imagem_path = os.path.join(os.getcwd(), 'assets', imagem_filename)
        imagem.save(imagem_path)

    nova_fruta = Fruta(
        nome=nome,
        valor=valor,
        descricao=descricao,
        imagem=imagem_filename
    )
    
    db.session.add(nova_fruta)
    db.session.commit()

    return jsonify({'mensagem': 'Fruta adicionada com sucesso!'}), 201

@app.route('/frutas', methods=['GET'])
def listar_frutas():
    frutas = Fruta.query.all()
    return jsonify([
        {'id': fruta.id, 'nome': fruta.nome, 'valor': fruta.valor, 'descricao': fruta.descricao, 'imagem': f'/assets/{fruta.imagem}'}

        for fruta in frutas
    ])

@app.route('/assets/<path:filename>')
def get_image(filename):
    return send_from_directory('assets', filename)

@app.route('/frutas/<int:id>', methods=['PUT'])
def editar_fruta(id):
    data = request.get_json()
    fruta = Fruta.query.get(id)
    print(fruta)
    if not fruta:
        return jsonify({'erro': 'Fruta não encontrada'}), 404
    fruta.nome = data['nome']
    fruta.valor = float(data['valor'])  # Converte para float
    fruta.descricao = data.get('descricao', '')
    fruta.imagem = data.get('imagem', fruta.imagem)
    db.session.commit()
    return jsonify({'mensagem': 'Fruta atualizada com sucesso!'})

@app.route('/frutas/<int:id>', methods=['DELETE'])
def deletar_fruta(id):
    fruta = Fruta.query.get(id)
    print(fruta)
    if not fruta:
        return jsonify({'erro': 'Fruta não encontrada'}), 404
    db.session.delete(fruta)
    db.session.commit()
    return jsonify({'mensagem': 'Fruta removida com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)
