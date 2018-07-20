        var db = createTable();
        
        function getopenDb() {  // Comprobar que Web SQL es compatible 
            try {
                if (window.openDatabase) {                    
                    return window.openDatabase;                    
                } else {
                    alert('No HTML5 support');
                    return undefined;
                }
            }
            catch (e) {
                alert(e);
                return undefined;
            }            
        }
        function createTable() { // Crear Base de Datos
            var openDB = getopenDb(); // variable openDB
            if(!openDB) // verificar que no exista la base de datos
            {                
                return;               
            }
            else
            {
                db = openDB('mydatabase', '1.0', 'my db', 10*1024*1024); // nombre de la BD, version, y tamaño
                db.transaction(function (t) { //t = transaction
                t.executeSql('CREATE TABLE IF NOT EXISTS myTable(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "JohnDoe", age TEXT NOT NULL);', [], null, null);  // Crear tablas             
                
            });
            selRows(); // llamado de la funcion selRows
            return db; 
            }            
        }
        function insertE() { // Insertar registros en la tabla creada
            if(!db)
            {                
                return;                
            }
            var name = document.getElementById("name").value; // variable donde se almacenara el 1er dato
            var age = document.getElementById("age").value; // variable donde se almacenara el 2do dato
        
            db.transaction(function (t) { //t = transaction
                t.executeSql("INSERT INTO myTable('name','age') values('" + name + "','" + age + "');", [], null, null); // insertar datos en la tabla
                alert("Nota Agregada!"); // Mensaje cuando se guarda el registro
                selRows(); // llamado de la funcion selRows
            });
        }
        function selRows() {
            
            var q = "select * from myTable"; // seleccionar datos de la tabla creada
            
            db.transaction(function (t) { //t = transaction
                t.executeSql(q, null, function (t, data) {
                    var html = "<table><tr><td><div id='nota'>Nota</div></td><td><div id='nota'>Fecha</div></td></tr>"; // mostrar datos en una tabla de html
                    for (var i = 0; i < data.rows.length; i++) { // insertar datos y mostrar en columnas cada registro
                        html += "<tr><td>" + data.rows.item(i).name + "</td><td>" + data.rows.item(i).age + "</td></tr>";
                    }
                    html += "</table>"; // tabla con los registros
                    var el = document.getElementById("main"); // mostrar registros en un div de html
                    el.innerHTML = html;
                });
            });
        }
        function clearDB() {
            if(!db)
            {                
                return;                
            }
            if(confirm('Deseas borrar tus notas?')) { // decidir si borrar registros creados
                db.transaction(function(t) {
                    t.executeSql('DELETE FROM myTable'); // sentencia para borrar los datos
                });
                selRows(); // funcion selRows
            }
        }
        