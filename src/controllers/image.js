const path = require('path');
const controllers = {}
const { randomNumer } = require('../helpers/libs')
const fs = require('fs-extra')
const { image } = require('../models/image')

controllers.index = (req, res) => {

}

controllers.create = (req, res) => {


    const saveImagen = async () => {

        const imgUrl = randomNumer()
        console.log('Nombre de la imagen:', imgUrl);
        const consultaImagenes = await image.find({ filename: imgUrl })
        if (consultaImagenes.length > 0) {
            saveImagen()
        }
        else {

            const imageTempPatt = req.file.path
            console.log('Ruta de la imagen temporal:', imageTempPatt);

            //solo extrae la extencion de la imagen 
            const ext = path.extname(req.file.originalname).toLowerCase(); // Agregar los paréntesis aquí
            console.log('Extensión de la imagen:', ext);

            //para mover la imagen y se le concatena la extencion
            const tarjetPath = path.resolve(`src/public/upload/test${ext}`)

            // vamos a validar si la extencion de la imagen selecionada es correcta
            //si lo es se guardara la imagen en una carpeta que se expecificara en el codigo
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPatt, tarjetPath)
                const newImge = new image({
                    tittle: req.body.tittle,
                    filename: imgUrl + ext,
                    descripcion: req.body.descripcion,
                })
                const imageSave = await newImge.save()
                console.log('Nueva Imagen:', newImge);
                res.send('recibido')
            } else {
                //en caso que haya algun error eliminara la imagen 
                await fs.unlink(imageTempPatt)
                res.status(500).json({ error: 'formato no valido' })
            }

            

        }


        // para saber la ubicacion de la imagen 

    }
    saveImagen()

}

controllers.like = (req, res) => {

}

controllers.comment = (req, res) => {

}
controllers.remove = (req, res) => {

}
module.exports = controllers