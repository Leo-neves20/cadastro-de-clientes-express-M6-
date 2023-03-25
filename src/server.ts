import { app } from "./app";
import appDataSource from "./data-source";

appDataSource.initialize().then(() => {

    console.log("server connect")
    
    app.listen(3000, () => {
        console.log("server is running in port 3000")
    })

})

