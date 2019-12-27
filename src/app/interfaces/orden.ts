export interface Orden {
  id?: number;
  orden: number;
  cliente: number;
  nombre: string;
  usuario_id: number;
  articulos: {nombreArticulo: string, tipo: string, sku: string}[];
  usuario: {nombre: string};
}
