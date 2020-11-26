export default class Vector2D {
    /*constructor(x, y, a = 1) {
        this.x = x * a;
        this.y = y * a;
    }*/
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    suma(v) {
        this.x += v.x;
        this.y += v.y; 
    }

    resta(v){
        this.x -= v.x;
        this.y -= v.y; 
    }
    multiplicacion(a){
        this.x *= a;
        this.y *= a;
    }
    print() {
        console.log('(' + this.x + ", " + this.y + ")");
    }
}