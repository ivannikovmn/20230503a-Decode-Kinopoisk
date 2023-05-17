function saveToWatch(id){
    // console.log(id);
    // axios.post('/api/films/save' , {id})
    axios.post('/api/films/save' , {id}).then(data => {
        // console.log(data);
        if(data.status == 200){
            // alert('Фильм сохранен')
            alert(data.data)
            location.reload()
        }
    })
}

function deleteFromToWatch(id){
    console.log(id);
    axios.delete(`/api/films/save/${id}`).then(data => {
        console.log(data);
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}