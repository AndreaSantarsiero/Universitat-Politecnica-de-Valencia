use biblioteca;


-- EJERCICIO 7.1:
-- 1)Obtener el nombre de los autores de nacionalidad ‘Argentina’
SELECT nombre
FROM autor
WHERE nacionalidad='Argentina';

-- 2)Obtener los títulos de las obras que contengan la palabra ‘mundo’
SELECT titulo
FROM obra
WHERE titulo LIKE '%mundo%';

-- 3)Obtener el identificador de los libros anteriores a 1990 y que contengan más de una obra indicando el número de obras que contiene
SELECT libro.id_lib, libro.num_obras
FROM libro
WHERE libro.año<1990 AND libro.num_obras>1;

-- 4)¿Cuántos libros hay de los que se conozca el año de publicación?
SELECT COUNT(libro.id_lib)
FROM libro
WHERE libro.año IS NOT NULL;

-- 5)Cuántos libros tienen más de una obra? Resolver este ejercicio utilizando el atributo num_obras
SELECT COUNT(libro.id_lib)
FROM libro
WHERE libro.num_obras>1;

-- 6)Obtener el identificador de los libros del año 1997 que no tienen título
SELECT libro.id_lib
FROM libro
WHERE libro.año=1997 AND libro.titulo IS NULL;

-- 7)Mostrar todos los títulos de los libros que tienen título en orden alfabético descendente
SELECT libro.titulo
FROM libro
WHERE libro.titulo IS NOT NULL
ORDER BY libro.titulo DESC;

-- 8)Obtener cuántas obras hay en los libros publicados entre 1990 y 1999
SELECT SUM(libro.num_obras)
FROM libro
WHERE libro.año>=1990 AND libro.año<=1999; 


-- EJERCICIO 7.2:
-- 9)Obtener cuántos autores han escrito alguna obra con la palabra “ciudad” en su título
SELECT COUNT(DISTINCT autor.autor_id)
FROM autor
JOIN escribir ON autor.autor_id=escribir.autor_id
JOIN obra ON escribir.cod_ob=obra.cod_ob
WHERE obra.titulo LIKE '%ciudad%';

-- 10)Obtener el título de todas las obras escritas por el autor de nombre ‘Camús, Albert’
SELECT obra.titulo
FROM obra
JOIN escribir ON escribir.cod_ob=obra.cod_ob
JOIN autor ON autor.autor_id=escribir.autor_id
WHERE autor.nombre='Camús, Albert';

-- 11)¿Quién es el autor de la obra de título ‘La tata’?
SELECT autor.nombre
FROM autor
JOIN escribir ON autor.autor_id=escribir.autor_id
JOIN obra ON escribir.cod_ob=obra.cod_ob
WHERE obra.titulo='La tata';

-- 12)Obtener el nombre de los amigos que han leído alguna obra del autor de identificador ‘RUKI’
SELECT DISTINCT amigo.nombre
FROM amigo
JOIN leer ON leer.num=amigo.num
JOIN escribir ON escribir.cod_ob=leer.cod_ob
WHERE escribir.autor_id='RUKI';

-- 13)Obtener el título y el identificador de los libros que tengan título y más de una obra. Resolver este ejercicio sin utilizar el atributo num_obras
SELECT libro.titulo, libro.id_lib
FROM libro
JOIN esta_en ON esta_en.id_lib=libro.id_lib
JOIN obra ON obra.cod_ob=esta_en.cod_ob
WHERE libro.titulo IS NOT NULL
GROUP BY libro.id_lib, libro.titulo
HAVING COUNT(obra.cod_ob)>1;
-- oppure
SELECT DISTINCT libro.titulo, libro.id_lib
FROM libro
JOIN esta_en ON esta_en.id_lib=libro.id_lib
JOIN obra ON obra.cod_ob=esta_en.cod_ob
WHERE libro.titulo IS NOT NULL AND EXISTS (SELECT DISTINCT libro.titulo, libro.id_lib
                                           FROM libro
                                           JOIN esta_en ON esta_en.id_lib=libro.id_lib
                                           JOIN obra O2 ON O2.cod_ob=esta_en.cod_ob
                                           WHERE libro.titulo IS NOT NULL AND O2.cod_ob<>obra.cod_ob);


-- EJERCICIO 7.3
-- 14)Obtener el título de las obras escritas sólo por un autor si éste es de nacionalidad “Francesa” indicando también el nombre del autor

-- 15)¿Cuántos autores hay en la base de datos de los que no se tiene ninguna obra?

-- 16)Obtener el nombre de esos autores

-- 17)Obtener el nombre de los autores de nacionalidad “Española” que han escrito dos o más obras

-- 18)Obtener el nombre de los autores de nacionalidad “Española” que han escrito alguna obra que está en dos o más libros

-- 19)Obtener el título y el código de las obras que tengan más de un autor

-- 20)Obtener el nombre de los amigos que han leído todas las obras del autor de identificador ‘RUKI’

-- 21)esolver de nuevo la consulta anterior pero para el autor de identificador ‘GUAP’

-- 22)Obtener el nombre de los amigos que han leído todas las obras de algún autor de los que hay en la tabla autor

-- 23)Resolver la consulta anterior indicando también el nombre de ese autor

-- 24)