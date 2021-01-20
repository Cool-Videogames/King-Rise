//General
export let filas = 24;
export let columnas = 24;
export let sizeCasilla = 64;
export let winWidth = 1280;
export let winHeight = 720;
export let playerSpeed = sizeCasilla * 2.5;
export let margenPosicion = 3;
export let rangoConstruccion = 5;
export let rangoInteraccion = 7;
export let numAldeanosIniciales = 5;

export let numObstaculos = 16;
export let zonaColumnas = 4;
export let zonaFilas = 4;

export let cantidadRecursosPorDefecto = 5;
export let rendimientoGeneral = 5;

export let cameraSpeed = 10;
export let cameraLimit = 200;
export let cameraPos = { x: 400, y: 100 };

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
export let hudSprites = 27;
export let numTexts = 10;

//Profundidad de los sprites
export let mapDepth = 0;
export let rangosVisionDepth = 1;
export let edificiosDepth = 2;
export let personasDepth = 3;
export let hudDepth = 7;

//Acciones
export let nuevoAldeano = 15;
export let generaRecursos = 4;
export let turnosPorConstruccion = 4;
export let numeroAccionesIniciales = 20;
export let relacionAcciones = 0.8; //Razón por la cual se multiplica para obtener el número de movimientos para el siguiente ataque
export let numeroAccionesMinimo = 5;
export let numeroCasillasRecorridasParaConsumirUnaAccion = 3;

//Exploracion
export let costeBaseExploracion = 20;
export let costePorExplorador = 5;
export let probabilidadExitoBase = 0.20;
export let probabilidadExitoPorExploradorAdicional = 0.05;
export let probabilidadExitoPorAldeanoAdicional = 0.15;
export let maximoRecursosPorRonda = { oro: 10, materiales: 10, comida: 5 };
export let duracionMaxima = 15;
export let duracionMinima = 5;

//Edificios
//Coste
export let costeChoza = { oro: 0, materiales: 50, comida: 0, felicidad: 0 };
export let costeMina = { oro: 0, materiales: 30, comida: 0, felicidad: 0 }; export let alMaxMina = 5; export let tamMina = { x: 5, y: 5 };
export let costeGranja = { oro: 0, materiales: 30, comida: 0, felicidad: 0 }; export let alMaxGranja = 5; export let tamGranja = { x: 7, y: 5 };
export let costeCantera = { oro: 0, materiales: 30, comida: 0, felicidad: 0 }; export let alMaxCantera = 5; export let tamCantera = { x: 3, y: 3 };
export let costeTrampaOso = { oro: 0, materiales: 10, comida: 0, felicidad: 0 };
export let costeTrampaSuelo = { oro: 0, materiales: 10, comida: 0, felicidad: 0 };
export let costeCaballoTroya = { oro: 0, materiales: 40, comida: 0, felicidad: 0 };
export let costePuestoVigilancia = { oro: 0, materiales: 40, comida: 0, felicidad: 0 };
export let costeBunker = { oro: 0, materiales: 40, comida: 0, felicidad: 0 };
export let costeMuro = { oro: 0, materiales: 20, comida: 0, felicidad: 0 };
export let costeTorreArqueros = { oro: 0, materiales: 40, comida: 0, felicidad: 0 };
export let costeTaberna = { oro: 0, materiales: 20, comida: 0, felicidad: 0 };
export let recuperacionRecursos = 75; //Porcentaje
//Vida
export let vidaChoza = 50;
export let vidaMina = 50;
export let vidaGranja = 50;
export let vidaCantera = 50;
export let vidaTrampaOso = 50;
export let vidaTrampaSuelo = 50;
export let vidaCaballoTroya = 50;
export let vidaPuestoVigilancia = 50;
export let vidaMuro = 50;
export let vidaTorreArqueros = 500;
export let vidaTaberna = 50;
export let vidaTrono = 1000;
//Danio
export let danioTorreArqueros = 20;

//Descripcion edificios
export let textoChoza = "La choza maestra: es el \nedificio más  importante.\nEn él podrás crear  y\nespecializar a tus \nqueridísimos aldeanos.";
export let textoMina = "La mina: asigna mineros \npara obtener oro. Cuantos \nmás mineros trabajen más\nrendimiento tendrá la \nmina.";
export let textoGranja = "La granja: asigna \nganaderos para obtener \ncomida. Cuantos más \nganaderos trabajen más \nrendimiento tendrá la \ngranja.";
export let textoTrampaOso = "La trampa para osos: \nes una poderosa \nherramienta que al ser \npisada dañará y \nanclará a los enemigos \nal suelo."
export let textoTorreArqueros = "La torre de arqueros: \nasigna exploradores \npara defender la \naldea. Cuantos más \nexploradores más daño \ncausará.";
export let textoPuestoVigilancia = "El puesto de vigilancia:\ncóntruyelo en los bordes \ndel mapa para ver \npor donde vendrán \nenemigos."
export let textoCaballoTroya = "El caballo de troya: \npermite almacenar \nexploradores. Al ser \ndestruido los exploradores \natacarán y anclará a \nlos enemigos al suelo."
export let textoTaberna = "La taberna: permite \na tus aldeanos \npasar un buen rato, \naumentando lafelicidad."
export let textoTrampaSuelo = "La trampa en el suelo: \nelimina a los enemigos al \ninstante haciéndolos caer \nal profundo agujero."
export let textoMuro = "El muro: bloquea el \npaso a los enemigos con \nesta resistente estructura."
export let textoCantera = "La cantera: asigna \ncanteros para obtener \nmaterial de construcción. \nCuantos más canteros \ntrabajén más rendimiento \ntendrá la cantera.";
export let textoBunker = "El bunker: es una \nestructura indestructible \npara poder salvar a \nunos cuantos aldeanos \ndel ataque enemigo.";

//Fondo
export let interseccionMontañaMar = 20; //Siempre menor o igual que el numero de columnas del mapa

//Ajustes
export let limiteDer = 769;
export let limiteIzq = 508;

export let aldeanosBasicos = {
    vida: 40,
    dmg: 8,
}

export let mineros = {
    vida: 70,
    dmg: 12,
}

export let exploradores = {
    vida: 25,
    dmg: 10,
}

export let ganaderos = {
    vida: 20,
    dmg: 5,
}

export let canteros = {
    vida: 60,
    dmg: 10,
}

//Enemigo
export let enemigo = {
    dmg: 3,
    vida: 50,
    rango: 2,
    speed: 120,
    cadencia: 2
}