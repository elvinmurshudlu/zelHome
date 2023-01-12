let loginBtn = document.querySelector("#loginBtn")
let registerBtn = document.querySelector("#registerBtn")
let loginForm = document.querySelector(".login")
let registerForm = document.querySelector(".register")
let loginEmail = document.getElementById("loginEmail")
let loginPasswd = document.getElementById("loginPasswd")

let account = {
    username:"elvin@gmail.com",
    password:123456
}
let string = `Default mail: ${account.username} and default passwd: ${account.password}` 

alert(string)

function loginRegister(event){
    console.log(event.id)
    if(event.id =="loginBtn"){
        loginBtn.classList.add("buttonFocused")
        registerBtn.classList.remove("buttonFocused")
        registerForm.classList.add("hidden")
        loginForm.classList.remove("hidden")
    }else if(event.id == "registerBtn"){
        loginBtn.classList.remove("buttonFocused")
        registerBtn.classList.add("buttonFocused")

        registerForm.classList.remove("hidden")
        loginForm.classList.add("hidden")
    }
}
function invalidElement(element,condition=true){
    if(condition){
        element.style.border = "2px solid red"
        if(element.labels[0]){
            element.labels[0].innerHTML = `${element.placeholder} daxil edilməyib!`
        }
    }
    
    else{
        element.style.border = "0"
        element.labels[0].innerHTML = ""

    }
    
}


function formSubmit(form,registerRequest = false){
    let correctEmailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/    
    // let elements = form.childNodes
    let elements = form.querySelectorAll(`.${form.classList[0]} *`)
    let isFirstPasswordSelected = false
    let firstPassword
    let result = true
    for(let a = 0;a<elements.length -1;a++){
        let element = elements[a]
        if(element.tagName =="INPUT" && element.type !="submit" && element.type !="checkbox" ){
            if(element.classList.contains("email")){
                if(!correctEmailRE.test(element.value)){
                    invalidElement(element)
                    result = false
                    // return false
                    
                }else{
                    invalidElement(element,false)
                }
            }
            else if(element.type !="password" && element.value.trim() ==""){
                // console.log("Xana bosdur")
                invalidElement(element)
                result = false
                // return false




            }else if(element.type =="password" && element.value ==""){
                // console.log("Password yazilmadi")
                invalidElement(element)
                result = false
                // return false

            }else{
                invalidElement(element,false)
            }

        }else if(element.tagName =="INPUT" && element.type =="checkbox"){
            if(!element.checked){
                result = false
                document.querySelector(".terms").style.color = "red"
                
            }else{
                document.querySelector(".terms").style.color = "black"

            }
        }
    }
    if(registerRequest){
        for(let a =0;a<elements.length-1;a++){
            let element = elements[a]
            if(element.type == "password"){
                if(isFirstPasswordSelected){
                    if(element.value !=firstPassword){

                        // console.log("Sifreler ferqlidir")
                        invalidElement(element)
                        element.labels[0].innerHTML = `${element.placeholder} yanlış daxil edilib`

                        result = false
                        // return false
                        
                    }
                }
                firstPassword = element.value
                isFirstPasswordSelected = true
            }
        }
    }
    
    return result
    // return true
}



loginBtn.addEventListener("click",()=>loginRegister(loginBtn))
registerBtn.addEventListener("click",()=>loginRegister(registerBtn))


loginForm.onsubmit = ()=>{    
    let a =  formSubmit(loginForm)  
    if(a){
        if(loginEmail.value==account.username&&loginPasswd.value==account.password){
            loginForm.setAttribute("action","./account.html")

        }
    }
    return a   
}

registerForm.onsubmit = ()=>{    
    return formSubmit(registerForm,true)     
}



// fetch('https://www.selhome.az/az/accounts/login/', {
//   method: 'POST',
//   mode: 'no-cors',
//   body: JSON.stringify({
//     username: 'user123',
//     password: 'password123'
//   }),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(response => {
//     console.log(response)
//   })
//   .catch(err =>{
//     console.log(err)
//   });


// var parent = document.getElementById('parent');
// var children = parent.children;

// // Or, if you want to use querySelectorAll():
// var elements = parent.querySelectorAll('#parent *');

// export function test(eded){
//     return eded+"999"

// }