export let filas = 16;
export let columnas =32;
export let sizeCasilla = 64;
export let playerSpeed=100;
export let rangoConstruccion = 6;

export let numObstaculos = 16;
export let zonaColumnas = 8;
export let zonaFilas = 4;

export let cantidadRecursosPorDefecto = 5;
export let rendimientoGeneral = 5;

export let cameraSpeed = 10;
export let cameraLimit = 200;

export let fontColor = 0xffff00;

export let numEspecialidades = 4;

//Interfaz
export let hudScale = 1.5;
    //Texts
    export let stroke = '#000000';
    export let font = 'Arial Black'
    export let fillColor = '#606060';
    export let fontSize = 30;

    //Sprites
    export let edificiosConstruibles = 10;
    export let hudSprites = 17;
    export let numTexts = 10;
    export let alturaHUD = 570;

//Profundidad de los sprites
export let mapDepth = 0;
export let playerDepth = 1;
export let hudDepth = 2;


//Acciones
export let numeroAccionesIniciales = 20;
export let costeAcciones = 1;
export let relacionAcciones = 0.8; //Razón por la cual se multiplica para obtener el número de movimientos para el siguiente ataque
export let numeroAccionesMinimo = 5;


//Exploracion
export let costeBaseExploracion = 20;
export let costePorExplorador = 5;
export let probabilidadExitoBase = 0.20;
export let probabilidadExitoPorExploradorAdicional = 0.05;
export let maximoRecursosPorRonda = 10;
