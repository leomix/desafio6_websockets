import * as fs from 'fs/promises'
export class ContenedorFile{

    constructor(nombreArchivo){

        this.nombreArchivo = nombreArchivo
        this.lista = []
    }

    async post(objeto){

        this.lista = await this.#readFile()

        objeto.id = this.lista.length >0 ? this.lista.slice(-1)[0].id + 1 : 1;
        this.lista.push(objeto)

        await this.#writeFile()

        return objeto.id
    }
    async put(objeto){

        this.lista = await this.#readFile()

        this.lista = this.lista.map(x => (x.id == objeto.id) ? objeto : x)

        await this.#writeFile()

        return objeto
    }

    async getById(id){

        this.lista = await this.#readFile()

        return this.lista.find(obj =>  obj.id === id)
    }

    async getAll(){

        return await this.#readFile()
    }

    async deleteById(id){

        this.lista = await this.#readFile()

        this.lista = this.lista.filter(obj =>  obj.id !== id)

        await this.#writeFile()
    }

    async getRandom(){
        this.lista = await this.#readFile()

        return  this.lista[Math.floor(Math.random() * this.lista.length)];
    }

    async deleteAll(){

        this.lista = []

        await this.#writeFile()
    }
    async #writeFile(){
        
        await fs.writeFile(this.nombreArchivo,JSON.stringify(this.lista)).catch(this.#handleError)
        
    }
    async #readFile(){

        try{

           let resultado =  await fs.readFile(this.nombreArchivo)
           return JSON.parse(resultado)
        }catch(e){

            return []
        }
    }

    #handleError(err) {
        console.log(err);
    }
    
}
