const API = 'http://localhost:3000/student' 

//display all students by default


displayStudents() 


//add student 


let addStudentBtn = document.getElementById('addStudent') 

addStudentBtn.addEventListener('click' , async function(e){ 
    let rollno = document.getElementById('rollno')
    let name = document.getElementById('name') 
    let studentClass = document.getElementById('studentClass')
    let section = document.getElementById('studentSection')

    if(!rollno || !name) {
        alert("cannot be empty") 
        return ; 
    }

    let students = await fetch(API) 
    let existingStudents = await students.json() 

    for(let student of existingStudents) {
        if (student.rollno == rollno) {
            alert("roll no already exists") 
            return ; 
        }
    }

    let student = {
        rollno : rollno.value , 
        name : name.value  , 
        studentClass:studentClass.value , 
        section:section.value 
    }

    await fetch(API , {
        method:"POST" , 
        headers:{
            'Content-type' : 'application/json' 
        },
        body:JSON.stringify(student)
    })
    await displayStudents()


    //hide 
    rollno.value = "" 
    name.value = ""
    studentClass.value = "" 
    section.value = ""
    let modalElement = document.getElementById('addStudentModal') 
    let modal = bootstrap.Modal.getInstance(modalElement) 
    modal.hide()
})

//create student 

function createStudents(students) {
    let table = document.querySelector('.table') 

    table.innerHTML = `
    <thead>
    <tr>
    <th scope="col">rollno</th>
    <th scope="col">name</th>
    <th scope="col">class</th>
    <th scope="col">section</th>
    <th scope = "col">options</th>
    </tr>
</thead>
<tbody>
</tbody> 
    `

    let tbody = table.querySelector('tbody')
    students.forEach(student => {
        tbody.innerHTML += `
        <tr>
            <td>${student.rollno}</td>
            <td>${student.name}</td>
            <td>${student.studentClass}</td>
            <td>${student.section}</td>
            <td><i class="fa-regular fa-pen-to-square fa-lg me-4 text-warning editBtn" data-id="${student.id}" data-bs-toggle="modal" data-bs-target="#editStudent"></i>
            <i class="fa-solid fa-trash fa-lg text-danger deleteBtn" data-id="${student.id}"></i></td>
             
        </tr>
        
        `
    })

}

//all students 
async function displayStudents() {
    let studentData = await fetch(API) 
    let students = await studentData.json() 
    createStudents(students)

}


let allStudentsBtn = document.getElementById('allStudents') 
//disable by default
allStudentsBtn.disabled = true
allStudentsBtn.addEventListener('click' , async function(){
    allStudentsBtn.disabled = true 
    await displayStudents()
})


//filter option 

//filter option 

let nameAscending = document.querySelector('.nameAscending') 
let nameDescending = document.querySelector('.nameDescending') 
let nameAscendingFilter = false ; 
let nameDescendingFilter = false ; 
let rollnoAscFilter = false ; 
let rollnoDescFilter = false ; 
let rollnoAsc = document.querySelector('.rollnoAsc') 
let rollnoDesc = document.querySelector('.rollnoDesc')
let classAsc  = document.querySelector('.classAsc')
let classDesc = document.querySelector(".classDesc") 
let classAscFilter = false 
let classDescFilter = false 
let sectionAsc  = document.querySelector('.sectionAsc')
let sectionDesc = document.querySelector(".sectionDesc") 
let sectionAscFilter = false 
let sectionDescFilter = false 





nameAscending.addEventListener('click' , function(){
    nameDescending.classList.remove('clicked')
    nameAscending.classList.toggle('clicked')
    nameAscendingFilter = true 
    nameDescendingFilter = false  
    
})

nameDescending.addEventListener('click' , function(){ 
    nameAscending.classList.remove('clicked')
    nameDescending.classList.toggle('clicked')
    nameAscendingFilter = false 
    nameDescendingFilter = true 
})

rollnoAsc.addEventListener('click' , function(){
    rollnoDesc.classList.remove('clicked')
    rollnoAsc.classList.toggle('clicked')
    rollnoAscFilter = true 
    rollnoDescFilter = false 
    
})

rollnoDesc.addEventListener('click' , function(){
    rollnoAsc.classList.remove('clicked')
    rollnoDesc.classList.toggle('clicked')
    rollnoAscFilter = false 
    rollnoDescFilter = true  
    
})

classAsc.addEventListener('click' , function(){
    classDesc.classList.remove('clicked') 
    classAsc.classList.toggle('clicked') 
    classAscFilter = true 
    classDescFilter = false 
})

classDesc.addEventListener('click' , function(){
    classAsc.classList.remove('clicked') 
    classDesc.classList.toggle('clicked') 
    classAscFilter = false 
    classDescFilter = true  
})

sectionAsc.addEventListener('click' , function(){
    sectionDesc.classList.remove('clicked') 
    sectionAsc.classList.toggle('clicked') 
    sectionAscFilter = true 
    sectionDescFilter = false 
})

sectionDesc.addEventListener('click' , function(){
    sectionAsc.classList.remove('clicked') 
    sectionDesc.classList.toggle('clicked') 
    sectionAscFilter = false 
    sectionDescFilter = true 
})

//filter button 

let filterButton = document.getElementById('filterButton') 

