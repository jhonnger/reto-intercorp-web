export interface ClienteEntity {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  edad?: number;
}
