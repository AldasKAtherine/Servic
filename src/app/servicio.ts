import { PuntoGeografico } from './punto-geografico';
import { Categoria } from './categoria';
import { Resena } from './resena';

export class Servicio {

    id: string;
    titulo: string;
    descripcion: string;
    categoria: Categoria;
    precio: number;
    tipo_cobro: string;  // hora o servicio
    imagen: string;
    usuario_id: string;
    punto_geografico: PuntoGeografico;

    calificacion: number;
    numero_solicitudes: number;

    ultimas_resenas: Resena[]

}
