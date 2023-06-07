const Rate = require('./Rates')

const saveRate = async(req , res) => {
    // console.log(req.body);
    if(req.body.authorId && req.body.filmId && req.body.rate)
    await new Rate({
        rate: req.body.rate,
        text: req.body.text,
        authorId: req.body.authorId,
        filmId: req.body.filmId,
        date: Date.now()
    }).save()
    // res.send('ok')
    res.status(200).send(true)
}

const editRate = async (req , res) => {
    // console.log(req.params);
    console.log(req.body.text.length);
    if(req.body.text.length > 0
        ){
            const rates = await Rate.findById(req.body.id)
            // <1 cпособ редактирования>
            // console.log(rates);
            rates.text = req.body.text
            rates.save()  
            res.redirect('/admin/' + req.user._id) 
            // </1 cпособ редактирования>
            // --
            // // <2 cпособ редактирования>
            // await Rate.findByIdAndUpdate(req.body.id , {  
            //     text: req.body.text,
            //     // category: req.body.category,
            //     // description: req.body.description,
            //     // image: `/images/blogs/${req.file.filename}`,
            //     author: req.user._id                        
            // })                              
            // res.redirect('/admin/' + req.user._id)  
            // // </2 cпособ редактирования>                   
        }else{
            res.redirect(`/edit_comment/${req.body.id}?error=1`)
        }
}

const deleteRate = async(req , res) => {
    const rate = await Rate.findById(req.params.id)
    if(rate){
        await Rate.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

module.exports = {
    saveRate, 
    editRate,
    deleteRate 
}