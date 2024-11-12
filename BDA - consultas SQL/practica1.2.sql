use Musica;


-- EJERCICIO 5.3:
-- 13)Obtener el nombre de los discos del grupo más viejo
SELECT disco.nombre
FROM disco, grupo
WHERE disco.cod_gru=grupo.cod AND grupo.fecha = (SELECT min(fecha)
                                                 FROM grupo);

-- 14)Obtener el nombre de los discos grabados por grupos con club de fans con más de 5000 personas
SELECT nombre
FROM disco
WHERE cod_gru IN(SELECT grupo.cod
               FROM grupo, club
               WHERE club.cod_gru=grupo.cod AND club.num>5000);

-- 15)Obtener el nombre de los clubes con mayor número de fans indicando ese número
SELECT nombre, num
FROM club
WHERE num=(SELECT max(num)
           FROM club);

-- 16)Obtener el título de las canciones de mayor duración indicando la duración
SELECT titulo, duracion
FROM cancion
WHERE duracion=(SELECT max(duracion)
                FROM cancion);
