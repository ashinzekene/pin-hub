var deleteUsedPinsBtn = document.querySelector('.delete-used-btn')
var pinForm = document.querySelector('.form-marked')
var deleteOneBtn = document.querySelectorAll('.table .delete')
var modifyMarkedBtn = document.querySelectorAll('.edit .selected')

deleteUsedPinsBtn.addEventListener('click', function (e) {
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = (e)=> {
      if(xhr.readyState=== 4 && xhr.status === 200) {
        location.reload()
        console.log("DONE")
      }
    }
    xhr.onerror =(e)=>{
      console.log("NETWOK ERROR OCCURED")
    }
    xhr.open("GET", `/user/delete-used`, true)
    xhr.send(null)

})

for(let x=0;x<deleteOneBtn.length;x++) {
  deleteOneBtn[x].addEventListener('click', (e)=> {
    e.preventDefault()
    let id = e.currentTarget.dataset.id
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = (e)=> {
      if(xhr.readyState=== 4 && xhr.status === 200) {
        location.reload()
        console.log("DONE")
      }
    }
    xhr.onerror =(e)=>{
      console.log("NETWOK ERROR OCCURED")
    }
    xhr.open("GET", `/user/delete/${id}`, true)
    xhr.send(null)
  })

}
for(let x=0;x< modifyMarkedBtn.length;x++) {
  modifyMarkedBtn[x].addEventListener('click', (e)=> {
    let type = e.currentTarget.dataset.type
    console.log(type)
    pinForm.action = `/user/${type}`
    pinForm.submit()
  })
}