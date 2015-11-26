        var db = createTable();
        
        function getopenDb() { 
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
        function createTable() {
            var openDB = getopenDb();
            if(!openDB)
            {                
                return;               
            }
            else
            {
                db = openDB('appMovil', '1.0', 'app phonegap', 10*1024*1024);
                db.transaction(function (t) { //t = transaction
                t.executeSql('CREATE TABLE IF NOT EXISTS notesNew(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, note TEXT NOT NULL DEFAULT "JohnDoe", day TEXT NOT NULL);', [], null, null);               
                
            });
            selRowsf();
            return db;
            }            
        }
        function insertI() {
            if(!db)
            {                
                return;                
            }
            var note = document.getElementById("note").value;
            var day = document.getElementById("day").value;
        
            db.transaction(function (t) { //t = transaction
                t.executeSql("INSERT INTO notesNew('note','day') values('" + note + "','" + day + "');", [], null, null);
                alert("Nota Agregada!");
                selRowsf();
            });
        }
        function selRowsf() {
            
            var q = "select * from notesNew";
            
            db.transaction(function (t) { //t = transaction
                t.executeSql(q, null, function (t, data) {
                    var html = "<table><tr><td >Nota</td><td>Fecha</td></tr>";
                    for (var i = 0; i < data.rows.length; i++) {
                        html += "<tr><td>" + data.rows.item(i).note + "</td><td>" + data.rows.item(i).day + "</td></tr>";
                    }
                    html += "</table>";
                    var ell = document.getElementById("mains");
                      ell.innerHTML = html;
                });
            });
        }
        function clearDB() {
            if(!db)
            {                
                return;                
            }
            if(confirm('Clear the entire table?')) {
                db.transaction(function(t) {
                    t.executeSql('DELETE FROM notesNew');
                });
                selRowsf();
            }
        }
        