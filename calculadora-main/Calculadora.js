class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }
    
    cuadrado(num1) {
        return num1 * num1;
    }

    porcentaje(num1, num2) {
        return num1 * (num2 /100);
    }

    raiz(num1) {
        return Math.sqrt(num1);
    }
}
