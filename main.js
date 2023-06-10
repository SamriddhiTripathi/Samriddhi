const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


const rating = document.querySelector('.rating');
const child = document.querySelectorAll('.child');
const feedback_section = document.querySelector('.feedback-section');
const btn = document.querySelector('#btn');

let icon;
rating.addEventListener('click', (event) => {

   icon = event.target.parentNode;

   for(let i=0; i<child.length; i++){
      console.log(child[i])
      child[i].classList.remove('active');
   }

   if(!icon.classList.contains('active')){
       icon.classList.add('active');
   }
    // console.log(event.target.parentNode);
})

btn.addEventListener('click', () => {
   console.log(icon);

   let user_feedback;
   let user_feedback_icon;

   if(icon === undefined){
      user_feedback = "";
   }else{
      user_feedback = icon.children[1].innerText;
      user_feedback_icon = icon.children[0].innerText;
   }

   if(user_feedback !== ""){
      // console.log(user_feedback_icon)
      feedback_section.innerHTML = `
         <div class="response-screen ">
            <p>${user_feedback_icon}</p>
            <h3>your Feedback: ${user_feedback}</h3>
            <p>💖 Thank You  for your response</p>
      
         <div class="feedback-button">
            <a href="index.html">Back</a>
           </div>
        </div>
      `
   }
})