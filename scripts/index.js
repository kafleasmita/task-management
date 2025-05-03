const state = {
    taskList: [],
};


//Dom- document object

const taskContents = document.querySelector(".task__contents");
const taskMOdal = document.querySelector(".task__modal__body");



const htmlTaskContent = ({id, title, description, type, url }) => `

<div class='col-md-6 col-lg-4 mt-3' id= ${id} key= ${id}>
<div class='card shadow-sm task__card'>
<div class='crad-header d-flex  gap-2 justify-content-end task__card__header'>
<button type='button' class='btn btn-outline-info mr-2' name=${id}>
<i class='fas fa-pencil-alt' name=${id}></i>
</button>

<button type='button' class='btn btn-outline-danger mr-2' name=${id}>
<i class='fas fa-trash-alt' name=${id}></i>
</button>
</div>
<div class='card-body'>
${
 url &&
  `<img width='100%' src=${url} alt='image cap' class='card-image-top md-3 rounded Lg' />`
}
  <h4 class='task__card__title'>${title}</h4>
  <p class='description trim-3-lines text-muted data-gram_editior-'false'>
  ${description}
  </p>
  <div class='tags text-white d-flex flex-wrap'>
  <span class='badge bg-primary m-1'>${type}</span>
</div>
</div>
<div class='card footer'>
<button type='button' class='btn btn-outline-primary float-right'
 data-bs-toggle='modal'
 data-bs-target='#showTask'
 >
 Open Task
</button
</div>
</div>
</div>
`;

const htmlModalContent = ({id, title, description, url}) => {
    const date= new Date(parseInt(id));
    return `
    <div id=${id}>
    ${
    url &&
  `
  <img width='100%' src=${url} alt='image cap' class='card-img-fluid place__holder__image mb-3' />
  `
    }
  <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
  <h2 class='my-3'>${title} </h2>
  <p class='lead'>
  ${description}
  </p>
  </div>
    `;
};

const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify({
    tasks: state.taskList,
}));
};

const LoadInitialData = () => {
 const LocalStorageCopy = JSON.parse(localStorage.getItem('tasks'));

 if(LocalStorageCopy) state.taskList = LocalStorageCopy.tasks;

state.taskList.map((cardDate)  =>  {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
});

};

const handleSubmit = (event) => {
  const id =`${Date.now()}`;
  const input = {
    url: document.getElementById('imageUrl').value,
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDescription').value,
    type: document.getElementById('taskType').value,
  };

  if(input.title === "" || input.description === "" || input.type === ""){
      return alert ("please fill all the fields");
  }
  taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({
          ...input,
          id,
      })
  );

  state.taskList.push({...input, id});
  updateLocalStorage();


};