filterButton.addEventListener('click' , async function(){
    console.log('im working');
    
    let selectedClassesNode = document.querySelectorAll('.class-filter:checked') 
    let selectedClasses = [...selectedClassesNode].map(node=>{
        return node.value
    })  

    let selectedSectionNode = document.querySelectorAll('.section-filter:checked') 
    let selectedSections = [...selectedSectionNode].map(node=>node.value)
    selectedClasses.splice(0,1) 
    if (selectedClasses.length === 0 ) {
        selectedClasses = ['I' , "II" , "III" , "IV" , "V"]
    }
    selectedSections.splice(0,1) 
    if (selectedSections.length === 0 ) {
        selectedSections = ['A' , "B" , "C"]
    }
    

    let filteredStudents = []  

    let studentsData = await fetch(API) 
    let students = await studentsData.json() 
    console.log(selectedClasses);
    
    students.forEach(student =>{
        // console.log(student.studentClass); 
        
        if(selectedClasses.includes(student.studentClass) && selectedSections.includes(student.section)) {
            filteredStudents.push(student)
        }
    }) 
    
    //sorting logic  - do in reverse order to get right result 
            console.log({
        rollnoAscFilter,
        rollnoDescFilter,
        nameAscendingFilter,
        nameDescendingFilter,
        classAscFilter,
        classDescFilter,
        sectionAscFilter,
        sectionDescFilter
    })

    //section 
    if(sectionAscFilter) {
        filteredStudents.sort((a,b) =>{
            return a.section.localeCompare(b.section)
        })
    }
    else if(sectionDescFilter) {
        filteredStudents.sort((a,b) =>{
            return b.section.localeCompare(a.section)
        })
    }

    //class 
    if(classAscFilter) {
        filteredStudents.sort((a,b) =>{
            return a.studentClass.localeCompare(b.studentClass)
        })
    }
    else if(classDescFilter) {
        filteredStudents.sort((a,b) =>{
            return b.studentClass.localeCompare(a.studentClass)
        })
    }


    //name 
    if(nameAscendingFilter) {
        filteredStudents.sort((a,b) =>{
            return a.name.localeCompare(b.name)
        })
    }
    else if (nameDescendingFilter) {
        filteredStudents.sort((a,b) =>{
            return b.name.localeCompare(a.name)
        })
    }

    //rollno
    if (rollnoAscFilter) { 
    filteredStudents.sort((a,b) =>{
        return a.rollno -b.rollno
    }) 
    } 
    else if (rollnoDescFilter) {
        filteredStudents.sort((a,b)=>{
            if(Number(a.rollno) > Number(b.rollno)) return -1 
            else return 1 
    }) 

    
    }
    console.log('sorted' , filteredStudents);
    
    // filteredStudents.sort((a,b) =>{
    //     if(rollnoAscFilter && a.rollno !== b.rollno){
    //         return a.rollno - b.rollno
    //     }

    //     if(nameAscendingFilter && a.name !== b.name){
    //         return a.name.localeCompare(b.name)
    //     }

    //     if(classAscFilter && a.studentClass !== b.studentClass){
    //         return a.studentClass - b.studentClass
    //     }

    //     if(sectionAscFilter && a.section !== b.section){
    //         return a.section.localeCompare(b.section)
    //     }

    //     return 0


    // })
    console.log(filteredStudents);
    //creating filtered tasks 
    createStudents(filteredStudents)


    //dimissing the modal 
    allStudentsBtn.disabled = false 

    let modalElement = document.getElementById('filterStudentModal') 
    let modal = bootstrap.Modal.getInstance(modalElement) 
    modal.hide()
})


//search option 
let searchButton = document.getElementById('searchButton') 
searchButton.addEventListener('click' , async function(){ 

let searchInput = document.querySelector('.searchInput') 
if (!searchInput.value) {
    alert('search box is empty')
    return 
}
// let response = await fetch(`${API}?rollno="${searchInput.value.trim()}"`)  
// let students = await response.json() 

// if (students.length === 0) {
//     alert('No records found') 
//     return 
// }
// let student = students[0]
let response = await fetch(API)
let students = await response.json()


let student = students.find(s => s.rollno == searchInput.value.trim())
console.log(student);
if (!student) {
    alert("no records found") 
    return 
}
createStudents([student]) 
allStudentsBtn.disabled = false 
})


//edit button 

document.addEventListener('click' , async function(event){
    if(event.target.classList.contains('editBtn')) {
        let ID = event.target.dataset.id
        let studentsData = await fetch(`${API}/${ID}`) 
        console.log(studentsData);

        let student =  await studentsData.json()  
        console.log(student);

        
        let editRollno = document.getElementById('editRollno')  
        editRollno.value = student.rollno  
        editRollno.disabled = true 

        let editName = document.getElementById('editName') 
        editName.value = student.name 

        let studentClass = document.getElementById('editStudentClass') 
        studentClass.value = student.studentClass 

        let studentSection = document.getElementById('editStudentSection') 
        studentSection.value = student.section 




        console.log(editName.value);
        
        //hide modal 
        document.querySelector('.saveBtn').addEventListener('click' , async function(){

            let updateStudent = {
                rollno : editRollno.value , 
                name : editName.value , 
                studentClass : studentClass.value , 
                section : studentSection.value
            }

            await fetch(`${API}/${ID}` , {
                method:"PUT" , 
                headers : {
                    'Content-type' : 'application/json' 
                } , 
                body : JSON.stringify(updateStudent)

            })



            let modalElement = document.getElementById('editStudent') 
            let modal = bootstrap.Modal.getInstance(modalElement) 
            modal.hide() 
        })
        
        
    }
}) 

//save changes --> edit button



//delete button 

document.addEventListener('click' , async function(event){
    if(event.target.classList.contains('deleteBtn')) {
        let ID = event.target.dataset.id 

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            
            await fetch(`${API}/${ID}` , {
                method:"DELETE" , 
            }) 

            }
            });
    }
})  


window.addEventListener('beforeunload', () => {
    console.log('PAGE RELOAD');
});