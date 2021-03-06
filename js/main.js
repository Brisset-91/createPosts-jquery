let prueba = {
    imageUrl: "https://picsum.photos/id/237/768/384",
    mainText: "Estamos insertando de raiz",
    title: "Prueb de raiz"
}

let postsData = {
    post1: { /* entrada de post*/
        postId: 1,/*id del post*/
        userId: 2, /*id del usuario que publicó el post*/
        title: "Post 1", /*título del post*/
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugiat soluta beatae iste in laudantium, assumenda eligendi neque vero optio!", /*contenido del post*/
        creationDate: "14/04/2021", /*fecha de creación del post*/
        creationTime: "19:00", /*hora de creación del post*/
        coverUrl: "https://picsum.photos/id/237/768/384",  /* portada del post*/
    }
}



////
let users = {
    user1: { /*Entrada de usuario */
        userId: 1, /*id del usuario */
        name: "Israel Salinas Martínez", /*Nombre del usuario */
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQEKN_uf1kAPMw/profile-displayphoto-shrink_800_800/0/1550176229405?e=1623888000&v=beta&t=tNSS_vfQm_GWXfBquADFDLyNnozk3UK_hsS10IvQMlQ" /*Avatar del usuario */
    },
    user2: {
        userId: 2,
        name: "Gabriela Padilla",
        avatar: "https://media-exp1.licdn.com/dms/image/C5603AQFxZihNUVo-ng/profile-displayphoto-shrink_200_200/0/1517501855544?e=1623888000&v=beta&t=SaHOe6Q1nQkH-ZQYGZy8P1OimoTNq-ZAIwZFE0uleO8"
    }
}

/// Objeto que guardará los post nuevos
///Funcion Obtener datos del post ---método POST
let newPosts = {}


$("#postsForm input, #postsForm textarea").change(event => {
    //console.log(event.target)

    let property = event.target.name
    let valueProperty = event.target.value

    newPosts[property] = valueProperty //es newposts en property se le asigna el valor de value property
    console.log(newPosts)
})


///funcion que me permite guardar(posts) objeto
const saveData = postsData => {
    $.ajax({
        method: "POST",
        url: "https://post-29c03-default-rtdb.firebaseio.com/.json",
        data: JSON.stringify(postsData),
        success : response => {
            post(getPost())
            console.log(response)
        },
        error : error => {
            console.log(error)
        }
    })
}

$("#save-posts").click(()=>{
    saveData(newPosts) ////saveData guarda los posts en firebase y newPost tiene el objeto
    $("#newPost").modal('toggle');
   
})

///Con get obtendo los objetos
const getPost = () => {
    let postGroupCom;
    $.ajax({
        method: "GET",
        url: "https://post-29c03-default-rtdb.firebaseio.com/.json",
        success: response => {
            postGroupCom = response
        },

        async:false
    })

    return postGroupCom
}

///teniendo con posts lo post imprimo cards

const post =  postGroupCom => {
    console.log(postGroupCom)

    $("#cardpost").empty()

    for (posts in postGroupCom) {
        let { imageUrl, title, mainText, comment } = postGroupCom [posts]
        let postCard = `
        
            <div class="col-12">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4 images">
                            <img class="w-100 mt-4" id="imageUrl" src="${imageUrl}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title" id="title">${title}</h5>
                                <p class="card-text" id="mainText" >${mainText}</p>
                                <p class="card-text" id="text" ><small class="text-muted">Creado el <span class="text-dark">14/04/2021</span></small></p>
                            </div>
                        </div>
                    </div>

            <div class="replies-wrapper">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div class="reply-box">
                                    <h3><img src="" alt=""><span>Israel Salinas Martínez</span></h3>
                                    <p>Excelente post!</p>
                                    <p class="text-right text-muted">
                                        <span class="date">14/04/2021</span> 
                                        <span class="time">"21:00"</span>   
                                    </p>
                                </div>
                            </li>
                        </ul>
                            <div class="reply-form">
                            <form action="">
                                <div class="form-group row" style="justify-content: center;">
                                    <input type="text" class="form-control w-50" id="inp" name="comment">
                                    <button class="btn btn-success" id="btc">Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    
            `
        $("#cardpost").append(postCard)
    }
}
post(getPost())
    


let newComm = {}


$("#commentForm input").change(event => {
    
    let propCom = event.target.name
    let valCom = event.target.value

    newComm[propCom] = valCom 
    console.log(newComm)
})



const saveCom = postsCom => {
    $.ajax({
        method: "POST",
        url: "https://jquery-277d2-default-rtdb.firebaseio.com/.json",
        data: JSON.stringify(postsCom),
        success : response => {
            console.log(response)
        },
        error : error => {
            console.log(error)
        }
    })
}

$(".btn-success").click(()=>{
    saveCom(newComm) 
})



const getPostCm = () => {
    let postGroupCom;
    $.ajax({
        method: "GET",
        url: "https://jquery-277d2-default-rtdb.firebaseio.com/.json",
        success: response => {
          postGroupCom = response
        },
        async:false
    })

    return postGroupCom
}


const postCm =  postGroupCom => {
    console.log(postGroupCom)



    for (postsCom in postGroupCom) {
        let { comment } = postGroupCom [postsCom]
        let postCardCom = `<li class="list-group-item" style="">
              <div class="reply-box">
                  <p class="mt-3 font-arial">${comment}</p>
                  <small class="text-right text-muted font-italic d-flex justify-content-end">
                      <span class="date">14/April/2021</span> 
                      -
                      <span class="time">5:43:33 PM</span>   
                  </small>
              </div>
          </li>`
        $("#pr").append(postCardCom)
    }
}
postCm(getPostCm())