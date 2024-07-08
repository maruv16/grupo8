from flask import Flask
from flask_cors import CORS
from app.views import *
from app.database import init_app

app = Flask(__name__)


init_app(app)
CORS(app)

@app.route('/')

def home():
    return 'Bienvenido a la Tienda de Mascotas API'

app.route('/api/alimentos_balanceados/lista/', methods=['GET'])(get_listado_alimentos_balanceados)
app.route('/api/alimentos_balanceados/create/', methods=['POST'])(create_alimento)
app.route('/api/alimentos_balanceados/update/<int:alimento_id>', methods=['PUT'])(update_alimento)
app.route('/api/alimentos_balanceados/archive/<int:alimento_id>', methods=['DELETE'])(archive_alimento)
app.route('/api/alimentos_balanceados/<int:alimento_id>', methods=['GET'])(get_alimento)
app.route('/api/alimentos_balanceados/deleted/', methods=['GET'])(get_deleted_alimentos_balanceados)


if __name__ == '__main__':
    app.run(debug=True)





