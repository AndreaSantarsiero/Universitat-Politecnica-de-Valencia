use Musica;


-- EJERCICIO 5.6:
-- 24)Obtener los nombre de los artistas de grupos con clubes de fans de más de 500 personas y que el grupo sea de Inglaterra.
SELECT DISTINCT artista.nombre
FROM artista, pertenece, grupo, club
WHERE artista.dni=pertenece.dni AND grupo.cod=pertenece.cod AND grupo.cod=club.cod_gru AND club.num>500 AND grupo.pais='Inglaterra';

-- 25)Obtener el título de las canciones de todos los discos del grupo U2.
SELECT cancion.titulo
FROM cancion, esta, disco, grupo
WHERE cancion.cod=esta.can AND disco.cod=esta.cod AND disco.cod_gru=grupo.cod AND grupo.nombre='U2';

-- 26)El dúo dinámico por fin se jubila; para sustituirles se pretende hacer una selección sobre todos los pares de artistas de grupos españoles distintos tales que el primero sea voz y el segundo guitarra. Obtener dicha selección.
SELECT A1.nombre AS voz, A2.nombre AS guitarra
FROM artista A1, artista A2, pertenece P1, pertenece P2, grupo G1, grupo G2
WHERE A1.dni=P1.dni AND P1.cod=G1.cod AND P1.funcion='voz' AND G1.pais='España'
      AND A2.dni=P2.dni AND P2.cod=G2.cod AND P2.funcion='guitarra' AND G2.pais='España'
      AND G1.cod<>G2.cod AND A1.dni<>A2.dni;

-- 27)Obtener el nombre de los artistas que pertenecen a más de un grupo.
SELECT artista.nombre
FROM artista, pertenece, grupo
WHERE artista.dni=pertenece.dni AND pertenece.cod=grupo.cod 
GROUP BY artista.dni, artista.nombre
HAVING COUNT(grupo.cod)>1;

-- 28)Obtener el título de la canción de mayor duración si es única.
SELECT cancion.titulo
FROM cancion
WHERE NOT EXISTS (SELECT *
                  FROM cancion C2
                  WHERE cancion.cod<>C2.cod AND C2.duracion>=cancion.duracion);

-- 29)Obtener el décimo (debe haber sólo 9 por encima de él) club con mayor número de fans indicando ese número.
SELECT club.nombre, club.num
FROM club
WHERE (SELECT COUNT(club.cod)
             FROM club C2
             WHERE C2.num > club.num)=9;

-- 30)Obtener el nombre de los artistas que tengan la función de bajo en un único grupo y que además éste tenga más de dos miembros.
SELECT a.nombre
FROM artista a
JOIN pertenece p ON a.dni = p.dni
JOIN grupo g ON p.cod = g.cod
WHERE p.funcion = 'bajo' AND (SELECT COUNT(*) 
                              FROM pertenece p2 
                              WHERE p2.cod = g.cod) > 2
GROUP BY a.dni, a.nombre
HAVING COUNT(DISTINCT p.cod) = 1;


-- 31)¿Cuál es la compañía discográfica que más canciones ha grabado?
SELECT companyia.nombre, COUNT(cancion.cod) AS canciones
FROM companyia, disco, esta, cancion
WHERE cancion.cod=esta.can AND disco.cod=esta.cod AND disco.cod_comp=companyia.cod
GROUP BY companyia.cod, companyia.nombre
HAVING COUNT(cancion.cod) = (SELECT MAX(COUNT(cancion.cod))
                             FROM companyia, disco, esta, cancion
                             WHERE cancion.cod=esta.can AND disco.cod=esta.cod AND disco.cod_comp=companyia.cod
                             GROUP BY companyia.cod, companyia.nombre);
