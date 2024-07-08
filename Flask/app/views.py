from flask import jsonify, request
from app.models import AlimentosBalanceados
from datetime import datetime

def index():
    return jsonify({'message': 'Hello World API Tienda_Mascotas'})

def get_listado_alimentos_balanceados():
    alimentos_balanceados = AlimentosBalanceados.get_all_listado()
    return jsonify([alimento.serialize() for alimento in alimentos_balanceados])

def get_deleted_alimentos_balanceados():
    alimentos_balanceados = AlimentosBalanceados.get_all_deleted()
    return jsonify([alimento.serialize() for alimento in alimentos_balanceados])

def get_alimento(alimento_id):
    alimento = AlimentosBalanceados.get_by_id(alimento_id)
    if not alimento:
        return jsonify({'message': 'Alimento no encontrado'}), 404
    return jsonify(alimento.serialize())

def create_alimento():
    data = request.json
    new_alimento = AlimentosBalanceados(
        nombre=data['nombre'],
        marca=data['marca'],
        descripcion=data['descripcion'],
        fecha_creacion=datetime.today().strftime('%Y-%m-%d'),
        completada=True,
        activa=True
    )
    new_alimento.save()
    return jsonify({'message': 'Alimento creado exitosamente','data':new_alimento.serialize()}), 201

def update_alimento(alimento_id):
    alimento = AlimentosBalanceados.get_by_id(alimento_id)
    if not alimento:
        return jsonify({'message': 'Alimento no fue encontrado'}), 404
    data = request.json
    alimento.nombre = data['nombre']
    alimento.marca = data['marca']
    alimento.descripcion = data['descripcion']
    alimento.save()
    return jsonify({'message': 'Alimento creado exitosamente'})

def archive_alimento(alimento_id):
    alimento = AlimentosBalanceados.get_by_id(alimento_id)
    if not alimento:
        return jsonify({'message': 'Alimento no fue encontrado'}), 404
    alimento.delete()
    return jsonify({'message': 'Alimento borrado exitosamente'})

