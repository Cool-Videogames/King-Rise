![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/KingRiseLogo.PNG "Logo")
## **Game Design Document** 
# **_King Rise_**

## Índice:
  
### 1.-Descripción

### 2.-Mecánicas

#### 1.-Recursos
  
#### 2.-Acciones
  
#### 3.-Exploración
  
#### 4.-Construcción
  
#### 5.-Sistema de eventos
  
#### 6.-Sistema de movimientos
  
#### 7.-Sistema de casillas
  
#### 8.-Movimiento del jugador
  
#### 9.-Cámara
  
#### 10.-Defensa de la aldea
  
#### 11.-Ciclo de día y noche.

### 3.-Dinámicas

#### 1. Objetivos

#### 2. Recompensas y castigos

### 4.-Estética

### 5.-Arquitectura

### **1.-Descripción:**

King Rise es un videojuego de estrategia y gestión de recursos por turnos con vista isométrica que narra la historia de nuestro protagonista Paradox, que tras ser secuestrado por una tribu africana, se convierte en su rey. Así el jugador a través de Paradox deberá mantener su pequeña civilización y hacerla crecer luchando contra las invasiones francesas y demás problemas que puedan aparecer durante la partida. Para ello el jugador tendrá a su alcance una gran variedad de recursos que podrá obtener explorando y explotando sus tierras y con los que hará crecer su poblado.

### **2.-Mecánicas:**

**2.1-Recursos:**

Existen 4 recursos, cada uno tendrá sus utilidades:

-Oro: sirve para construir edificios, especializar tropas y destruir obstáculos.

-Comida: sirve para especializar aldeanos en diferentes tipos de trabajos.

-Materiales: sirve para construir edificios.

-Felicidad: a mayor felicidad mayor cantidad de recursos obtendrás de tus edificios debido a que los aldeanos trabajan de manera más eficaz.

**2.2-Acciones:**

Un día en el juego durará un número determinado de acciones. Los franceses atacarán por la noche cada X acciones, siendo X un número constante. Dichos ataques estarán relacionados con el día y la noche. Entre ataque y ataque francés, también podrán atacar otras tribus, más débiles que los franceses pero más frecuentes. Cada X días ganarás un aldeano extra.

**2.3-Exploración:**

Se podrá mandar una cantidad de exploradores y tendrán probabilidad de morir durante la exploración. Si sobreviven, volverán tras un número de acciones a la aldea y habrá probabilidad de que se obtenga lo siguiente:

-Recursos.

-Descubrir una tribu.

-Aldea francesa.

Descubrir una tribu te dará la opción de atacar de forma pasiva, teniendo posibilidad de ganar o de perder. Si ganas obtienes recursos y poder traer a nuevos miembros a tu aldea. Si pierdes perderás recursos y tropas. El resultado de la batalla dependerá de la fuerza de las aldeas y será informado al jugador una vez terminado el combate, es decir, tras una serie de acciones.

La exploración será pasiva y cuantos más exploradores mandes más probabilidades de éxito tendrás pero gastarás más comida y acciones.

**2.4-Construcción:**

El espacio de la aldea será una cuadrícula limitada por el entorno. En las casillas se podrán construir distintos edificios y cada uno ocupará un número distinto de casillas y costará oro y materiales. Estos edificios se podrán destruir y el jugador recibirá a cambio un 75% de los recursos invertidos en su construcción. Habrá varios tipos de edificios:

**Sociales:** edificios cuyo fin será beneficiar al pueblo, como por ejemplo casas, tabernas y zonas de ocio. Aumentan la felicidad.

**Defensivos:**

- Trampa en el suelo

- Trampa para osos
(Tanto esta como la anterior, desaparecerá al ser activada)

- Puesto de vigilancia: los exploradores estarán en este edificio entre las oleadas de franceses. Su visión será un cono e indicará si vendrán tropas por esa zona. Se podrán asignar 1 o 2 exploradores, aumentando el rango si son 2.

- Murallas: edificios que impiden el paso a las oleadas.

- Puesto de guardia: aquí se guardan las tropas a la espera de las oleadas de franceses.

- Torreón: se pueden colocar tropas a distancia que aguantan hasta que se destruya el edificio. Una vez destruido las tropas serán vulnerables.

- Caballo de troya: Podrás asignar tropas que se esconden dentro, una vez destruido aturdirá a los enemigos cercanos 1 segundo y liberará las tropas de dentro

**Choza maestra:** uno de los edificios más importantes, sirve para la especialización

de las tropas. Especializarse costará oro , comida y acciones. También se podrá crear nuevos aldeanos a cambio de recursos.

**Obtención de recursos:** En estos edificios podrás asignar una cantidad de aldeanos

especializados en ese recurso. Cuantos más se asignen, más acciones consumirá. Se podrá reducir las acciones consumidas construyendo más edificios del mismo recurso. Entre estos edificios encontramos: **minas** , **granjas** y **canteras**.

**Trono:** Lugar donde se esconde el rey durante los ataques.

**Catedral:** objetivo del jugador. Al construir este edificio ganas la partida.

**2.5 Sistema de eventos:**

Cada cierto número de movimientos al jugador se le presenta una oferta la cual podrá aceptar o rechazar. Esta oferta afectará directamente al sistema de movimientos.

**2.6-Sistema de movimientos:**

El juego contará con un sistema de &quot;movimientos&quot; el cual gestiona cómo avanza y se desarrolla la partida. Incorporará un contador que irá progresando conforme el jugador gestione sus decisiones el cual indicará la posición actual. Además, también guarda en que turno ocurrirán los siguientes eventos, como el ataque francés.

