# Nombre de proyecto: King Rise
# Cool-Videogames
# https://cool-videogames.github.io/Paradox-Invasion/
# Pivotal
# https://www.pivotaltracker.com/n/projects/2468915

![alt text](https://github.com/Cool-Videogames/KingRise/blob/main/logo.png "Logo")
## **Game Design Document**
# **_King Rise_**

## Índice:

### 1.-Descripción

### 2.-Mecánicas

#### 1.-Recursos

#### 2.-Acciones

#### 3.-Exploración

#### 4.-Construcción

#### 5.-Sistema de casillas

#### 6.-Movimiento del jugador

#### 7.-Cámara

#### 8.-Defensa de la aldea

#### 9.-Controles.

### 3.-Dinámicas

#### 1. Objetivos

#### 2. Recompensas y castigos

### 4.-Estética

### 5.-Arquitectura

### **1.-Descripción:**

King Rise es un videojuego de estrategia y gestión de recursos por turnos con vista isométrica que narra la historia de nuestro protagonista Paradox, que tras ser secuestrado por una tribu africana, se convierte en su rey. Así el jugador a través de Paradox deberá mantener su pequeña civilización y hacerla crecer luchando contra las invasiones francesas y demás problemas que puedan aparecer durante la partida. Para ello el jugador tendrá a su alcance una gran variedad de recursos que podrá obtener explorando y explotando sus tierras y con los que hará crecer su poblado.

El juego está basado en la novela Paradox Rey de Pio Baroja, en la que el protagonista es accidentalmente nombrado rey de una tribu durante un viaje de ocio a África.
En nuestro juego encarnamos a Paradox, y debemos gestionar a los aldeanos y recursos de la aldea para poder prosperar y defendernos de los ataques franceses durante el mayor número de rondas posibles, ya que la historia del libro tiene lugar durante el colonialismo francés.


### **2.-Mecánicas:**

**2.1-Recursos:**

Existen 4 recursos, cada uno tendrá sus utilidades:

-Oro: sirve para construir edificios, especializar tropas y destruir obstáculos.

-Comida: sirve para crear aldeanos en la choza.

-Materiales: sirve para construir edificios.

-Felicidad: a mayor felicidad mayor cantidad de recursos obtendrás de tus edificios debido a que los aldeanos trabajan de manera más eficaz.

**2.2-Acciones:**

Un día en el juego durará un número determinado de acciones. Los franceses atacarán cada X acciones, siendo X  un número que ira disminuyendo cada ronda, permitiéndote menos acciones hasta llegar a un mínimo que se quedara como constante. Por cada ronda de X turnos ganarás un aldeano extra.

**2.3-Exploración:**

Se podrá mandar tantos exploradores como tengas en la fase de construcción de uno en uno y tendrán probabilidad de morir durante la exploración. Si sobreviven, volverán tras a la aldea y habrá probabilidad de que se obtengan recursos. Mandar exploradores también gasta recursos.

**2.4-Construcción:**

El espacio de la aldea será una cuadrícula limitada por el entorno. En las casillas se podrán construir distintos edificios y cada uno ocupará un número distinto de casillas y costará oro y materiales. Estos edificios se podrán destruir y el jugador recibirá a cambio un 75% de los recursos invertidos en su construcción. Habrá varios tipos de edificios:

**Sociales:** habrá un edificio social, la taberna. En ella podremos guardar aldeanos, a más aldeanos guardados en ella más aumentará la felicidad de nuestra aldea habiendo un máximo de 5 aldeanos dentro.

**Defensivos:**

- Trampa en el suelo: Será destruida

- Trampa para osos: Atrapara a un francés quitándole vida y dejándolo aturdido encima suya.

- Puesto de vigilancia: Indica en que dirección vendrán los franceses si por la parte de la derecha o por abajo.

- Murallas: edificios que impiden el paso a las oleadas, haciendo que se entretengan destruyéndolo sin acercarse al trono.

-	Bunker: aquí se guardan las tropas a la espera de las oleadas de franceses. Cuando este edificio es destruido las tropas salen y se enfrentan a los franceses.

- Puesto de guardia: aquí se guardan las tropas a la espera de las oleadas de franceses.

- Torreón: se pueden colocar tropas a distancia que aguantan hasta que se destruya el edificio. Una vez destruido las tropas serán vulnerables.

- Caballo de troya: Podrás asignar tropas que se esconden dentro, una vez destruido aturdirá a los enemigos cercanos 1 segundo y liberará las tropas de dentro

**Choza maestra:** uno de los edificios más importantes, sirve para la especialización

de las tropas. Especializarse costará oro , comida y acciones. También se podrá crear nuevos aldeanos a cambio de recursos.

**Obtención de recursos:** En estos edificios podrás asignar una cantidad de aldeanos

especializados en ese recurso. Cuantos más se asignen, más acciones consumirá. Se podrá reducir las acciones consumidas construyendo más edificios del mismo recurso. Entre estos edificios encontramos: **minas** , **granjas** y **canteras**.

**Trono:** Lugar donde se esconde el rey durante los ataques. El objetivo del jugador será que no te destruyan este edificio y protegerlo.

**2.5-Sistema de casillas:**

El juego estará implementado en un cuadrícula de dimensiones fijas que se establecerá de forma aleatoria al principio de cada partida con una serie de obstáculos. Cada estructura tendrá un espacio fijado haciendo que esté ocupado y no se pueda construir encima suyo ni ser atravesado por el jugador **.**

**2.6-Movimiento del jugador:**

El movimiento del jugador estará basado en un algoritmo de búsqueda de caminos. El jugador hará clic en la casilla a la que quiera ir, y si no está ocupada se desplazará a dicha casilla por el camino más corto.

Si la casilla destino está ocupada, el jugador no hace nada. Moverse largas distancias consumirá acciones.

**2.7-Cámara:**

La cámara será libre y se moverá con las teclas W (arriba), A (izquierda), S (abajo) y D (derecha) del teclado.

**2.8-Defensa de la aldea:**

La defensa de la aldea será pasiva, el jugador no interacciona. Lo que sí podrá hacer, antes de la batalla es elegir cuantos aldeanos defienden y cuantos se esconden. Los aldeanos que se encuentren en los edificios escondidos saldrán de ellos al ser destruido dicho edificio y atacaran a los franceses. También el jugador deberá gestionar bien su aldea con edificios de defensa en la fase de construcción para frenar a el ataque de los franceses.

**2.9- Controles:**

El jugador podrá mover su avatar, el rey de la tribu, por todo el mapa mediante el ratón clicando en las casillas del mapa o en edificios para ir e interactuar con ellos.

EL ratón también valdrá para moverse por los diferentes menús del juego y por la HUD.

### **3.-DINÁMICAS:**

**3.1- Objetivos:**

Para ganar el jugador debe aprender a gestionar su aldea para proteger a los ciudadanos de los ataques constantes de las tropas francesas y algunas tribus adyacentes que querrán hacerse con sus dominios. Cuando logre construir la catedral, el edificio más caro de todos, finalizará el juego y habrás ganado. Si en algunos de los ataques los franceses destruyen el trono/palacete donde se encuentra tu personaje, perderás la partida.

**3.2- Recompensas y castigos:**

Durante el juego, deberás aprender a gestionar correctamente tu poblado para ser recompensado con recursos que te ayuden a defender tu aldea. Habrá algunos edificios caros que solo podrás construir con una gran cantidad de recursos, y para ello deberás ahorrarlos sin gastarlo en otras construcciones más básicas.

Si no logras un equilibrio en la gestión de dichos recursos el castigo será que las tropas francesas acabarán destruyendo tu aldea junto con tu trono y no sacaras una buena puntuación al final de la partida.

### **4.-ESTÉTICA:**

La estética general del juego estará hecha con pixelArt. La paleta de colores principal contendra tonos marrones, amarillos y verdes.

**4.1-Interfaz:**

- **HUD:**

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UIKingRise.png "UI")

