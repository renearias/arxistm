/* 
 *  Todos los derechos reservados
 */
export function snakeToCamel(s: string){
    return s.replace(/(\_\w)/g, function(m: any){return m[1].toUpperCase();});
}