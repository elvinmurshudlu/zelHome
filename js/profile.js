let profileForm = document.querySelector(".profileSettings")
let passwordForm = document.querySelector(".changePasswd")
let changeInfoBtn = document.querySelector("#changeInfo")
let changePasswdBtn = document.querySelector("#changePasswd")
let infoNewPasswd = document.querySelector("#infoNewPasswd")


function invalidElement(element,condition=true){
    if(condition){
        element.style.border = "2px solid red"
        element.labels[0].style.color = "red"
        
    }
    
    else{
        element.style.border = "0"
        element.labels[0].style.color = "black"

        

    }
    
}

function validation(form,ispasswdChange=false){

    
    let correctEmailAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
    let correctPhoneNumber = /^\+994[0-9]{9}$/
    let elements = form.querySelectorAll(`.${form.classList[0]} *`)
    console.log(elements)
    let result = true
    elements.forEach((element)=>{
        // console.log(element.id)
        if(element.tagName =="INPUT" && element.type !="submit"){
            if(element.value.trim() ==""){
                result = false
                invalidElement(element)
            }
            else if(element.id =="email"){
                console.log(correctEmailAddress.test(element.value))
                if(!correctEmailAddress.test(element.value)){
                    result= false
                    invalidElement(element)
                }else{
                    invalidElement(element,false)
                }

            }else if(element.id =="telephone"){
                if(!correctPhoneNumber.test(element.value)){
                    invalidElement(element)
                }else{
                    invalidElement(element,false)
                }


            }else if(element.id == "birthday"){
                if(element.value == null){
                    invalidElement(element)
                }else{
                    invalidElement(element,false)
                }

            }else if(element.type =="checkbox"){
                if(!element.checked){
                    result = false
                }
            }else{
                invalidElement(element,false)
            }

            

        }
    })
    if(ispasswdChange){
        let elements = form.querySelectorAll(`.${form.classList[0]} *`)
        let passwords = {}
        elements.forEach((element)=>{
            if(element.tagName =="INPUT" && element.type!="submit"){
                if(element.value = ""){
                    infoNewPasswd.innerHTML = "Kodu daxil edin"
                    result = false
                }else{
                passwords[element.id] = element.value

                }
            }
        })
        const {oldPasswd,newPasswd,confirmNewPasswd} = passwords
        if(oldPasswd == newPasswd){
            infoNewPasswd.innerHTML = "Kohne sifre ile eynidir"
            result = false
        }else if(newPasswd != confirmNewPasswd){
            infoNewPasswd.innerHTML = "Tekrar sifre sehv yazilib"
            result = false
        }else{
            infoNewPasswd.innerHTML = ""
        }

    }

    return result

}

// console.log(document.getElementById("birthday"))

function test(){
    console.log("salasmdskjdsdf")
}

profileForm.onsubmit = ()=>{
    return validation(profileForm)
}

passwordForm.onsubmit = ()=>{
    return validation(passwordForm,true)
}

// test()