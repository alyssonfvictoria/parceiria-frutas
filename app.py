from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///frutas.db'
db = SQLAlchemy(app)

class Fruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)

# Criar tabelas no banco de dados
with app.app_context():
    db.create_all()

@app.route('/frutas', methods=['POST'])
def criar_fruta():
    data = request.get_json()
    nova_fruta = Fruta(nome=data['nome'])
    db.session.add(nova_fruta)
    db.session.commit()
    return jsonify({'mensagem': 'Fruta adicionada com sucesso!'}), 201

@app.route('/frutas', methods=['GET'])
def listar_frutas():
    frutas = Fruta.query.all()
    return jsonify([{'id': fruta.id, 'nome': fruta.nome} for fruta in frutas])

@app.route('/frutas/<int:id>', methods=['PUT'])
def editar_fruta(id):
    data = request.get_json()
    fruta = Fruta.query.get(id)
    if not fruta:
        return jsonify({'erro': 'Fruta não encontrada'}), 404
    fruta.nome = data['nome']
    db.session.commit()
    return jsonify({'mensagem': 'Fruta atualizada com sucesso!'})

@app.route('/frutas/<int:id>', methods=['DELETE'])
def deletar_fruta(id):
    fruta = Fruta.query.get(id)
    if not fruta:
        return jsonify({'erro': 'Fruta não encontrada'}), 404
    db.session.delete(fruta)
    db.session.commit()
    return jsonify({'mensagem': 'Fruta removida com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)
