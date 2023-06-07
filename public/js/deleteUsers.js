function deleteUsers(id){
    console.log('work');
    axios.delete(`/api/users/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            location.replace(`/admin/6441381bb85ca3a8ed6b32f9`)
        }else if(data.status == 404){
            location.replace('/not-found')
        }
    })
    // console.log(id);
}
