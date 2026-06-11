const API = 'http://localhost:3000/student'
let addStudent = document.getElementById('addStudent') 

console.log();


addStudent.addEventListener('click' , async function(){
    let rollno = document.getElementById('rollno').value 
    let name = document.getElementById('name').value
    if(!rollno || !name ) {
        alert("please enter values correctly") 
        return ; 
    }

    let students = await fetch(API) 
    students = await students.json() 


    for(let student of students) {
        if (student.rollno === rollno) {
            alert("student rollno already exists") 
            return ; 
        }
    }
     
    const body = {
        id : Date.now() , 
        rollno : rollno , 
        name : name  
    }

    //data 
    await fetch(`${API}` , {
        method:"POST" , 
        headers :{
            'Content-type' : 'application/json'  
        },
        body:JSON.stringify(body)
    })


    //closing the modal
    const modalElement = document.getElementById('addStudentModal')  
    const modal = bootstrap.Modal.getInstance(modalElement) ;   
    modal.hide()
})