const express = require('express');
const post = require('../models/Post')

const router = express.Router();

router.get('/', async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        const blogData = await post.find()
        res.render('index', { metadata, blogData })
    } catch (error) {
        console.log(error)
    }
})

function insertPosts() {
    post.insertMany([{
        title: "Aprende a programar de la manera díficil, no uses modelos de lenguaje",
        body: "Con el rápido avance de la inteligencia artificial se han creado numerosas herramientas que pueden aumentar dramáticamente la productividad de los desarrolladores para completar tareas en tiempos acotados, pero, por otro lado estas herramientas pueden truncar el camino de personas que buscan iniciarse en la industria, eliminando el proceso de razonamiento inicial para construir algo, ya que con una simple 'prompt' obtienen el resultado final, ya producido, y aunque nunca es un resultado preciso, estas personas prefieren obtener rapidamente la respuesta a llegar mediante prueba y error a ese resultado deseado. Mi consejo: sumergirse en el problema, intentar abordarlo sin ayuda, si te lleva tiempo es normal, es parte de el proceso, cuanto más repitas esto tu mente más rapido solucionará problemas, sentate y escribí tu propio código, se aprende con las manos, NO con los ojos."
    },
    {
        title: "Escapando el infierno de los tutoriales de programación",
        body: "Cuando recién empezaba recuerdo que saltaba de tutorial en tutorial, y cuando terminaba el video, las pocas veces que lo hacía, quedaba en blanco, no podía hacer nada por mi cuenta. El tema, más importante que mirar un video y copiar lo que hace otra persona es analizar que hace esa persona, entender por que hace lo que hace y la manera en que lo hace, para luego pensar como podrías hacerlo de otra manera, o que podrías aportarle a este proyecto, para mejorarlo o expandirlo. Happy coding☺️."
    },
    {
        title: "Por que es importante tomar descansos",
        body: "La carrera de desarrollo de software puede sobrepasarte facilmente, con el paso de la tecnología y las herramientas nuevas que se construyen todos los dias, es imposible mantener el ritmo, ni siquiera lo intentes. La clave es encontrar un lenguaje con el que te sientas cómodo y empezar a construir proyectos, el resto va a llegar solo.."
    }
])
}

// insertPosts();


router.post('/search?', (req, res) => {
    const searchObj = req.query.search;

})

router.get('/posts', (req,res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('posts', { metadata })
})

router.get('/about',(req,res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('about', { metadata })
})

router.get('/contact', (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('contact', { metadata })
})
module.exports.routes = router;