const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001
;

// Conectar a la base de datos
const pool = mysql.createPool({
  host: '18.209.47.57',
  port: 3306,
  user: 'root',
  password: 'contrasena',
  database: 'mysqldb'
});

//crear tabla
app.get('/createTable', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query('CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY (id))');
    //const result = await connection.query('CREATE DATABASE Pruebas');
    connection.release();
    res.json({ message: 'Tabla creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tabla' });
  }
});


// Obtener todos los registros
app.get('/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Obtener un registro por id
app.get('/users/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    connection.release();
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Agregar un registro
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const connection = await pool.getConnection();
    const result = await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    //const result = await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', ['Eduardo', 'solanojorge77@gmail.com']);
    connection.release();
    res.json({ id: result[0].insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// Actualizar un registro por id
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const connection = await pool.getConnection();
    const result = await connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id]);
    connection.release();
    if (result[0].affectedRows) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar un registro por id
app.delete('/users/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    connection.release();
    if (result[0].affectedRows) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
