// any IGNORA el tipado de typescript
let anyvalue: any = "hola";

anyvalue.dsds; // por lo tanto no infiere al ser cualquier cosa

// puede contener cualquier valor pero es más seguro que any
let anyvalue2: unknown = "hola";

anyvalue2.dsds;

//----------------------------------------------------------------//

// functions

// implicito any, compila pero falla en ejecución
function saludar(name) {
  console.log(`hola ${name}`);
}

saludar("pepe");
saludar(123);

// asignar tipo
function saludar2(name: string) {
  console.log(`hola ${name}`);
}

saludar2("pepe");
saludar2(1);

// objetos

function saludar3({ name, age }) {
  console.log(`hola ${name}, tienes ${age} años`);
}

saludar3({ name: "pepe", age: 26 });

// tipar

function saludar4({ name, age }: { name: string; age: number }) {
  console.log(`hola ${name}, tienes ${age} años`);
}

saludar4({ name: "hector", age: 55 });

// inferencia del tipo que devuelve

function saludar5({ name, age }: { name: string; age: number }): number {
  // <- tipar return
  console.log(`hola ${name}, tienes ${age} años`);
  return age; // -> number ya se infiere pero se puede especificar y tipar arriba
}

saludar5({ name: "hector", age: 55 });

// funcion como parámetro

const sayHiFromFunction = (callback: (name: string) => void) => {
  callback("Miguel");
};

const sayHi = (name: string) => {
  console.log(`Hola ${name}`);
};

sayHiFromFunction(sayHi);

// forEach por dentro

function miForEach<T>(
  array: T[],
  callback: (valor: T, indice: number, arreglo: T[]) => void,
) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

const frutas = ["🍎", "🍌", "🍇"];

miForEach(frutas, (fruta, indice) => {
  console.log(indice, fruta);
});

/* never

function saludar6( message : string): never {
  throw new Error(message)
} */
