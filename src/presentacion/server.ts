import express, { Router } from 'express'

interface Options{
    port: number,
    public_path: string
    routes: Router
}

export class Server{

    private app = express();
    private readonly port:number;
    private readonly publicPath:string;
    private readonly routes: Router

    constructor(options:Options){
        const {port, public_path='public', routes} = options
        this.port = port
        this.publicPath= public_path
        this.routes = routes
    }

    async start(){
        // Middlewares
        this.app.use( express.json()); //raw
        this.app.use( express.urlencoded({extended: true})) // x-www-form-urlencoded

        // Public folder
        this.app.use( express.static(this.publicPath))

        //Routes
        this.app.use(this.routes)

        this.app.listen(this.port, ()=>{
            console.log(`Server running on por ${this.port}`)
        })
    }
}