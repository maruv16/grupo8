from app.database import get_db
from datetime import datetime

class AlimentosBalanceados:
    def __init__(self, id=None, nombre=None, marca=None, descripcion=None, fecha_creacion=None, completada=None, activa=None):
        self.id = id
        self.nombre = nombre
        self.marca = marca
        self.descripcion = descripcion
        self.fecha_creacion = fecha_creacion
        self.completada = completada
        self.activa = activa
        
    @staticmethod
    def __get_alimentos_balanceados_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        alimentos_balanceados = []
        for row in rows:
            alimentos_balanceados.append(
                AlimentosBalanceados(
                    id=row[0],
                    nombre=row[1],
                    marca=row[2],
                    descripcion=row[3],
                    fecha_creacion=row[4],
                    completada=row[5],
                    activa=row[6]
                )
            )
                
        cursor.close()
        return alimentos_balanceados
    
    @staticmethod
    def get_all_listado():
        return AlimentosBalanceados.__get_alimentos_balanceados_by_query(
            """ SELECT * 
                FROM alimentos_balanceados 
                WHERE activa = true AND completada = true
                ORDER BY fecha_creacion DESC
            """)
    
    @staticmethod
    def get_all_deleted():
        return AlimentosBalanceados.__get_alimentos_balanceados_by_query(
            """ SELECT * 
                FROM alimentos_balanceados 
                WHERE activa = true
                ORDER BY fecha_creacion DESC
                """)
    
    @staticmethod
    def get_by_id(id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM alimentos_balanceados WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return AlimentosBalanceados(
                id=row[0],  
                nombre=row[1],
                marca=row[2],
                descripcion=row[3],
                fecha_creacion=row[4],
                completada=row[5],
                activa=row[6]
            )
        return None
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id: 
            cursor.execute(
                """
                    UPDATE alimentos_balanceados
                    SET nombre = %s, marca = %s, descripcion = %s, completada = %s, activa = %s
                    WHERE id = %s
                """,
                (self.nombre, self.marca, self.descripcion, self.completada, self.activa, self.id))
        else: 
            cursor.execute(
                """
                    INSERT INTO alimentos_balanceados (nombre, marca, descripcion, fecha_creacion, completada, activa)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (self.nombre, self.marca, self.descripcion, self.fecha_creacion, self.completada, self.activa))
            
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE alimentos_balanceados SET activa = false WHERE id = %s", (self.id,))
        db.commit()
        cursor.close()

    def serialize(self):
        # Verifica si `fecha_creacion` es una cadena y conviértela a `datetime` si es necesario
        if isinstance(self.fecha_creacion, str):
            try:
                fecha_creacion = datetime.strptime(self.fecha_creacion, '%Y-%m-%d')
            except ValueError:
                fecha_creacion = None
        else:
            fecha_creacion = self.fecha_creacion

        return {
            'id': self.id,
            'nombre': self.nombre,
            'marca': self.marca,
            'descripcion': self.descripcion,
            'fecha_creacion': fecha_creacion.strftime('%Y-%m-%d') if fecha_creacion else None,
            'completada': self.completada,
            'activa': self.activa
        }
    