**2.7-Sistema de casillas:**

El juego estará implementado en un cuadrícula de dimensiones fijas que se establecerá de forma aleatoria al principio de cada partida con una serie de obstáculos. Cada estructura tendrá un espacio fijado haciendo que esté ocupado y no se pueda construir encima suyo ni ser atravesado por el jugador **.**

**2.8-Movimiento del jugador:**

El movimiento del jugador estará basado en un algoritmo de búsqueda de caminos (A\*). El jugador hará click en la casilla a la que quiera ir, y si no está ocupada se desplazará a dicha casilla por el camino más corto.

Si la casilla destino está ocupada, el jugador se desplazará a la casilla adyacente más cercana, si también está ocupada, el jugador no hace nada.

Si no se puede llegar a una casilla porque el camino está bloqueado, saldrá un indicador de que no se puede llegar a esa casilla y el jugador no hace nada.

Moverse largas distancias consumirá acciones.

**2.9-Cámara:**

La cámara seguirá al jugador (no estará centrada en él), pero de tal forma que el jugador siempre esté dentro en un rectángulo invisible que esté en el centro de la pantalla. La única excepción de que el jugador no esté dentro del rectángulo es cuando esté cerca del límite del juego pues la cámara siempre estará dentro del tablero jugable.

También consideramos hacer que la cámara se mueva siguiendo al ratón (libre), volviendo al jugador pulsando una tecla.

La cámara contará con un zoom para ver desde más cerca o lejos.

**2.10-Defensa de la aldea:**

La defensa de la aldea será pasiva, el jugador no interacciona. Lo que sí podrá hacer es elegir cuantos aldeanos defienden y cuantos se esconden (evitando así perderlos), es decir, gestionar la defensa, dinámica principal del sistema de ataque y defensa.

**2.11-Ciclo de día y noche:**

Consistirá en que cada cierto número de turnos cambiará del día a la noche y viceversa, teniendo determinadas ventajas y desventajas dependiendo del momento.

El objetivo del día será preparar la defensa para la noche. Y en la noche, como se ha mencionado previamente, vendrá una tropa francesa a invadir tu aldea. Una vez terminada, tendrás que reponer fuerzas durante el resto de la noche para seguir aprovechando el día. Esta idea se desarrollará si el tiempo nos es favorable.

**2.12- Controles:**

El jugador podrá mover su avatar, el rey de la tribu, por todo el mapa mediante el ratón clicando en las casillas del mapa o en edificios para ir e interactuar con ellos.

EL raton tambien valdra para moverse por los diferentes menús del juego y por la HUD.

### **3.-DINÁMICAS:**

**3.1- Objetivos:**

Para ganar el jugador debe aprender a gestionar su aldea para proteger a los ciudadanos de los ataques constantes de las tropas francesas y algunas tribus adyacentes que querrán hacerse con sus dominios. Cuando logre construir la catedral, el edificio más caro de todos, finalizará el juego y habrás ganado. Si en algunos de los ataques los franceses destruyen el trono/palacete donde se encuentra tu personaje, perderás la partida.

**3.2- Recompensas y castigos:**

Durante el juego, deberás aprender a gestionar correctamente tu poblado para ser recompensado con recursos que te ayuden a defender tu aldea. Habrá algunos edificios caros que solo podrás construir con una gran cantidad de recursos, y para ello deberás ahorrarlos sin gastarlo en otras construcciones más básicas.

Si no logras un equilibrio en la gestión de dichos recursos el castigo será que las tropas francesas acabarán destruyendo tu aldea y perderás la partida.

### **4.-ESTÉTICA:**

La estética general del juego estará hecha con pixelArt. La paleta de colores principal contendra tonos marrones, amarillos y verdes. Cuando en el juego sea de noche todos estos colores se tornaran más azules y grises.

**4.1-Interfaz:**

- **HUD:**

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UIKingRise.png "UI")

En esta imagen se puede apreciar un boceto de lo que será la HUD del juego. Consta de varias partes todas ellas contenidas en una barra centrada en la parte inferior de la pantalla:

- A la izquierda de esta barra tenemos la información de la cantidad de recursos que hay en nuestra tribu.
- Seguido de el anterior a la derecha podemos ver un temporizador que nos marcará la cantidad de turnos que le queda al jugador para que los franceses ataquen.
- A continuación más a la derecha está el botón de acciones, al pulsar en él tendremos un menú desplegable con todas las opciones que podrá elegir el jugador para gastar en ese turno.
- Y por último a la derecha del todo de nuestra barra habrá un engranaje donde podremos cambiar algunos ajustes como por ejemplo el sonido y salir del juego.

- **Menús:**

Habrá dos menús: un menú de inicio, al entrar al juego y uno de ajustes. Aparecerán centrados en la pantalla. En el de inicio aparecerá el título del juego en la parte superior de la pantalla centrado, y debajo de él dos botones: Jugar y opciones. En el menú de ajustes tendremos lo mismo que aparece al tocar el menú de opciones en de inicio, un calibrado de sonido y un botón para salir del juego.

**4.2- Ambientación:**

Años 40 en África, en un poblado de indígenas que son atacados por los franceses conquistadores. Toda la estética estará relacionada con esta temática. Así el mapa será una sabana o selva, y la flora del lugar será propia de estas zonas.

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/AmbientacionAfrica.png "Ambientacion")

### **5.-ARQUITECTURA**

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UML1.png "UML1")

![alt text](https://github.com/Cool-Videogames/Paradox-Invasion/blob/main/phasertemplate-master/images/UML2.png "UML2")