import mysql.connector

# Conectar a la base de datos
mydb = mysql.connector.connect(
  host="18.209.47.57",
  port=4000,
  user="root",
  password="contrasena",
  database="test_mysql_db"
)

# Función para crear un registro en la tabla
def crear_registro(nombre, direccion):
    cursor = mydb.cursor()
    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    val = (nombre, direccion)
    cursor.execute(sql, val)
    mydb.commit()
    print(cursor.rowcount, "registro creado.")
    cursor.close()

# Función para leer todos los registros de la tabla
def leer_registros():
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM customers")
    result = cursor.fetchall()
    for row in result:
        print(row)
    cursor.close()

# Función para actualizar un registro en la tabla
def actualizar_registro(id, nombre, direccion):
    cursor = mydb.cursor()
    sql = "UPDATE customers SET name = %s, address = %s WHERE id = %s"
    val = (nombre, direccion, id)
    cursor.execute(sql, val)
    mydb.commit()
    print(cursor.rowcount, "registro(s) actualizado(s).")
    cursor.close()

# Función para borrar un registro de la tabla
def borrar_registro(id):
    cursor = mydb.cursor()
    sql = "DELETE FROM customers WHERE id = %s"
    val = (id,)
    cursor.execute(sql, val)
    mydb.commit()
    print(cursor.rowcount, "registro(s) borrado(s).")
    cursor.close()