En esta imagen se puede apreciar un boceto de lo que será la HUD del juego. Consta de varias partes todas ellas contenidas en una barra centrada en la parte inferior de la pantalla:

-	A la izquierda de esta barra tenemos la información de la cantidad de recursos que hay en nuestra tribu.
-	Seguido de el anterior a la derecha podemos ver un temporizador que nos marcará la cantidad de turnos que le queda al jugador para que los franceses ataquen.
-	A continuación, más a la derecha, está el botón de acciones, al pulsar en él tendremos un menú desplegable con todas las opciones que podrá elegir el jugador para gastar en ese turno.
-	Y por último a la derecha del todo de nuestra barra habrá un engranaje donde podremos cambiar algunos ajustes como por ejemplo el sonido y salir del juego.

- **Menús:**

Habrá dos menús: un menú de inicio, al entrar al juego y uno de ajustes. En el de inicio aparecerá el título del juego en la parte superior de la pantalla centrado, y debajo de él botón de Jugar. En el menú de ajustes tendremos un calibrado de sonido.

**4.2- Ambientación:**

Años 40 en África, en un poblado de indígenas que son atacados por los franceses conquistadores. Toda la estética estará relacionada con esta temática. Así el mapa será una sabana o selva, y la flora del lugar será propia de estas zonas.

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/AmbientacionAfrica.png "Ambientacion")

### **5.-ARQUITECTURA**

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UML1.png "UML1")

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UML2.png "UML2")

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UML3.png "UML3")
