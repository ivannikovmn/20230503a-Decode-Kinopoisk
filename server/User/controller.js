const User = require('../auth/User')

const saveToWatch = (req , res) => {
    console.log(req.body);
}

const editUser = async (req , res) => {
    // console.log('work');
    // console.log(req.body.full_name.length);
    // console.log(req.body.id);
    if(req.body.full_name.length > 0
        ){
            const user = await User.findById(req.body.id)
            // <1 cпособ редактирования>
            // console.log(user);
            user.full_name = req.body.full_name
            user.save()  
            res.redirect('/admin/' + req.user._id) 
            // </1 cпособ редактирования>
            // --
            // // <2 cпособ редактирования>
            // await User.findByIdAndUpdate(req.body.id , {  
            //     full_name: req.body.full_name,
            // })                              
            // res.redirect('/admin/' + req.user._id)  
            // // </2 cпособ редактирования>                   
    }else{
        res.redirect(`/edit_user/${req.body.id}?error=1`)
    }
}

const blockUser = async (req , res) => {
   // console.log('work');
    // console.log(req.body.full_name.length);
    // console.log(req.body.id);
    if(req.body.full_name.length > 0
        ){
            const user = await User.findById(req.body.id)
            // <1 cпособ редактирования>
            // console.log(user);
            user.full_name = req.body.full_name
            user.save()  
            res.redirect('/admin/' + req.user._id) 
            // </1 cпособ редактирования>
            // --
            // // <2 cпособ редактирования>
            // await User.findByIdAndUpdate(req.body.id , {  
            //     full_name: req.body.full_name,
            // })                              
            // res.redirect('/admin/' + req.user._id)  
            // // </2 cпособ редактирования>                   
    }else{
        res.redirect(`/edit_user/${req.body.id}?error=1`)
    }
}

const deleteUser = async(req , res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await User.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

module.exports = {
    saveToWatch,
    editUser,
    deleteUser,
    blockUser
}