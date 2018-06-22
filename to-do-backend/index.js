

//create New
// let newItem = ToDo({
//     title: 'Repeat',
//     done: false,
//     id: 4
// });

// //Save
// newItem.save()
//         .then(saved =>{
//             console.log('New todo item added');
//         })
//         .catch(error =>{
//             console.log(error)
//         });

ToDo.find({})
.then(results=>{
    console.log('Hello, It\'s me');
})
.catch(error =>{
    console.log(error);
})