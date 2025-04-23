export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface opcionesMenuPrincipal {
  title: string;
  caption?: string;
  icon: string;
  to?: string;
  href?: string;
}

export interface Profesor {
  check: boolean;
  id: number;
  nombre: string;
  apellido: string;
  grado: string;
}

export interface Alumno {
  check: boolean;
  id: number;
  nombre: string;
  apellido: string;
  grado: string;
}
