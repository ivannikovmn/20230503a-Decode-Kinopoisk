function deleteFilms(id, authorID){
    axios.delete(`/api/films/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            // window.location(`/profile/${authorID}`)
            // location.replace(`/profile/${authorID}`)
            location.replace(`/admin/${authorID}`)
        }else if(data.status == 404){
            // window.location('/not-found')
            location.replace('/not-found')
        }
    })
    // console.log(id , authorID);
}